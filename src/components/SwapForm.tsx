import { useState, useCallback, ChangeEvent, MouseEvent } from "react"

import { Box, Icon, Row, Text } from "@tlon/indigo-react"
import ReceiveDisplay from './ReceiveDisplay'
import Star from "../types/Star"
import { addOrRemove } from "../utils/array"
import { useStore } from "../store"
import TradeButton from "./TradeButton"
import StarSelector from "./StarSelector"

export enum Exchange {
  starsForDust,
  dustForStars,
}

const SwapForm = () => {
  const { account, api, dust, stars, setStars, setDust, setTreasuryBalance } = useStore((store: any) => store)
  const [dustInput, setDustInput] = useState('')
  const [showStarSelector, setShowStarSelector] = useState(false)
  const [selectedStars, setSelectedStars] = useState([] as Star[])
  const [exchange, setExchange] = useState(Exchange.starsForDust)

  const changeDust = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newDust = Number(event.target.value.replace(/\D/g,''))
    const max = Math.min(newDust, dust)
    setDustInput(String(max))
  }, [dust, setDustInput])

  const toggleStarSelector = useCallback((event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setShowStarSelector(!showStarSelector)
  }, [showStarSelector, setShowStarSelector])

  const hideStarSelector = useCallback((event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setShowStarSelector(false)
  }, [setShowStarSelector])

  const selectStar = (star: Star) => setSelectedStars(star.canTrade ? addOrRemove(selectedStars, star) : selectedStars)

  const toggleExchange = () => 
    setExchange(
      exchange === Exchange.starsForDust ?
      Exchange.dustForStars : 
      Exchange.starsForDust
    )

  const starsForDust = exchange === Exchange.starsForDust

  const dustInputField = <input
    className="amount"
    placeholder="0"
    value={dustInput}
    onChange={changeDust}
    type="numeric"
  />

  const refreshValues = useCallback(async () => {
    const newStars = await api.getStars().catch(console.error)
    setStars(newStars)

    const newDust = await api.getDust().catch(console.error)
    setDust(newDust)

    const newTreasuryBalance = await api.getTreasuryBalance().catch(console.error)
    setTreasuryBalance(newTreasuryBalance)
  }, [api, setStars, setDust, setTreasuryBalance])
  
  const trade = async () => {
    if (exchange === Exchange.starsForDust) {
      if (selectedStars.length && window.confirm('You will need to make 2 transactions for each star. The first to authorize the DUST contract to transfer your star, the second to deposit the star.')) {
        try {
          await Promise.all(selectedStars.map((star) => api.depositStar(star)))
          setSelectedStars([])
          await refreshValues()
        } catch (e) {
          console.warn('ERROR DEPOSITING STARS', e)
        }
      }
    } else {
      try {
        if (dust && Number(dust) && window.confirm('Are you sure you want to exchange your DUST for stars?')) {
          await api.redeemTokens(Number(dust))
          setDustInput('0')
          await refreshValues()
        }
      } catch (e) {
        console.warn('ERROR REDEEMING DUST', e)
      }
    }
  }

  const assets = starsForDust ? stars.length : dust
  const depositDenomination = starsForDust ? 'STAR' : 'DUST'
  const receiveDenomination = starsForDust ? 'DUST' : 'STAR'

  const disableButton = starsForDust ? !selectedStars.length : !Number(dustInput)

  return <Box onClick={hideStarSelector}>
    <form className="swap-form">
      <Row className="half deposit">
        <Box className="denomination">
          <Text className="label">Deposit</Text>
          <Text className="value">{depositDenomination}</Text>
        </Box>
        <Box className="assets">
          <Text className="exchange-rate">You have {assets} {depositDenomination}</Text>
          {
            starsForDust ?
            <StarSelector {...{toggleStarSelector, selectStar, selectedStars, showStarSelector}} /> :
            dustInputField
          }
        </Box>
      </Row>

      <Box className="toggle-exchange" onClick={toggleExchange}>
        <Icon icon={"Swap"} />
      </Box>

      <Row className="half receive">
        <Box className="denomination">
          <Text className="label">Receive</Text>
          <Text className="value">{receiveDenomination}</Text>
        </Box>
        <ReceiveDisplay amount={starsForDust ? selectedStars.length : Number(dustInput)} exchange={exchange} />
      </Row>
    </form>
    
    <TradeButton
      onClick={trade}
      starsForDust={starsForDust}
      hasAddress={Boolean(account.currentAddress)}
      disabled={disableButton}
    />
  </Box>
}

export default SwapForm

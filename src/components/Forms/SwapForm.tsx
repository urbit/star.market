import { useState, useCallback, ChangeEvent, MouseEvent } from "react"

import { Box, Icon, Row, Text } from "@tlon/indigo-react"
import ReceiveDisplay from './ReceiveDisplay'
import Star from "../../types/Star"
import { addOrRemove } from "../../utils/array"
import { useStore } from "../../store"
import TradeButton from "./TradeButton"
import StarSelector from "../Star/StarSelector"
import ConfirmationForm from "./ConfirmationForm"

export enum Exchange {
  starsForDust,
  dustForStars,
}

interface SwapFormProps {
  toggleWalletModal: () => void
}

const SwapForm = ({ toggleWalletModal } : SwapFormProps) => {
  const { account, api, dust, stars, setStars, setDust, setTreasuryBalance, setLoading, setSuccessTxHashes, setErrorMessage } = useStore((store: any) => store)
  const [dustInput, setDustInput] = useState('')
  const [showStarSelector, setShowStarSelector] = useState(false)
  const [selectedStars, setSelectedStars] = useState([] as Star[])
  const [exchange, setExchange] = useState(Exchange.starsForDust)
  const [confirm, setConfirm] = useState(false)

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

  const selectStar = (star: Star) => setSelectedStars(star.isUnlinked ? addOrRemove(selectedStars, star) : selectedStars)

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

    setConfirm(false)
    setExchange(exchange === Exchange.starsForDust ? Exchange.dustForStars : Exchange.starsForDust)
  }, [api, setStars, setDust, setTreasuryBalance, exchange, setExchange])
  
  const trade = async () => {
    setLoading(true)

    if (exchange === Exchange.starsForDust) {
      if (selectedStars.length && window.confirm('You will need to make 2 transactions for each star. The first to authorize the DUST contract to transfer your star, the second to deposit the star.')) {
        try {
          const hashes : string[] = [];
          for (let i = 0; i < selectedStars.length; i++) {
            const hash = await api.depositStar(selectedStars[i])
            hashes.push(hash);
          }
          setSuccessTxHashes(hashes)
          setSelectedStars([])
          await refreshValues()
        } catch (e) {
          setErrorMessage(e)
          console.warn('ERROR DEPOSITING STARS', e)
        }
      }
    } else {
      try {
        if (dustInput && Number(dustInput) && window.confirm('Are you sure you want to exchange your DUST for stars?')) {
          const hashes = await api.redeemTokens(Number(dustInput))
          setSuccessTxHashes(hashes)
          setDustInput('0')
          await refreshValues()
        }
      } catch (e) {
        setErrorMessage(e)
        console.warn('ERROR REDEEMING DUST', e)
      }
    }

    setLoading(false)
  }

  const assets = starsForDust ? stars.length : dust
  const depositDenomination = starsForDust ? 'STAR' : 'DUST'
  const receiveDenomination = starsForDust ? 'DUST' : 'STAR'

  const hasAddress = Boolean(account.currentAddress)
  const disableButton = starsForDust ? !selectedStars.length : !Number(dustInput)

  return confirm ?
  <ConfirmationForm
    starsForDust={starsForDust}
    dust={Number(dustInput)}
    stars={selectedStars}
    onConfirm={trade}
    onCancel={() => setConfirm(false)}
  />:
  <Box onClick={hideStarSelector} className="form-holder">
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
      onClick={hasAddress ? () => setConfirm(true) : toggleWalletModal}
      starsForDust={starsForDust}
      hasAddress={hasAddress}
      disabled={hasAddress && disableButton}
    />
  </Box>
}

export default SwapForm

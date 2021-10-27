import { useState, useCallback, ChangeEvent } from "react"

import { Box, Col, Row, Text } from "@tlon/indigo-react"
import { sigil, reactRenderer } from '@tlon/sigil-js'
import ReceiveDisplay from './ReceiveDisplay'
import Star from "../../types/Star"
import { addOrRemove } from "../../utils/array"
import { useStore } from "../../store"
import TradeButton from "./TradeButton"
import StarSelector from "../Star/StarSelector"
import ConfirmationForm from "./ConfirmationForm"
import Swap from "../Icons/Swap"
import Logo from '../Icons/Logo';
import { getExchangeRate } from "../../utils/text"
import Balance from "../Balance"
import { SwapStars } from "../Explainers/SwapStars"
import { SwapWSTR } from "../Explainers/SwapWSTR"
import { Review } from "../Explainers/Review"

export enum Exchange {
  starsForDust,
  dustForStars,
}

interface SwapFormProps {
  toggleWalletModal: () => void
}

const SwapForm = ({ toggleWalletModal } : SwapFormProps) => {
  const { account, api, dust, stars, gasPrice, setStars, setDust, setTreasuryBalance, setLoading, setLoadingText, setSuccessTxHashes, setErrorMessage } = useStore()
  const [dustInput, setDustInput] = useState('')
  const [showStarSelector, setShowStarSelector] = useState(false)
  // const [showConfirmTrade, setShowConfirmTrade] = useState(false)
  const [selectedStars, setSelectedStars] = useState([] as Star[])
  const [exchange, setExchange] = useState(Exchange.starsForDust)
  const [confirm, setConfirm] = useState(false)

  const changeDust = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newDust = Number(event.target.value.replace(/\D/g,''))
    const max = Math.min(newDust, dust)
    setDustInput(String(max))
  }, [dust, setDustInput])

  const toggleStarSelector = useCallback(() => {
    setShowStarSelector(!showStarSelector)
  }, [showStarSelector])

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
    await api.loadContracts()

    const newStars = await api.getStars().catch((error) => {
      console.error(error)
      return []
    })
    setStars(newStars)

    const newDust = await api.getDust().catch((error) => {
      console.error(error)
      return 0
    })
    setDust(newDust)

    const newTreasuryBalance = await api.getTreasuryBalance().catch((error) => {
      console.error(error)
      return 0
    })
    setTreasuryBalance(newTreasuryBalance)

    setConfirm(false)
  }, [api, setStars, setDust, setTreasuryBalance])
  
  const confirmTrade = useCallback(async () => {
    setLoadingText('Waiting for setTransferProxy to complete...')

    if (exchange === Exchange.starsForDust) {
      try {
        await api.loadContracts()
        await Promise.all(
          selectedStars.map(api.setTransferProxy, gasPrice)
        )
        setLoadingText('Waiting for star deposit to complete...')
        const hashes = await Promise.all(
          selectedStars.map(async (star) => {
            const hash = await api.depositStar(star, gasPrice)
            return hash || ''
          })
        )

        setSuccessTxHashes(hashes)
        setSelectedStars([])
        await refreshValues()
      } catch (e) {
        setErrorMessage(String(e))
        console.warn('ERROR DEPOSITING STARS', e)
      }
    } else {
      try {
        setLoadingText('Waiting for star redemption to complete...')
        const hashes = await api.redeemTokens(Number(dustInput), gasPrice)
        setSuccessTxHashes(hashes)
        setDustInput('0')
        await refreshValues()
      }
      catch (e) {
        setErrorMessage(String(e))
        console.warn('ERROR REDEEMING WSTR', e)
      }
    }

    setLoading(false)
  }, [api, dustInput, exchange, refreshValues, selectedStars, gasPrice, setErrorMessage, setLoading, setLoadingText, setSuccessTxHashes])

  const hasAddress = Boolean(account.currentAddress)
  const disableButton = starsForDust ? !selectedStars.length : !Number(dustInput)

  const starLabel = <Row className="label">
    {sigil({
      patp: '~marzod',
      renderer: reactRenderer,
      size: 48,
      colors: ['black', 'white'],
    })}
    <Box className="value-balance">
      <Text className="value">Star</Text>
      <Balance amount={stars.length} label={`Star${stars.length === 1 ? '' : 's'}`} />
    </Box>
  </Row>
  const wStrLabel = <Row className="label">
    <Box className="logo-container">
      <Logo className="logo" />
    </Box>
    <Box className="value-balance">
      <Text className="value">WSTR</Text>
      <Balance amount={dust} label="WSTR" />
    </Box>
  </Row>

  return (
    <Col flexDirection={['column', 'column', 'column','row-reverse']}>
      { confirm
        ? <>
            <Review/>
            <Box 
              className="form-holder" 
              maxWidth="576px" 
              marginRight={[0, 0, 0, 4]}
              marginTop={[4, 4, 4, 0]}
            >
              <ConfirmationForm
                starsForDust={starsForDust}
                dust={Number(dustInput)}
                stars={selectedStars}
                onConfirm={confirmTrade}
                onCancel={() => setConfirm(false)}
              />
              {/* {showConfirmTrade && <Modal hideModal={() => setShowConfirmTrade(false)}>
                <Box className="confirm-trade-modal">
                  <Box className="message">
                    {selectedStars.length
                    ? 'You will need to make 2 transactions per star if the star\'s transfer proxy is not already set to the WSTR treasury contract. The first to authorize the WSTR contract to transfer your star, the second to deposit the star.'
                    : 'You will need to make 1 transaction per star.'}
                  </Box>
                  <Row className="buttons" gapX={3}>
                    <Button className="cancel" borderRadius={3} onClick={() => setShowConfirmTrade(false)}>Cancel</Button>
                    <Button className="confirm" borderRadius={3} onClick={confirmTrade}>Execute</Button>
                  </Row>
                </Box>
              </Modal>} */}
            </Box>
          </>
        :
          <>
            {exchange === Exchange.starsForDust ? <SwapStars /> : <SwapWSTR />}
            <Box 
              className="form-holder" 
              maxWidth="576px" 
              marginRight={[0, 0, 0, 4]}
              marginTop={[4, 4, 4, 0]}
            >
              <form className="swap-form">
                <Row className="half deposit">
                  <Box className="denomination">
                    <Text className="action" bold gray>Deposit</Text>
                    {starsForDust ? starLabel : wStrLabel}
                  </Box>
                  <Box className="assets">
                    <Text className="exchange-rate">{starsForDust ? 'Select one or more stars to swap' : getExchangeRate(starsForDust)}</Text>
                    {
                      starsForDust ?
                      <StarSelector {...{toggleStarSelector, selectStar, selectedStars, showStarSelector, disabled: !stars.length}} /> :
                      dustInputField
                    }
                  </Box>

                  <Box className="toggle-exchange" onClick={toggleExchange}>
                    <Swap />
                  </Box>
                </Row>

                <Row className="half receive">
                  <Box className="denomination">
                    <Text className="action" bold gray>Receive</Text>
                    {starsForDust ? wStrLabel : starLabel}
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
          </>
      }
    </Col>
  )
}

export default SwapForm

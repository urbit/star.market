import { Button, Box, Text, Row } from "@tlon/indigo-react"
import { useStore } from "../../store"
import Star from "../../types/Star"
import { APPROX_DEPOSIT_GAS, APPROX_WITHDRAW_GAS, GWEI, TEN_THOUSAND } from "../../utils/constants"
import { stopClick } from "../../utils/modal"
import { getExchangeRate } from "../../utils/text"
import Balance from "../Balance"
import Logo from "../Icons/Logo"
import FeeDropdown from "./FeeDropdown"

interface ConfirmationFormProps {
  starsForDust: boolean
  dust: number
  stars: Star[]
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationForm ({ starsForDust, stars, dust, onConfirm, onCancel }: ConfirmationFormProps) {
  const { gasPrice } = useStore()
  
  const amount = starsForDust ? stars.length : dust
  const starLabelText = `Star${stars.length === 1 ? '' : 's'}`

  const txCost = gasPrice * amount * (starsForDust ? APPROX_DEPOSIT_GAS : APPROX_WITHDRAW_GAS) * GWEI
  const formattedTxCost = Math.round(txCost * TEN_THOUSAND) / TEN_THOUSAND

  const exchangeRate = getExchangeRate(starsForDust)

  const starLabel = <Row className="label-row">
    <Text className="value">{amount}</Text>
    <Box className="label">
      <Text className="star">{starLabelText}</Text>
      <Balance amount={amount} label={starLabelText} />
    </Box>
    {starsForDust && <Box className="stars">{stars.map(({ name }) => name).join(', ')}</Box>}
  </Row>

  const wStrLabel = <Row className="label-row">
    <Box className="logo-container">
      <Logo />
    </Box>
    <Text className="value">{amount}.000</Text>
    <Box className="label">
      <Text className="wstr">WSTR</Text>
      <Balance amount={amount} label="WSTR" />
    </Box>
  </Row>

  return <form className="confirmation-form" onSubmit={stopClick}>
    <Text className="swap-message">You are Swapping</Text>
    {starsForDust ? starLabel : wStrLabel}

    <Text className="receive-message">You are Receiving</Text>
    {starsForDust ? wStrLabel : starLabel}

    <div className="info-row">
      <div className="left">Rate</div>
      <div className="right">{exchangeRate}</div>
    </div>
    <div className="info-row">
      <div className="left">Gas Price</div>
      <FeeDropdown />
    </div>
    <div className="info-row">
      <div className="left">Estimated Fee</div>
      <div className="right">{formattedTxCost} ETH</div>
    </div>
    <div className="buttons">
      <Button className="button-lg cancel" fontSize= "1.25rem" color="white" height={7} onClick={onCancel} borderRadius={4}>Cancel</Button>
      <Button className={`${starsForDust ? 'star' : 'wstr'}`} color="black" ml={3} backgroundColor="#f3c263" fontSize= "1.25rem" height={7} borderRadius={4} onClick={onConfirm}>Execute</Button>
    </div>
  </form>
}

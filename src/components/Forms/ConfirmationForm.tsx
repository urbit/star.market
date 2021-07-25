import { Box, Button, Text } from "@tlon/indigo-react"
import { useStore } from "../../store"
import Star from "../../types/Star"
import { APPROX_DEPOSIT_GAS, APPROX_WITHDRAW_GAS, GWEI, TEN_THOUSAND } from "../../utils/constants"
import { stopClick } from "../../utils/modal"
import { getExchangeRate } from "../../utils/text"
import StarEntry from "../Star/StarEntry"

interface ConfirmationFormProps {
  starsForDust: boolean
  dust: number
  stars: Star[]
  onConfirm: () => Promise<void>
  onCancel: () => void
}

const ConfirmationForm = ({ starsForDust, dust, stars, onConfirm, onCancel }: ConfirmationFormProps) => {
  const gasPrice: number = useStore((store: any) => store.gasPrice)
  
  const amount = starsForDust ? stars.length : dust

  const txCost = gasPrice * amount * (starsForDust ? APPROX_DEPOSIT_GAS : APPROX_WITHDRAW_GAS) * GWEI
  const formattedTxCost = Math.round(txCost * TEN_THOUSAND) / TEN_THOUSAND

  const exchangeRate = getExchangeRate(starsForDust)

  return <form className={`confirmation-form ${starsForDust ? 'star' : 'dust'}`} onSubmit={stopClick}>
    <Box className="denomination">
      <Text className="label">{`You will ${starsForDust ? 'deposit' : 'redeem'}`}</Text>
      <Text className="value">{`${amount} ${starsForDust ? 'STAR' : 'DUST'}`}</Text>
    </Box>
    {starsForDust && <div className="star-container">
      {stars.map((star) => <StarEntry star={star} key={star.name} selected />)}
    </div>}

    <Box className="denomination">
      <Text className="label">You will receive</Text>
      <Text className={`value ${starsForDust ? 'star' : 'dust'}`}>{`${amount} ${starsForDust ? 'DUST' : 'STAR'}`}</Text>
    </Box>

    <div className="info-row">
      <div className="left">Rate</div>
      <div className="right">{exchangeRate}</div>
    </div>
    <div className="info-row">
      <div className="left">Estimated Fee</div>
      <div className="right">{formattedTxCost} ETH</div>
    </div>
    <div className="buttons">
      <Button className="cancel" onClick={onCancel}>Cancel</Button>
      <Button className={`confirm ${starsForDust ? 'star' : 'dust'}`} onClick={onConfirm}>Confirm</Button>
    </div>
  </form>
}

export default ConfirmationForm

import { Box, Text } from "@tlon/indigo-react"
import { getExchangeRate } from "../../utils/text"
import { Exchange } from "./SwapForm"

interface ReceiveDisplayProps {
  amount: number
  exchange: Exchange
}

const ReceiveDisplay = ({ exchange, amount }: ReceiveDisplayProps) => {
  const starsForDust = exchange === Exchange.starsForDust
  const exchangeRate = getExchangeRate(starsForDust)
  const text = starsForDust ? `${amount}.00` : `The ${amount > 0 ? amount : ''} star${amount === 1 ? '' : 's'} you’ll receive ${amount === 1 ? 'is' : 'are'} unable to be selected, and will be popped off the top of the treasury.`

  return <Box className="receive-display">
    {starsForDust && <Text className="exchange-rate">{exchangeRate}</Text>}
    <Box className={starsForDust ? 'wstr' : 'stars'}>{text}</Box>
  </Box>
}

export default ReceiveDisplay

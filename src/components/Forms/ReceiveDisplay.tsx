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
  const text = starsForDust ? `${amount}.00` : "The star(s) you receive cannot be selected."

  return <Box className="receive-display">
    {starsForDust && <Text className="exchange-rate">{exchangeRate}</Text>}
    <Box className={starsForDust ? 'wstr' : 'stars'}>{text}</Box>
  </Box>
}

export default ReceiveDisplay

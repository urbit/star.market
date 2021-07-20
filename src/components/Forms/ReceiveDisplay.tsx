import { Box, Text } from "@tlon/indigo-react"
import { getExchangeRate } from "../../utils/text"
import { Exchange } from "./SwapForm"

interface ReceiveDisplayProps {
  amount: number
  exchange: Exchange
}

const ReceiveDisplay = ({ amount, exchange }: ReceiveDisplayProps) => {
  const starsForDust = exchange === Exchange.starsForDust
  const exchangeRate = getExchangeRate(starsForDust)
  let className = 'amount'
  if (amount > 0) {
    className = `${className} ${starsForDust ? 'star' : 'dust'}`
  }

  return <Box className="receive-display">
    <Text className="exchange-rate">{exchangeRate}</Text>
    <Text className={className}>{amount}</Text>
  </Box>
}

export default ReceiveDisplay

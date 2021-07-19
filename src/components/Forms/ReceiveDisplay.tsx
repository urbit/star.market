import { Box, Text } from "@tlon/indigo-react"
import { Exchange } from "./SwapForm"

const APPROX_DEPOSIT_GAS = 520000
const APPROX_WITHDRAW_GAS = 300000
const GWEI = Math.pow(10, -9)
const PRECISION = 10000

interface ReceiveDisplayProps {
  amount: number
  exchange: Exchange
  gasPrice: number
}

const ReceiveDisplay = ({ amount, exchange, gasPrice }: ReceiveDisplayProps) => {
  const starsForDust = exchange === Exchange.starsForDust
  const exchangeRate = starsForDust ? '1 DUST = 1 STAR' : '1 STAR = 1 DUST'
  let className = 'amount'
  if (amount > 0) {
    className = `${className} ${starsForDust ? 'star' : 'dust'}`
  }

  const txCost = gasPrice * amount * (starsForDust ? APPROX_DEPOSIT_GAS : APPROX_WITHDRAW_GAS) * GWEI
  const formattedTxCost = Math.round(txCost * PRECISION) / PRECISION

  return <Box className="receive-display">
    <Text className="exchange-rate">{exchangeRate}</Text>
    <Text className={className}>{amount}</Text>
    {!!amount && <Text className="tx-cost">
      Estimated Fee: {formattedTxCost} ETH
    </Text>}
  </Box>
}

export default ReceiveDisplay

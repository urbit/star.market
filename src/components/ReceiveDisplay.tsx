import { Box, Text } from "@tlon/indigo-react"
import { Exchange } from "./SwapForm"

const ReceiveDisplay = ({ amount, exchange }: { amount: number, exchange: Exchange }) => {
  const exchangeRate = exchange === Exchange.dustForStars ? '1 STAR = 1 DUST' : '1 DUST = 1 STAR'
  let className = 'amount'
  if (amount > 0) {
    console.log('ere')
    className = `${className} ${exchange === Exchange.dustForStars ? 'dust' : 'star'}`
  }

  return <Box className="receive-display">
    <Text className="exchange-rate">{exchangeRate}</Text>
    <Text className={className}>{amount}</Text>
  </Box>
}

export default ReceiveDisplay

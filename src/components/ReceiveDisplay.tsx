import { Box, Text } from "@tlon/indigo-react"
import { pluralize, starDustLabel } from "../utils/text"
import { Exchange } from "./SwapForm"

const ReceiveDisplay = ({ amount, exchange }: { amount: number, exchange: Exchange }) => {
  const text = `You will receive ${amount} ${pluralize(starDustLabel(exchange), amount, exchange === Exchange.dustForStars)}`

  return <Box>
    <Text>{text}</Text>
  </Box>
}

export default ReceiveDisplay

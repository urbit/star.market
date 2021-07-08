import { Box, Text } from "@tlon/indigo-react";
import Star from "../types/Star";

const StarEntry = ({ star: { name, canTrade } }: { star: Star }) => {
  const display = `${name} - ${canTrade ? '' : 'not'} tradeable`

  return <Box>
    <Text>{display}</Text>
  </Box>
}

export default StarEntry

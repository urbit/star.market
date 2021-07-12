import { Box, Text } from "@tlon/indigo-react";
import Star from "../types/Star";

const StarEntry = ({ star, selected, onSelect }: { star: Star, selected?: boolean, onSelect?: (star: Star) => void }) => {
  const { name, canTrade } = star
  const display = `${name} - ${canTrade ? '' : 'not'} tradeable`

  const select = () => {
    if (onSelect) {
      onSelect(star)
    }
  }

  return <Box onClick={select} backgroundColor={selected ? 'rgba(0, 0, 0, 0.2)' : 'white'}>
    <Text>{display}</Text>
  </Box>
}

export default StarEntry

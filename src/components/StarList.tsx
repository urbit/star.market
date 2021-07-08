import { useStore } from '../store'
import { Box } from '@tlon/indigo-react'
import Star from '../types/Star'
import StarEntry from './StarEntry'

const StarList = ({ selected, onSelect }: { selected?: Star[], onSelect?: (star: Star) => void }) => {
  const stars: Star[] = useStore((store: any) => store.stars) || []

  return <Box>
    {stars.map((star) => <StarEntry star={star} key={`star-${star.point}`} />)}
  </Box>
}

export default StarList

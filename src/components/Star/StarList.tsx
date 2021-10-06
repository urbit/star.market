import { useStore } from '../../store'
import { Box } from '@tlon/indigo-react'
import Star from '../../types/Star'
import StarEntry from './StarEntry'

const StarList = ({ selected, showCheckbox, onSelect }: { showCheckbox?: boolean, selected?: Star[], onSelect?: (star: Star) => void }) => {
  const stars = useStore((store) => store.stars.filter(({ isUnlinked }) => isUnlinked)) || []

  return <Box className="star-list">
    {stars.map((star) => <StarEntry
      star={star}
      key={`star-${star.point}`}
      onSelect={onSelect}
      showCheckbox={showCheckbox}
      selected={!!selected?.find(({ point }) => point === star.point)} />)}
  </Box>
}

export default StarList

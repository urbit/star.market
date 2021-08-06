import { Box, Row } from "@tlon/indigo-react";
import { sigil, reactRenderer } from '@tlon/sigil-js'
import { MouseEvent } from "react";
import Star from "../../types/Star";

const StarEntry = ({ star, selected, onSelect }: { star: Star, selected?: boolean, onSelect?: (star: Star) => void }) => {
  const { name, point, isUnlinked, getDisabledMessage } = star

  const select = (event: MouseEvent) => {
    if (onSelect) {
      event.preventDefault()
      event.stopPropagation()
      onSelect(star)
    }
  }

  let className = 'star-entry'

  if (!isUnlinked) {
    className = `${className} disabled`
  } else if (selected) {
    className = `${className} selected`
  }

  return <Box className={className} onClick={select}>
    <Row className="sigil-name">
      {sigil({
       patp: name,
       renderer: reactRenderer,
       size: 16,
       colors: [isUnlinked ? selected ? 'rgba(0, 177, 113, 1)' : 'black' : '#9a9a9a', 'white'],
     })}
      <div>{name}</div>
    </Row>
    <div className="label">{isUnlinked ? `AZP ${point}` : getDisabledMessage()}</div>
  </Box>
}

export default StarEntry

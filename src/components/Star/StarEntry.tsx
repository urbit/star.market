import { Box, Button, Checkbox, Row } from "@tlon/indigo-react";
import { sigil, reactRenderer } from '@tlon/sigil-js'
import { MouseEvent } from "react";
import Star from "../../types/Star";

interface StarEntryProps {
  star: Star
  selected?: boolean
  showCheckbox?: boolean
  onSelect?: (star: Star) => void
}

const StarEntry = ({ star, selected = false, onSelect, showCheckbox = false }: StarEntryProps) => {
  const { name, isUnlinked, getDisabledMessage } = star

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

  return <Row className={className} onClick={select}>
    <Row className="sigil-name">
      {/* {isUnlinked && showCheckbox && <Checkbox className="checkbox" selected={selected} />} */}
      {sigil({
        patp: name,
        renderer: reactRenderer,
        size: 48,
        colors: ['black', 'white'],
      })}
      <div>{name}</div>
    </Row>
    <Button className="select-star">{selected ? 'Swapping' : 'Swap'}</Button>
  </Row>
}

export default StarEntry

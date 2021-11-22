import { Button, Row } from "@tlon/indigo-react";
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
  const { 
    name, 
    isEligible, 
    // getDisabledMessage
  } = star

  const select = (event: MouseEvent) => {
    if (onSelect) {
      event.preventDefault()
      event.stopPropagation()
      onSelect(star)
    }
  }

  let className = 'star-entry'

  if (!isEligible) {
    className = `${className} disabled`
  } else if (selected) {
    className = `${className} selected`
  }

  return <Row className={className} onClick={select}>
    <Row className="sigil-name">
      {/* {isEligible && showCheckbox && <Checkbox className="checkbox" selected={selected} />} */}
      {sigil({
        patp: name,
        renderer: reactRenderer,
        size: 48,
        colors: ['black', 'white'],
      })}
      <div>{name}</div>
    </Row>
    <Button className="select-star">{selected ? 'Selected' : 'Select'}</Button>
  </Row>
}

export default StarEntry

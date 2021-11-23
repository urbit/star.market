import React, { MouseEvent } from "react"

import { Icon, Row, Box, Text, Button } from "@tlon/indigo-react"
import StarList from "./StarList"
import Modal from '../Modal'
import Star from "../../types/Star"

import './StarSelector.scss'

interface StarSelectorProps {
  toggleStarSelector: () => void
  selectStar: (s: Star) => void
  selectedStars: Star[]
  showStarSelector: boolean
  disabled: boolean
}

const stop = (e: MouseEvent) => {
  e.stopPropagation()
}

export default function StarSelector (
  { toggleStarSelector, selectedStars, selectStar, showStarSelector, disabled } : StarSelectorProps
) {
  const numStars = selectedStars.length

  return <Row className="star-selector" onClick={disabled ? undefined : toggleStarSelector}>
    <div className={`selected-stars ${numStars ? 'selected' : ''}`}>
      {!numStars ? 'No stars selected' : selectedStars.map(({ name }) => name).join(', ')}
    </div>
    <Icon icon="ChevronSouth" />
    {showStarSelector && <Modal hideModal={toggleStarSelector}>
      <Box className="star-selector-modal" onClick={stop}>
        <Text className="title">Select stars to swap</Text>
        <Text className="info">
          You may only select stars which have never spawned planets to swap with wrapped token assets.
        </Text>
        <StarList selected={selectedStars} onSelect={selectStar} showCheckbox />
        <Row className="buttons">
          <Button className="back" onClick={toggleStarSelector}>Back</Button>
          <Button className={`swap ${numStars ? 'selected' : ''}`} disabled={!numStars} onClick={toggleStarSelector}>Swap {numStars ? numStars : ''} Star{numStars === 1 ? '' : 's'}</Button>
        </Row>
      </Box>
    </Modal>}
  </Row>
}

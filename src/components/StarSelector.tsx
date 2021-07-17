import { MouseEvent } from "react"

import { Box } from "@tlon/indigo-react"
import StarList from "./StarList"
import StarEntry from "./StarEntry"
import Star from "../types/Star"

interface StarSelectorProps {
  toggleStarSelector: (e: MouseEvent) => void
  selectStar: (s: Star) => void
  selectedStars: Star[]
  showStarSelector: boolean
}

const StarSelector = (
  { toggleStarSelector, selectedStars, selectStar, showStarSelector } : StarSelectorProps
) => {
  return <Box className="star-selector" onClick={toggleStarSelector}>
    {!selectedStars.length ?
      <div className="amount">Select Stars</div> :
      <div className="selected-stars">
        {selectedStars.map((star) => <StarEntry selected star={star} />)}
      </div>
    }
    {showStarSelector && <StarList selected={selectedStars} onSelect={selectStar} />}
  </Box>
}

export default StarSelector

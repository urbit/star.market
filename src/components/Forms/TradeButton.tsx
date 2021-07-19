import { Button } from "@tlon/indigo-react"

const TradeButton = (
  { hasAddress, disabled, starsForDust, onClick }:
  { hasAddress: boolean, disabled: boolean, starsForDust: boolean, onClick: () => void }
) => {
  let className = `trade-button ${starsForDust ? 'star' : 'dust'}`
  if (!hasAddress) {
    className = `${className} connect`
  } else if (disabled) {
    className = `${className} disabled`
  }

  let text = 'Connect'

  if (hasAddress) {
    if (disabled) {
      if (starsForDust) {
        text = 'Select Stars'
      } else {
        text = 'Select Dust'
      }
    } else {
      text = 'Exchange'
    }
  }

  return <Button {...{ className, disabled, onClick }}>
    {text}
  </Button>
}

export default TradeButton

import { Button } from "@tlon/indigo-react"

const TradeButton = (
  { hasAddress, disabled, starsForDust, onClick }:
  { hasAddress: boolean, disabled: boolean, starsForDust: boolean, onClick: () => void }
) => {
  let className = `trade-button ${starsForDust ? 'star' : 'wstr'}`
  if (!hasAddress) {
    className = `${className} connect`
  } else if (disabled) {
    className = `${className} disabled`
  }

  let text = 'Connect Wallet'

  if (hasAddress) {
    if (disabled) {
      if (starsForDust) {
        text = 'Select Stars to Swap'
      } else {
        text = 'Input WSTR to Swap'
      }
    } else {
      text = 'Review Swap'
    }
  }

  return <Button {...{ className, disabled, onClick }}>
    {text}
  </Button>
}

export default TradeButton

import { Button, Icon, Row } from "@tlon/indigo-react"
import { useStore } from "../../store"
import { stopClick } from "../../utils/modal"

import './ResultsDisplays.scss'

const ETHERSCAN_TX_URL = 'https://etherscan.io/tx/'

const SuccessDisplay = ({ onClose } : { onClose: () => void }) => {
  const successTxHashes = useStore((state: any) => state.successTxHashes)

  const openLink = (link: string) => () => {
    window.open(link)
    return false
  }

  return <div className="display-container success" onClick={stopClick}>
    <Row className="title">
      <Icon className="icon" icon="CheckmarkBold" color="green" size={40} />
      <h1>Success!</h1>
    </Row>
    <div className="message">
      Your transaction has been sent and is now pending. You can see your transaction{successTxHashes.length > 1 ? 's' : ''} on etherscan:
      <br />
      <div className="transactions">
        {successTxHashes.map((hash: string, index: number) => <a href="/#" onClick={openLink(`${ETHERSCAN_TX_URL}${hash}`)} key={hash}>
          Transaction {index + 1}
        </a>)}
      </div>
      <br />
      Once the transaction completes, you will need to refresh the page using the button in the upper right of the screen.
    </div>
    <Button onClick={onClose}>Close</Button>
  </div>
}

export default SuccessDisplay

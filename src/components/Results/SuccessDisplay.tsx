import { Anchor, Button, Icon, Row } from "@tlon/indigo-react"
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

  const firstSentence = successTxHashes.length > 1
    ? 'Your transactions have been sent and are now pending'
    : 'Your transaction has been sent and is now pending'
  const transaction = successTxHashes.length > 1 ? 'transactions' : 'transaction'
  const completionClause = successTxHashes.length > 1
    ? 'Once the transactions complete'
    : 'Once the transaction completes'

  return <div className="display-container success" onClick={stopClick}>
    <Row className="title">
      <Icon className="icon" icon="CheckmarkBold" color="green" size={40} />
      <h1>Success!</h1>
    </Row>
    <div className="message">
      {firstSentence}. You can see your {transaction} on etherscan:
      <br />
      <div className="transactions">
        {successTxHashes.map((hash: string, index: number) => <Anchor href="/#" onClick={openLink(`${ETHERSCAN_TX_URL}${hash}`)} key={hash}>
          Transaction {index + 1}
        </Anchor>)}
      </div>
      <br />
      {completionClause}, you will need to refresh the page using the button in the upper right of the screen.
    </div>
    <Button borderRadius={3} onClick={onClose}>Close</Button>
  </div>
}

export default SuccessDisplay

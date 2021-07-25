import { Button, Icon, Row } from "@tlon/indigo-react"
import { useStore } from "../../store"
import { stopClick } from "../../utils/modal"

import './ResultsDisplays.scss'

const ErrorDisplay = ({ onClose } : { onClose: () => void }) => {
  const errorMessage = useStore((state: any) => state.errorMessage)

  return <div className="display-container error" onClick={stopClick}>
    <Row className="title">
      <Icon className="icon" icon="X" color="red" size={40} />
      <h1>Error</h1>
    </Row>
    <div className="message">
      There was an error executing the transaction.
      <br /><br />
      {errorMessage.toString()}.
      <br /><br />
      Please check your connection and wallet and try again.
    </div>
    <Button onClick={onClose}>Close</Button>
  </div>
}

export default ErrorDisplay

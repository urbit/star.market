import { useCallback, useState, ChangeEvent } from "react"
import { Button, Checkbox, Row } from "@tlon/indigo-react"

import { useStore } from "../../store"
import Account from "../../account"
import FormHeader from "./FormHeader"
import { stopClick } from "../../utils/modal"

const ob = require('urbit-ob')

const MasterTicketForm = ({ hideModal }: { hideModal: () => void }) => {
  const account: Account = useStore((store: any) => store.account)

  const [ticket, setTicket] = useState('')
  const [ship, setShip] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [revision, setRevision] = useState('')
  const [boot, setBoot] = useState(false)

  const submit = useCallback(() => {
    // TODO: form validation on all components
    
    const formattedShip = Number(ob.patp2dec(`~${ship}`))

    account.connectMasterTicket({
      ticket, ship: formattedShip, passphrase, revision: Number(revision), boot
    })

    hideModal()
  }, [account, ticket, ship, passphrase, revision, boot, hideModal])

  const changeTicket = (event: ChangeEvent<HTMLInputElement>) => setTicket(event.target.value)
  const changeShip = (event: ChangeEvent<HTMLInputElement>) => setShip(event.target.value.replace(/[^a-zA-Z-]/g,'').toLowerCase())
  const changePassphrase = (event: ChangeEvent<HTMLInputElement>) => setPassphrase(event.target.value)
  const changeRevision = (event: ChangeEvent<HTMLInputElement>) => setRevision(event.target.value.replace(/\D/g,''))
  const toggleBoot = () => setBoot(!boot)

  const disabled = !(ticket && ship)

  return <form className="master-ticket-form" onClick={stopClick}>
    <FormHeader title="Enter Master Ticket" hideModal={hideModal} />
    <label>Ticket</label>
    <input
      placeholder="Ticket"
      value={ticket}
      onChange={changeTicket}
      type="text"
    />
    <label>Ship</label>
    <input
      placeholder="Ship (lowercase, no leading tilda)"
      value={ship}
      onChange={changeShip}
      type="text"
    />
    <label>Passphrase</label>
    <input
      placeholder="Passphrase (optional)"
      value={passphrase}
      onChange={changePassphrase}
      type="text"
    />
    <label>Revision</label>
    <input
      placeholder="Revision (number, optional)"
      value={revision}
      onChange={changeRevision}
      type="numeric"
    />
    <Row>
      <label>Boot: </label>
      <Checkbox className="checkbox" selected={boot} onClick={toggleBoot} />
    </Row>

    <Button className={`submit ${disabled ? 'disabled' : ''}`} onClick={submit} disabled={disabled}>
      Submit
    </Button>
  </form>
}

export default MasterTicketForm

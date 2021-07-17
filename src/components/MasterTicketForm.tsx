import { useState, ChangeEvent } from "react"

import { Box, Button, Checkbox, Row } from "@tlon/indigo-react"
import TextInput from "./TextInput"
import { useCallback } from "react"
import { useStore } from "../store"
import Account from "../account"

const MasterTicketForm = ({ onSubmit }: { onSubmit: Function }) => {
  const account: Account = useStore((store: any) => store.account)

  const [ticket, setTicket] = useState('')
  const [ship, setShip] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [revision, setRevision] = useState('')
  const [boot, setBoot] = useState(false)

  const submit = useCallback(() => {
    account.connectMasterTicket({
      ticket, ship: Number(ship), passphrase, revision: Number(revision), boot
    })

    onSubmit()
  }, [account, ticket, ship, passphrase, revision, boot, onSubmit])

  const changeTicket = (event: ChangeEvent<HTMLInputElement>) => setTicket(event.target.value)
  const changeShip = (event: ChangeEvent<HTMLInputElement>) => setShip(event.target.value.replace(/\D/g,''))
  const changePassphrase = (event: ChangeEvent<HTMLInputElement>) => setPassphrase(event.target.value)
  const changeRevision = (event: ChangeEvent<HTMLInputElement>) => setRevision(event.target.value.replace(/\D/g,''))
  const toggleBoot = () => setBoot(!boot)

  return <form className="master-ticket-form">

    <h3>Enter Master Ticket Info</h3>
    <label>Ticket</label>
    <TextInput
      placeholder="Ticket"
      value={ticket}
      onChange={changeTicket}
      type="text"
    />
    <label>Ship</label>
    <TextInput
      placeholder="Ship (integer of galaxy, star, or planet)"
      value={ship}
      onChange={changeShip}
      type="numeric"
    />
    <label>Passphrase</label>
    <TextInput
      placeholder="Passphrase (optional)"
      value={passphrase}
      onChange={changePassphrase}
      type="text"
    />
    <label>Revision</label>
    <TextInput
      placeholder="Revision (number, optional)"
      value={revision}
      onChange={changeRevision}
      type="numeric"
    />
    <Row marginTop="8px">
      <Box marginRight="8px">Boot: </Box>
      <Checkbox selected={boot} onClick={toggleBoot} />
    </Row>

    {(ticket && ship) && <Button onClick={submit}>
      Submit
    </Button>}
  </form>
}

export default MasterTicketForm

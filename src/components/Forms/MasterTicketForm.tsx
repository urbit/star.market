import { useCallback, useState, ChangeEvent } from "react"
import { Button } from "@tlon/indigo-react"

import { useStore } from "../../store"
import Account from "../../account"
import FormHeader from "./FormHeader"
import { stopClick } from "../../utils/modal"
import { RefreshProps } from "../Container"
import { UrbitWallet } from "../../types/UrbitWallet"
import { formatTicket } from "../../utils/ticket"

const ob = require('urbit-ob')
const { generateWallet } = require('urbit-key-generation')

interface MasterTicketFormProps extends RefreshProps {
  hideModal: () => void
  hideParentModal: () => void
}

const MasterTicketForm = ({ hideModal, hideParentModal, refresh } : MasterTicketFormProps) => {
  const { setAccount, setLoading } = useStore()

  const [ticket, setTicket] = useState('')
  const [ship, setShip] = useState('')
  const [passphrase, setPassphrase] = useState('')
  // const [revision, setRevision] = useState('')
  // const [boot, setBoot] = useState(false)

  const submit = useCallback(async () => {
    // TODO: form validation on all components
    setLoading(true)
    
    const formattedShip = ob.patp2dec(ship)

    const urbitWallet: UrbitWallet = await generateWallet({
      ticket, ship: formattedShip, passphrase
    })

    const newAccount = new Account({ urbitWallet })
    setAccount(newAccount)

    hideModal()
    hideParentModal()
    refresh(newAccount)
  }, [ticket, ship, passphrase, hideModal, hideParentModal, setAccount, setLoading, refresh])

  const changeTicket = (event: ChangeEvent<HTMLInputElement>) => setTicket(formatTicket(event.target.value))
  const changeShip = (event: ChangeEvent<HTMLInputElement>) => setShip(formatTicket(event.target.value))
  const changePassphrase = (event: ChangeEvent<HTMLInputElement>) => setPassphrase(event.target.value)
  // const changeRevision = (event: ChangeEvent<HTMLInputElement>) => setRevision(event.target.value.replace(/\D/g,''))
  // const toggleBoot = () => setBoot(!boot)

  const disabled = !(ticket && ship)

  return <form className="master-ticket-form" onClick={stopClick}>
    <FormHeader title="Enter Master Ticket" hideModal={hideModal} />
    <label>Ship</label>
    <input
      placeholder="Ship (lowercase)"
      value={ship}
      onChange={changeShip}
      type="text"
      maxLength={13}
    />
    <label>Ticket</label>
    <input
      placeholder="Ticket (lowercase)"
      value={ticket}
      onChange={changeTicket}
      type="text"
      // maxLength={27}
    />
    <label>Passphrase</label>
    <input
      placeholder="Passphrase (optional)"
      value={passphrase}
      onChange={changePassphrase}
      type="password"
    />
    {/* <label>Revision</label>
    <input
      placeholder="Revision (number, optional)"
      value={revision}
      onChange={changeRevision}
      type="numeric"
    /> */}
    {/* <Row>
      <label>Boot: </label>
      <Checkbox className="checkbox" selected={boot} onClick={toggleBoot} />
    </Row> */}

    <Button className={`submit ${disabled ? 'disabled' : ''}`} onClick={submit} disabled={disabled}>
      Submit
    </Button>
  </form>
}

export default MasterTicketForm

import { useCallback, useState } from 'react'
import { Box } from '@tlon/indigo-react'

import HeaderBar from './HeaderBar'
import MasterTicketForm from './MasterTicketForm'
import Modal from './Modal'
import SwapForm from './SwapForm'
import WalletForm from './WalletForm'

const Container = () => {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [promptForMasterTicket, setPromptForMasterTicket] = useState(false)

  const toggleMasterTicketModal = useCallback(() => {
    setPromptForMasterTicket(false)
  }, [setPromptForMasterTicket])

  const toggleWalletModal = useCallback(() => {
    setShowWalletModal(!showWalletModal)
  }, [showWalletModal, setShowWalletModal])

  return <Box className="container">
    <HeaderBar toggleWalletModal={toggleWalletModal} />
    <Box display="flex" flexDirection="column" alignItems="center" marginTop="3rem">
      <SwapForm />
    </Box>

    {showWalletModal && <Modal hideModal={() => setShowWalletModal(false)}>
      <WalletForm />
    </Modal>}

    {promptForMasterTicket && <Modal hideModal={toggleMasterTicketModal}>
      <MasterTicketForm onSubmit={() => setPromptForMasterTicket(false)} />
    </Modal>}
  </Box>
}

export default Container

import { useCallback, useState } from 'react'
import { Box } from '@tlon/indigo-react'

import HeaderBar from './Header/HeaderBar'
import MasterTicketForm from './Forms/MasterTicketForm'
import Modal from './Modal'
import SwapForm from './Forms/SwapForm'
import WalletForm from './Forms/WalletForm'
import { useStore } from '../store'
import Account from '../account'
import WalletConnectForm from './Forms/WalletConnectForm'
import LoadingIndicator from './Results/LoadingIndicator'
import SuccessDisplay from './Results/SuccessDisplay'
import ErrorDisplay from './Results/ErrorDisplay'

const Container = ({ refresh } : { refresh: () => void }) => {
  const { setAccount, successTxHashes, errorMessage, loading, setSuccessTxHashes, setErrorMessage } = useStore((store: any) => store)

  const [showWalletModal, setShowWalletModal] = useState(false)
  const [promptForMasterTicket, setPromptForMasterTicket] = useState(false)
  const [promptForWalletConnect, setPromptForWalletConnect] = useState(false)

  const toggleWalletModal = useCallback(() => {
    setShowWalletModal(!showWalletModal)
  }, [showWalletModal, setShowWalletModal])

  const toggleMasterTicketModal = useCallback(() => {
    setPromptForMasterTicket(false)
  }, [setPromptForMasterTicket])

  const toggleWalletConnectModal = useCallback(() => {
    setPromptForWalletConnect(false)
  }, [setPromptForWalletConnect])

  const connectMetamask = useCallback(() => {
    const account = new Account({})
    setAccount(account)
  }, [setAccount])

  return <Box className="container">
    <HeaderBar {...{ refresh, toggleWalletModal }} />
    <Box display="flex" flexDirection="column" alignItems="center" marginTop="3rem">
      <SwapForm />
    </Box>

    {showWalletModal && <Modal hideModal={() => setShowWalletModal(false)}>
      <WalletForm
        hideModal={() => setShowWalletModal(false)}
        connectMetamask={connectMetamask}
        showMasterTicketModal={() => setPromptForMasterTicket(true)}
        showWalletConnectModal={() => setPromptForWalletConnect(true)}
      />
    </Modal>}

    {promptForMasterTicket && <Modal hideModal={toggleMasterTicketModal}>
      <MasterTicketForm hideModal={() => setPromptForMasterTicket(false)} />
    </Modal>}

    {promptForWalletConnect && <Modal hideModal={toggleWalletConnectModal}>
      <WalletConnectForm hideModal={() => setPromptForWalletConnect(false)} />
    </Modal>}

    {successTxHashes.length && <Modal hideModal={() => setSuccessTxHashes([])}>
      <SuccessDisplay onClose={() => setSuccessTxHashes([])} />
    </Modal>}

    {errorMessage && <Modal hideModal={() => setErrorMessage(undefined)}>
      <ErrorDisplay onClose={() => setErrorMessage(undefined)} />
    </Modal>}

    {loading && <Modal hideModal={() => null}>
      <LoadingIndicator />
    </Modal>}
  </Box>
}

export default Container

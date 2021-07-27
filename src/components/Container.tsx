import { useCallback, useState } from 'react'
import { Box } from '@tlon/indigo-react'

import HeaderBar from './Header/HeaderBar'
import MasterTicketForm from './Forms/MasterTicketForm'
import Modal from './Modal'
import SwapForm from './Forms/SwapForm'
import WalletForm from './Forms/WalletForm'
import { useStore } from '../store'
import Account from '../account'
import LoadingIndicator from './Results/LoadingIndicator'
import SuccessDisplay from './Results/SuccessDisplay'
import ErrorDisplay from './Results/ErrorDisplay'

export interface RefreshProps {
  refresh: (account: Account) => void
}

export interface ContainerProps extends RefreshProps {
  connectWalletConnector: () => void
  connectMetamask: () => void
}

const Container = ({ refresh, connectWalletConnector, connectMetamask } : ContainerProps) => {
  const { successTxHashes, errorMessage, loading, setSuccessTxHashes, setErrorMessage } = useStore((store: any) => store)

  const [showWalletModal, setShowWalletModal] = useState(false)
  const [promptForMasterTicket, setPromptForMasterTicket] = useState(false)

  const toggleWalletModal = useCallback(() => {
    setShowWalletModal(!showWalletModal)
  }, [showWalletModal, setShowWalletModal])

  const toggleMasterTicketModal = useCallback(() => {
    setPromptForMasterTicket(false)
  }, [setPromptForMasterTicket])

  return <Box className="container">
    <HeaderBar {...{ refresh, toggleWalletModal }} />
    <Box display="flex" flexDirection="column" alignItems="center" marginTop="3rem">
      <SwapForm {...{ refresh, toggleWalletModal }} />
    </Box>

    {showWalletModal && <Modal hideModal={() => setShowWalletModal(false)}>
      <WalletForm
        {...{ refresh, connectWalletConnector, connectMetamask }}
        hideModal={() => setShowWalletModal(false)}
        showMasterTicketModal={() => setPromptForMasterTicket(true)}
      />
    </Modal>}

    {promptForMasterTicket && <Modal hideModal={toggleMasterTicketModal}>
      <MasterTicketForm refresh={refresh} hideModal={() => setPromptForMasterTicket(false)} />
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

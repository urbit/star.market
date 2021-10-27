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
  const { successTxHashes, errorMessage, loading, setSuccessTxHashes, setErrorMessage } = useStore()

  const [showWalletModal, setShowWalletModal] = useState(false)
  const [promptForMasterTicket, setPromptForMasterTicket] = useState(false)

  const toggleWalletModal = useCallback(() => {
    setShowWalletModal(!showWalletModal)
  }, [showWalletModal, setShowWalletModal])

  const toggleMasterTicketModal = useCallback(() => {
    setPromptForMasterTicket(false)
  }, [setPromptForMasterTicket])

  const hideWalletModal = () => setShowWalletModal(false)

  return <div className="layout-container">
    <HeaderBar {...{ refresh, toggleWalletModal }} />
      <section className="app-layout">
        <Box display="flex" flexDirection="column" alignItems="center" paddingBottom={7}>
        <SwapForm {...{ refresh, toggleWalletModal }} />
      </Box>

      {showWalletModal && <Modal hideModal={hideWalletModal}>
        <WalletForm
          {...{ refresh, connectWalletConnector, connectMetamask,  }}
          hideModal={hideWalletModal}
          showMasterTicketModal={() => setPromptForMasterTicket(true)}
        />
      </Modal>}

      {promptForMasterTicket && <Modal hideModal={toggleMasterTicketModal}>
        <MasterTicketForm refresh={refresh} hideModal={() => setPromptForMasterTicket(false)} />
      </Modal>}

      {!!successTxHashes.length && <Modal hideModal={() => setSuccessTxHashes([])}>
        <SuccessDisplay onClose={() => setSuccessTxHashes([])} />
      </Modal>}

      {errorMessage && <Modal hideModal={() => setErrorMessage('')}>
        <ErrorDisplay onClose={() => setErrorMessage('')} />
      </Modal>}

      {loading && <Modal hideModal={() => null}>
        <LoadingIndicator />
      </Modal>}       
    </section>
  </div>
}

export default Container

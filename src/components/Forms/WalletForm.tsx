import { useCallback } from 'react'
import { Box } from '@tlon/indigo-react'

import { WalletType } from '../../account'
import { useStore } from '../../store'
import WalletEntry from './WalletEntry'
import FormHeader from './FormHeader'
import { stopClick } from '../../utils/modal'
import { ContainerProps } from '../Container'

interface WalletFormProps extends ContainerProps {
  hideModal: () => void
  showMasterTicketModal: () => void
}

const WalletForm = (
  { hideModal, connectMetamask, showMasterTicketModal, connectWalletConnector } : WalletFormProps
) => {
  const { account } = useStore((store: any) => store)

  const walletTypes = Object.values(WalletType)

  const selectWallet = useCallback((type: WalletType) => () => {
    switch (type) {
      case WalletType.Metamask:
        connectMetamask()
        break
      case WalletType.MasterTicket:
        showMasterTicketModal()
        break
      case WalletType.WalletConnect:
        connectWalletConnector()
        break
    }
  }, [connectMetamask, showMasterTicketModal, connectWalletConnector])

  return <form className="wallet-form" onClick={stopClick}>
    <FormHeader title="Select Wallet" hideModal={hideModal} />
    <div className="metamask-warning">Note: You must be connected to Metamask or some other browser-based Ethereum provider to use a wallet.</div>
    <Box className="wallets">
      {walletTypes.map((type) => <WalletEntry
        type={type}
        selected={account.currentWalletType === type}
        onClick={selectWallet(type)}
        key={`wallet-${type}`}
      />)}
    </Box>

  </form>
}

export default WalletForm

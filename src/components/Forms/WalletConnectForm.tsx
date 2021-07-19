import { useCallback, MouseEvent } from 'react'
import { Box, Button, Row, Text } from '@tlon/indigo-react'

import Account, { WalletType } from '../../account'
import { useStore } from '../../store'
import WalletEntry from './WalletEntry'
import FormHeader from './FormHeader'

interface WalletConnectFormProps {
  hideModal: () => void
}

const WalletConnectForm = (
  { hideModal } : WalletConnectFormProps
) => {
  const stop = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return <form className="wallet-connect-form" onClick={stop}>
    <FormHeader title="WalletConnect" hideModal={hideModal} />
  </form>
}

export default WalletConnectForm

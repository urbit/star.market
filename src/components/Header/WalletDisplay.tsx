import { useState } from "react"
import { Icon, Row, Text } from "@tlon/indigo-react"
import Account from "../../account"
import { useEffect } from "react"

import { useStore } from "../../store"
import { GWEI, TEN_THOUSAND } from "../../utils/constants"
import { RefreshProps } from "../Container"

export interface WalletDisplayProps extends RefreshProps {
  toggleWalletModal: () => void
}

const WalletDisplay = ({ toggleWalletModal, refresh } : WalletDisplayProps) => {
  const account: Account = useStore((store: any) => store.account)
  const [ethBalance, setEthBalance] = useState(0)

  useEffect(() => {
    const getBalance = async () => {
      if (account && account.getBalance) {
        const weiBalance = await account.getBalance()

        const inEth = Math.round(parseInt(weiBalance, 16) * GWEI * GWEI * TEN_THOUSAND) / TEN_THOUSAND
        setEthBalance(inEth)
      }
    }

    getBalance()
  }, [account])

  const address = account.currentAddress

  const displayAddress = address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'Connect Wallet'

  const isValidNetwork = Account.isValidNetwork()

  return isValidNetwork ? <Row className="wallet-display">
    {account.currentAddress && <Text className="eth-balance">{ethBalance} ETH</Text>}
    <Row className="address" onClick={toggleWalletModal}>
      <Text>{displayAddress}</Text>
      {/* Icon here */}
    </Row>
    <Icon className="refresh" onClick={() => refresh(account)} icon="ArrowRefresh" size={20} />
  </Row> :
  <Row className="wallet-display error">
    <Icon color="white" size={20} className="error-icon" icon="Server" />
    <div className="error-message">Invalid Network</div>
  </Row>
}

export default WalletDisplay

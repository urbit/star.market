import { useState } from "react"
import { Icon, Row, Text } from "@tlon/indigo-react"
import Account from "../../account"
import { useEffect } from "react"

import { useStore } from "../../store"
import { GWEI, TEN_THOUSAND } from "../../utils/constants"
import { RefreshProps } from "../Container"

import './WalletDisplay.scss'

export interface WalletDisplayProps extends RefreshProps {
  toggleWalletModal: () => void
}

const WalletDisplay = ({ toggleWalletModal, refresh } : WalletDisplayProps) => {
  const { account, stars, dust } = useStore()
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
  const hasAccount = Boolean(account.currentAddress);

  return isValidNetwork ? <Row className={`pill-button bg-gray ml-0.5em wallet-display ${!address ? 'connect' : ''}`}>
    {hasAccount && <Text className="eth-balance">{ethBalance} ETH</Text>}
    {hasAccount && <Text className="wstr-balance">{dust} WSTR</Text>}
    {hasAccount && <Text className="star-balance">{stars.length} Stars</Text>}
    <Row className="address-refresh">
      <Row className="address" onClick={toggleWalletModal}>
        <Text>{displayAddress}</Text>
        {/* Icon here */}
      </Row>
      {!!address && <Icon className="refresh" onClick={() => refresh(account)} icon="ArrowRefresh" size={20} />}
    </Row>
  </Row> :
  <Row className="wallet-display error">
    <Icon color="white" size={20} className="error-icon" icon="Server" />
    <div className="error-message">Invalid Network</div>
  </Row>
}

export default WalletDisplay

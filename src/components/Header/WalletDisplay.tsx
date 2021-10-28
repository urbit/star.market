import { useState } from "react"
import { Icon, Row } from "@tlon/indigo-react"
import Account from "../../account"
import { useEffect } from "react"

import { useStore } from "../../store"
import { GWEI, TEN_THOUSAND } from "../../utils/constants"
import { RefreshProps } from "../SwapApp"

import './WalletDisplay.scss'

export interface WalletDisplayProps extends RefreshProps {
  toggleWalletModal: () => void
}

const WalletDisplay = ({ toggleWalletModal, refresh } : WalletDisplayProps) => {
  const { account, stars, dust } = useStore()
  const [ethBalance, setEthBalance] = useState(0)

  useEffect(() => {
    const getBalance = async () => {
      try {
        if (account && account.currentWalletType) {
          const weiBalance = await account.getBalance()
  
          const inEth = Math.round(parseInt(weiBalance, 16) * GWEI * GWEI * TEN_THOUSAND) / TEN_THOUSAND
          setEthBalance(inEth)
        }
      } catch (e) {
        console.warn(e)
      }
    }

    getBalance()
  }, [account])

  const address = account.currentAddress;
  const isValidNetwork = Account.isValidNetwork()
  const hasAccount = Boolean(account.currentAddress);

  if (!isValidNetwork) {
    return (
      <Row className="wallet-display error">
        <Icon color="white" size={20} className="error-icon" icon="Server" />
        <div className="error-message">Invalid Network</div>
      </Row>
    )
  }

  if (!address) {
    return (
      <button className="flex pill-button connect-wallet" onClick={toggleWalletModal}>
        Connect Wallet
      </button>
    )
  }

  return (
    <Row className="pill-button bg-gray wallet-display">
      <Row alignItems="center" gapX={4} paddingX={[2, 4]}>
        {hasAccount && <span className="eth-balance">{ethBalance} ETH</span>}
        {hasAccount && <span className="wstr-balance">{dust} WSTR</span>}
        {hasAccount && <span className="star-balance">{stars.length} Stars</span>}
      </Row>
      <Row as="button" className="address-refresh address" onClick={toggleWalletModal}>
        <span>{`${address.slice(0,6)}...${address.slice(-4)}`}</span>
        <Icon
          className="refresh"
          icon="ArrowRefresh"                
          height={4} 
          width={4} 
          onClick={() => refresh(account)} 
        />
      </Row>
    </Row>
  )
}

export default WalletDisplay

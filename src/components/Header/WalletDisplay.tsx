import { useState } from "react"
import { Icon, Row, Text } from "@tlon/indigo-react"
import Account from "../../account"
import { useStore } from "../../store"
import { useEffect } from "react"
import { GWEI, TEN_THOUSAND } from "../../utils/constants"

export interface WalletDisplayProps {
  toggleWalletModal: () => void
  refresh: () => void
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

  const displayAddress = address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'No Address'

  const isValidNetwork = account && account.isValidNetwork && account.isValidNetwork()

  return isValidNetwork ? <Row className="wallet-display">
    <Text className="eth-balance">{ethBalance} ETH</Text>
    <Row className="address" onClick={toggleWalletModal}>
      {/* Icon here */}
      <Text>{displayAddress}</Text>
    </Row>
    <Icon className="refresh" onClick={refresh} icon="ArrowRefresh" size={20} />
  </Row> :
  <Row className="wallet-display error">
    <Icon color="white" size={20} className="error-icon" icon="Server" />
    <div className="error-message">Invalid Network</div>
  </Row>
}

export default WalletDisplay

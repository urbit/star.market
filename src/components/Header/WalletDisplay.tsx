import { Icon, Row, Text } from "@tlon/indigo-react"
import Account from "../../account"
import { useStore } from "../../store"

const WalletDisplay = ({ toggleWalletModal }: { toggleWalletModal: () => void }) => {
  const account: Account = useStore((store: any) => store.account)
  const address = account.currentAddress

  const displayAddress = address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'No Address'

  const isValidNetwork = account && account.isValidNetwork && account.isValidNetwork()

  return isValidNetwork ? <Row className="wallet-display">
    <Text className="eth-balance">{0.09} ETH</Text>
    <Row className="address" onClick={toggleWalletModal}>
      {/* Icon here */}
      <Text>{displayAddress}</Text>
    </Row>
  </Row> :
  <Row className="wallet-display error">
    <Icon color="white" size={20} className="error-icon" icon="Server" />
    <div className="error-message">Invalid Network</div>
  </Row>
}

export default WalletDisplay

import { Row, Text } from "@tlon/indigo-react"

const WalletDisplay = ({ address, toggleWalletModal }: { address?: string, toggleWalletModal: () => void }) => {
  const displayAddress = address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'No Address'

  return <Row className="wallet-display">
    <Text className="eth-balance">{0.09} ETH</Text>
    <Row className="address" onClick={toggleWalletModal}>
      {/* Icon here */}
      <Text>{displayAddress}</Text>
    </Row>
  </Row>
}

export default WalletDisplay

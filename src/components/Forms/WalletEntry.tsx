import { Icon, Row, Text } from "@tlon/indigo-react"
import { WalletType } from "../../account"

interface WalletEntryProps {
  type: WalletType
  selected: boolean
  onClick: () => void
}

const getWalletLogo = (type: WalletType) => {
  switch(type) {
    case WalletType.MasterTicket:
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Urbit_Logo.svg/240px-Urbit_Logo.svg.png'
    case WalletType.WalletConnect:
      return 'https://registry.walletconnect.org/walletconnect-logo.svg'
    default:
      return 'https://betoken.fund/getrichquick/ico/semantic/dist/themes/default/assets/images/metamask-big.png'
  }
}

const WalletEntry = ({ type, selected, onClick }: WalletEntryProps) => {
  return <Row onClick={selected ? () => null : onClick} className={`wallet-entry ${selected ? 'selected' : ''}`}>
    <Row>
      {selected && <Icon className="checkmark" icon={"Checkmark"} />}
      <Text className="name">{type}</Text>
    </Row>
    <img src={getWalletLogo(type)} alt={type} />
  </Row>
}

export default WalletEntry

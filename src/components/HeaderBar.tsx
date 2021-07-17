import { Row, Text } from '@tlon/indigo-react'

import { useStore } from '../store'
import WalletDisplay from './WalletDisplay'

const HeaderBar = ({ toggleWalletModal }: { toggleWalletModal: () => void }) => {
  const { account, treasuryBalance } = useStore((store: any) => store)

  return <Row className="header-bar">
    <Text className="treasury">Treasury: {treasuryBalance} STAR</Text>

    {/* <Box className="title">Stardust Exchange</Box> */}

    <WalletDisplay address={account.currentAddress} toggleWalletModal={toggleWalletModal} />
  </Row>
}

export default HeaderBar

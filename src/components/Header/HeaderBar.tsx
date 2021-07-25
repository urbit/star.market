import { Row, Text } from '@tlon/indigo-react'

import { useStore } from '../../store'
import WalletDisplay, { WalletDisplayProps } from './WalletDisplay'

import './HeaderBar.scss'

const HeaderBar = (props: WalletDisplayProps) => {
  const { treasuryBalance } = useStore((store: any) => store)

  return <Row className="header-bar">
    <Text className="treasury">Treasury: {treasuryBalance} STAR</Text>

    <WalletDisplay {...props} />
  </Row>
}

export default HeaderBar

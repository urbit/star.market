import { Row, Text } from '@tlon/indigo-react'

import { useStore } from '../../store'
import WalletDisplay, { WalletDisplayProps } from './WalletDisplay'

import './HeaderBar.scss'

const HeaderBar = (props: WalletDisplayProps) => {
  const { treasuryBalance } = useStore((store: any) => store)

  return <Row className="header-bar">
    <Text className="treasury">Treasury: {treasuryBalance} STAR</Text>
    {/* TODO: REMOVE THIS BEFORE FINAL VERSION */}
    <div>
      Connect to Hardhat network running on http://65.108.49.124:8545
      <br />
      Use PK: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
    </div>
    <WalletDisplay {...props} />
  </Row>
}

export default HeaderBar

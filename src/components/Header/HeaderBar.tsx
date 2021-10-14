import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Box, Row, Text } from '@tlon/indigo-react';
import { useStore } from '../../store'
import Logo from '../Icons/Logo';
import WalletDisplay, { WalletDisplayProps } from './WalletDisplay'


import { formatComma } from '../../utils/text';
import Modal from '../Modal';

export default function HeaderBar (props: WalletDisplayProps) {
  const { treasuryBalance } = useStore((store: any) => store)
  const balanceText = formatComma(treasuryBalance)
  const [showTreasuryInfo, setShowTreasuryInfo] = useState(false)

  const toggleShowTreasuryInfo = () => setShowTreasuryInfo(!showTreasuryInfo)

  return (
      <header className="homeHeader">
          <div className="innerCol">
              <Row>
                <Link to="/" className="pill-button bg-gray">
                  <Logo />
                  <span className="ml-0.5em">Star Market</span>
                </Link>
                <Row className="treasury pill-button ml-0.5em" onClick={toggleShowTreasuryInfo}>
                  <Text className="ml-0.5em mr-0.5em">{balanceText}</Text>
                  {showTreasuryInfo && <Modal hideModal={toggleShowTreasuryInfo}>
                    <Box className="message-container">
                      <Text className="title">Treasury</Text>
                      <Text className="message">
                        <Text className="stars">{balanceText} Stars</Text> are held by the Star Market Smart Contract.
                      </Text>
                    </Box>
                  </Modal>}
                </Row>
              </Row>
              <nav className="walletSection">
                  <WalletDisplay {...props} />
              </nav>
          </div>
      </header>
  )
}

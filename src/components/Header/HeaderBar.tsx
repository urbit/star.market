import React from 'react'

import { Link } from 'react-router-dom'
import { Row, Text } from '@tlon/indigo-react';
import { useStore } from '../../store'
import Logo from '../Icons/Logo';
import WalletDisplay, { WalletDisplayProps } from './WalletDisplay'

import './HeaderBar.scss'

export default function HeaderBar (props: WalletDisplayProps) {
  const { treasuryBalance } = useStore((store: any) => store)

  return (
      <header className="homeHeader">
          <div className="innerCol">
              <Row>
                <Link to="/" className="pill-button bg-gray">
                  <Logo />
                  <span className="ml-0.5em">Star Market</span>
                </Link>
                <Row className="treasury pill-button">
                  <Logo className="logo" />
                  <Text className="ml-0.5em">{treasuryBalance}</Text>
                </Row>
              </Row>
              <nav className="walletSection">
                  <WalletDisplay {...props} />
              </nav>
          </div>
      </header>
  )
}

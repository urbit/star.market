import { Link } from 'react-router-dom'
import { useStore } from '../../store'
import WalletDisplay, { WalletDisplayProps } from './WalletDisplay'
import Logo from '../Icons/Logo'

import './HeaderBar.scss'

export default function HeaderBar (props: WalletDisplayProps) {
  const { treasuryBalance } = useStore((store: any) => store)

  return (
      <header className="homeHeader">
          <div className="innerCol">
              <Link to="/">
                  <div className="pill-button bg-gray">
                      <Logo />
                      <p className="ml-0.5em">Star Market</p>
                  </div>
              </Link>
              <nav>
                  <button className="pill-button bg-gray mr-0.5">Treasury: {treasuryBalance} STAR</button>
                  <WalletDisplay {...props} />
              </nav>
          </div>
      </header>
  )
}

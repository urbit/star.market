import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Text, Paragraph } from '@tlon/indigo-react'

import { useStore } from '../../store'
import Logo from '../Icons/Logo';
import WalletDisplay, { WalletDisplayProps } from './WalletDisplay'
import { formatComma } from '../../utils/text';

export default function HeaderBar (props: WalletDisplayProps) {
  const { treasuryBalance } = useStore()
  const balanceText = formatComma(treasuryBalance)

  const [isModalOpen, setModal] = useState(false);

  return (
      <header className="homeHeader">
          {
            isModalOpen
              ? <div className="light-dismiss" />
              : <div/>
          }
          <div className="innerCol">
              <div className="flex">
                <Link to="/" className="pill-button bg-gray">
                  <Logo />
                  <span className="ml-0.5em">Star Market</span>
                </Link>
                <DropdownMenu.Root onOpenChange={(isOpen) => setModal(isOpen)} modal={true}>
                  <DropdownMenu.Trigger className="bg-yellow pill-button ml-0.5em">
                    <div className="ml-0.5em mr-0.5em">{balanceText}</div>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Content className="message-container relative" sideOffset={5}>
                    <Text display="block" bold marginBottom="20px" opacity={.6}>Treasury</Text>
                    <Paragraph fontWeight="bold" fontSize="20px" marginBottom="0px">
                    {balanceText} Stars are held by the Star Market Smart Contract.
                    </Paragraph>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>

                {/* <Row className="treasury pill-button ml-0.5em" onClick={toggleShowTreasuryInfo}>
                  <Text className="ml-0.5em mr-0.5em">{balanceText}</Text>
                  {showTreasuryInfo && <Modal hideModal={toggleShowTreasuryInfo}>
                    <Box className="message-container">
                      <Text className="title">Treasury</Text>
                      <Text className="message">
                        <Text className="stars">{balanceText} Stars</Text> are held by the Star Market Smart Contract.
                      </Text>
                    </Box>
                  </Modal>}
                </Row> */}
              </div>
              <nav className="walletSection">
                  <WalletDisplay {...props} />
              </nav>
          </div>
      </header>
  )
}

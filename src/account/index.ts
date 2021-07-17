const { generateWallet } = require('urbit-key-generation')

export interface MasterTicketOptions {
  ticket: string
  ship: number
  passphrase?: string
  revision?: number
  boot?: boolean
}

export default class Account {
  urbitWallet: any
  currentAddress?: string
  currentAddressType?: 'Metamask' | 'Master Ticket' | 'Hardware Wallet' // Metamask includes any browser-based ethereum wallet

  constructor() {
    const ethereum = (window as any).ethereum // default is to use metamask

    if (ethereum) {
      ethereum.request({ method: 'eth_requestAccounts' });
      this.currentAddress = ethereum.selectedAddress
      ethereum.on('accountsChanged', (accounts: string[]) => this.currentAddress = accounts[0])
      this.currentAddressType = 'Metamask'
    }
  }

  connectMasterTicket = async (options: MasterTicketOptions) => { // flesh this out
    const wallet = await generateWallet(options)
    console.log('WALLET', wallet)
    this.urbitWallet = wallet
  }

  connectWallet = async () => { // WalletConnect: https://registry.walletconnect.org/wallets
    
  }
}

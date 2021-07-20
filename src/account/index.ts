import { UrbitWallet } from '../types/UrbitWallet'

const { generateWallet } = require('urbit-key-generation')

const { NODE_ENV } = process.env

export interface MasterTicketOptions {
  ticket: string
  ship: number
  passphrase?: string
  revision?: number
  boot?: boolean
}

export enum WalletType {
  Metamask = 'Metamask',
  MasterTicket = 'Master Ticket',
  WalletConnect = 'WalletConnect',
}

export default class Account {
  urbitWallet?: UrbitWallet
  currentAddress?: string
  currentWalletType?: WalletType // Metamask includes any browser-based ethereum wallet

  constructor() {
    const ethereum = (window as any).ethereum // default is to use metamask

    if (ethereum) {
      ethereum.request({ method: 'eth_requestAccounts' })
      this.currentAddress = ethereum.selectedAddress
      ethereum.on('accountsChanged', (accounts: string[]) => this.currentAddress = accounts[0])
      this.currentWalletType = WalletType.Metamask
    }
  }

  connectMetamask = async () => {
    const ethereum = (window as any).ethereum

    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' });
      this.currentAddress = ethereum.selectedAddress
      ethereum.on('accountsChanged', (accounts: string[]) => this.currentAddress = accounts[0])
      this.currentWalletType = WalletType.Metamask
    }
  }

  connectMasterTicket = async (options: MasterTicketOptions) => { // flesh this out
    const wallet = await generateWallet(options)
    console.log('MASTER TICKET WALLET', wallet)
    this.urbitWallet = wallet
    this.currentAddress = this.urbitWallet?.ownership.keys.address
  }

  connectWalletConnect = async () => { // WalletConnect: https://registry.walletconnect.org/wallets
    console.log('WALLET CONNECT WALLET')
  }

  isValidNetwork = () => {
    if (NODE_ENV === 'development' || NODE_ENV === 'test') {
      return true
    }

    const ethereum = (window as any).ethereum

    if (!ethereum) {
      return false
    }

    return ethereum.chainId === '0x1'
  }
}

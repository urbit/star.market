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

  constructor({ wallet }: { wallet?: UrbitWallet }) {
    const ethereum = (window as any).ethereum // default is to use Metamask

    if (wallet) {
      this.urbitWallet = wallet
      this.currentAddress = wallet.ownership.keys.address
      this.currentWalletType = WalletType.MasterTicket
    } else if (ethereum) {
      // this.urbitWallet = {
      //   meta: {
      //     generator: {
      //       name: 'string',
      //       version: 'string',
      //     },
      //     spec: 'string',
      //     ship: 0,
      //     patp: 'string',
      //     tier: 'planet',
      //     passphrase: 'string'
      //   },
      //   ticket: '',
      //   shards: [],
      //   ownership: {
      //     keys: {
      //       private: 'a13fc2a1d257a4f41e9474690561e9835cbbbec0d6f6db6cd512cfbe8960c0d8',
      //       address: '0x1d06BD7b06A4Ca55cC3F60b2aB33492413cE448e',
      //       public: '',
      //       chain: '',
      //     },
      //     type: 'ownership',
      //     seed: '',
      //     derivationPath: '',
      //   }
      // }
      ethereum.request({ method: 'eth_requestAccounts' })
      this.currentAddress = ethereum.selectedAddress
      ethereum.on('accountsChanged', (accounts: string[]) => this.currentAddress = accounts[0])
      this.currentWalletType = WalletType.Metamask
    }
  }

  connectMasterTicket = async (options: MasterTicketOptions) => { // flesh this out
    const wallet = await generateWallet(options)
    return wallet
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

  getBalance = async () => (window as any).ethereum.request({ method: 'eth_getBalance', params: [this.currentAddress, "latest"] });
}

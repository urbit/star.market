import WalletConnect from "@walletconnect/client"

import { UrbitWallet } from '../types/UrbitWallet'
import { setPreferredWallet } from "../utils/local-storage"

// const { NODE_ENV } = process.env

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
  walletConnection?: WalletConnect
  currentAddress?: string
  currentWalletType?: WalletType // Metamask includes any browser-based ethereum wallet

  constructor({ urbitWallet, walletConnection, useMetamask }: { urbitWallet?: UrbitWallet, walletConnection?: WalletConnect, useMetamask?: boolean }) {
    const ethereum = (window as any).ethereum // default is to use Metamask

    if (urbitWallet) {
      this.urbitWallet = urbitWallet
      this.currentAddress = urbitWallet.ownership.keys.address
      this.currentWalletType = WalletType.MasterTicket
      
    } else if (walletConnection) {
      this.walletConnection = walletConnection
      this.currentAddress = walletConnection.accounts[0]
      this.currentWalletType = WalletType.WalletConnect

    } else if (useMetamask && ethereum) {
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
    } else {
      this.urbitWallet = undefined
      this.walletConnection = undefined
      this.currentAddress = undefined
      this.currentWalletType = undefined
    }

    setPreferredWallet(this.currentWalletType)
  }

  setCurrentAddress = (currentAddress: string) => {
    console.log('SETTING CURRENT ADDRESS', currentAddress)
    this.currentAddress = currentAddress
    return this
  }

  getBalance = async () => (window as any).ethereum.request({ method: 'eth_getBalance', params: [this.currentAddress, "latest"] })

  static isValidNetwork = () => {
    // TODO: REMOVE THIS BEFORE FINAL VERSION
    return true
    //   if (NODE_ENV === 'development' || NODE_ENV === 'test') {
    //     return true
    //   }
    
    //   const ethereum = (window as any).ethereum
    
    //   if (!ethereum) {
    //     return false
    //   }
    
    //   return ethereum.chainId === '0x1'
    }
}

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
      this.currentAddress = ethereum.selectedAddress
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
    this.currentAddress = currentAddress
    return this
  }

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

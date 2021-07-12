import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'

import { DUST_ABI, ECLIPTIC_ABI, TREASURY_ABI } from '../constants/abi'
import { AZIMUTH_ADDRESSES, ECLIPTIC_ADDRESS, TREASURY_ADDRESS } from '../constants/addresses'
import Star from '../types/Star'

const ob = require('urbit-ob')
const ajs = require('azimuth-js')

export class Api {
  web3: Web3
  ecliptic: Contract
  treasury: Contract

  constructor() {
    const ethereum = (window as any).ethereum // default is to use metamask

    if (ethereum) {
      ethereum.request({ method: 'eth_requestAccounts' });
    }

    this.web3 = new Web3(ethereum);
    this.ecliptic = new this.web3.eth.Contract(ECLIPTIC_ABI, ECLIPTIC_ADDRESS)
    this.treasury = new this.web3.eth.Contract(TREASURY_ABI, TREASURY_ADDRESS)
  }

  connectMetamask = async () => {
    const ethereum = (window as any).ethereum

    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' });

      this.web3 = new Web3(ethereum);

      this.ecliptic = new this.web3.eth.Contract(ECLIPTIC_ABI, ECLIPTIC_ADDRESS)
      this.treasury = new this.web3.eth.Contract(TREASURY_ABI, TREASURY_ADDRESS)
    }
  }

  connectMasterTicket = async (ticket: string) => { // flesh this out

  }

  connectWallet = async () => { // WalletConnect: https://registry.walletconnect.org/wallets
    
  }

  checkConnection = () => {
    if (!(window as any).ethereum) {
      throw new Error('No Metamask or other connected account')
    }
  }

  getStars = async () : Promise<Star[]> => {
    this.checkConnection()

    const contracts = await ajs.initContracts(this.web3, AZIMUTH_ADDRESSES)
    const selectedAddress: string = (window as any).ethereum.selectedAddress
    const points = await ajs.azimuth.getOwnedPoints(contracts, selectedAddress)
  
    const stars : Star[] = await Promise.all(points
      .map(Number)
      .filter(ajs.check.isStar)
      .map(async (point: number) => {
        const isUnlinked = !(await ajs.azimuth.hasBeenLinked(contracts, point))
        const spawnCount = await ajs.azimuth.getSpawnCount(contracts, point)
        const isComplete = Number(spawnCount) === 0
  
        console.log('STAR', point, isUnlinked, isComplete)
  
        return new Star({
          point,
          name: ob.patp(point),
          canTrade: isUnlinked && isComplete,
        })
      }))
    return stars
  }

  getTreasuryBalance = async (): Promise<number> => {
    this.checkConnection()

    const assetCount = await this.treasury.methods.getAssetCount().call()
    return assetCount
  }

  getDust = async () : Promise<void> => {
    this.checkConnection()
    const selectedAddress: string = (window as any).ethereum.selectedAddress

    const tokenAddress = await this.treasury.methods.startoken().call()
    const starToken = new this.web3.eth.Contract(DUST_ABI, tokenAddress)

    const dust = await (await starToken.methods.balanceOf(selectedAddress)).call()
    return dust
  }

  depositStar = async (star: Star) =>  {
    this.checkConnection()

    await this.ecliptic.methods.setTransferProxy(star.point, TREASURY_ADDRESS).send({
      from: (window as any).ethereum.selectedAddress
    })

    if (window.confirm(`Are you sure you want to deposit this star (${star.name})?`)) {
      const response = await this.treasury.methods.deposit(star.point).send({
        from: (window as any).ethereum.selectedAddress
      })
      console.log('DEPOSIT', response)
    }
  }

  redeemTokens = async (tokens: number) => {
    this.checkConnection()

    for (let i = 0; i < tokens; i++) {
      const response = await this.treasury.methods.redeem().send({
        from: (window as any).ethereum.selectedAddress
      })
      console.log('REDEEM', response)
    }
  }
}

const api = new Api()

export default api

// const transactionParameters = {
//   nonce: '0x00', // ignored by MetaMask
//   gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//   gas: '0x2710', // customizable by user during MetaMask confirmation.
//   to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
//   from: ethereum.selectedAddress, // must match user's active address.
//   value: '0x00', // Only required to send ether to the recipient from the initiating external account.
//   data:
//     '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
//   chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
// }

// // txHash is a hex string
// // As with any RPC call, it may throw an error
// const txHash = await ethereum.request({
//   method: 'eth_sendTransaction',
//   params: [transactionParameters],
// })
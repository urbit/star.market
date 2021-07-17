import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'

import Account from '../account'
import { DUST_ABI, ECLIPTIC_ABI, TREASURY_ABI } from '../constants/abi'
import { TOKENS_PER_STAR } from '../constants/token'
import Star from '../types/Star'

const ajs = require('azimuth-js')

const {
  REACT_APP_AZIMUTH_ADDRESS,
  REACT_APP_POLLS_ADDRESS,
  REACT_APP_CLAIMS_ADDRESS,
  REACT_APP_ECLIPTIC_ADDRESS,
  REACT_APP_TREASURY_ADDRESS,
} = process.env

const showNotConnectedAlert = () =>
  alert('You must have Metamask or another extension installed and active to connect to the Ethereum network. Please reload the page when ready.')

export default class Api {
  web3: Web3
  account: Account
  ecliptic: Contract
  treasury: Contract

  constructor(account: Account) {
    this.account = account
    
    const ethereum = (window as any).ethereum // default is to use metamask

    if (!ethereum) {
      showNotConnectedAlert()
    }

    this.web3 = new Web3(ethereum); // use infura connection if ethereum isn't available?
    this.ecliptic = new this.web3.eth.Contract(ECLIPTIC_ABI, REACT_APP_ECLIPTIC_ADDRESS)
    this.treasury = new this.web3.eth.Contract(TREASURY_ABI, REACT_APP_TREASURY_ADDRESS)
  }

  connectMetamask = async () => {
    const ethereum = (window as any).ethereum

    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' });

      this.account.currentAddress = ethereum.selectedAddress

      this.web3 = new Web3(ethereum);
      this.ecliptic = new this.web3.eth.Contract(ECLIPTIC_ABI, REACT_APP_ECLIPTIC_ADDRESS)
      this.treasury = new this.web3.eth.Contract(TREASURY_ABI, REACT_APP_TREASURY_ADDRESS)
    }
  }

  checkConnection = () => {
    if (!(window as any).ethereum) {
      showNotConnectedAlert()
      throw new Error('No Ethereum connection available')
    }
  }

  getStars = async () : Promise<Star[]> => {
    this.checkConnection()

    const contracts = await ajs.initContracts(this.web3, {
      azimuth: REACT_APP_AZIMUTH_ADDRESS,
      polls: REACT_APP_POLLS_ADDRESS,
      claims: REACT_APP_CLAIMS_ADDRESS,
      ecliptic: REACT_APP_ECLIPTIC_ADDRESS,
    })
    const points = await ajs.azimuth.getOwnedPoints(contracts, this.account.currentAddress)
  
    const stars : Star[] = await Promise.all(points
      .map(Number)
      .filter(ajs.check.isStar)
      .map(async (point: number) => {
        const isUnlinked = !(await ajs.azimuth.hasBeenLinked(contracts, point))
        const spawnCount = await ajs.azimuth.getSpawnCount(contracts, point)
        const isComplete = Number(spawnCount) === 0
  
        return new Star({
          point,
          canTrade: isUnlinked && isComplete,
          isComplete,
          isUnlinked,
        })
      }))
    return stars
  }

  getTreasuryBalance = async (): Promise<number> => {
    this.checkConnection()

    const assetCount = await this.treasury.methods.getAssetCount().call()
    return assetCount
  }

  getDust = async () : Promise<number> => {
    this.checkConnection()

    const tokenAddress = await this.treasury.methods.startoken().call()
    const starToken = new this.web3.eth.Contract(DUST_ABI, tokenAddress)

    const dust = await (await starToken.methods.balanceOf(this.account.currentAddress)).call()
    return (dust / TOKENS_PER_STAR)
  }

  depositStar = async (star: Star) =>  {
    this.checkConnection()
    
    await this.ecliptic.methods.setTransferProxy(star.point, REACT_APP_TREASURY_ADDRESS).send({
      from: this.account.currentAddress
    })

    if (window.confirm(`Are you sure you want to deposit this star (${star.name})?`)) {
      await this.treasury.methods.deposit(star.point).send({
        from: this.account.currentAddress
      })
    }
  }

  redeemTokens = async (tokens: number) => {
    this.checkConnection()

    for (let i = 0; i < tokens; i++) {
      const response = await this.treasury.methods.redeem().send({
        from: this.account.currentAddress
      })
      console.log('REDEEM', response)
    }
  }
}

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
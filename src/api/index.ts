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

export const SET_TRANSFER_PROXY_GAS_LIMIT = 400000
export const DEPOSIT_GAS_LIMIT = 800000
export const REDEEM_GAS_LIMIT = 600000

const showNotConnectedAlert = () =>
  alert('You must have Metamask or ano8ther extension installed and active to connect to the Ethereum network. Please reload the page when ready.')

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

  depositStar = async (star: Star, gasPrice?: number) : Promise<string | undefined> =>  {
    this.checkConnection()
    const confirmationMessage = `Are you sure you want to deposit this star (${star.name})?`

    const rawProxyTxn = {
      from: this.account.currentAddress!, 
      to: REACT_APP_ECLIPTIC_ADDRESS, 
      data: this.ecliptic.methods.setTransferProxy(star.point, REACT_APP_TREASURY_ADDRESS).encodeABI(),
      gas: SET_TRANSFER_PROXY_GAS_LIMIT, 
      gasPrice,
    }

    const rawDepositTxn = {
      from: this.account.currentAddress!, 
      to: REACT_APP_TREASURY_ADDRESS, 
      data: this.treasury.methods.deposit(star.point).encodeABI(),
      gas: DEPOSIT_GAS_LIMIT, 
      gasPrice,
    }

    if (this.account.urbitWallet) {
      const privateKey = this.account.urbitWallet.ownership.keys.private

      const signedProxyTx = await this.web3.eth.accounts.signTransaction(rawProxyTxn, privateKey)

      if (signedProxyTx?.rawTransaction) {
        await this.web3.eth.sendSignedTransaction(signedProxyTx.rawTransaction)

        if (window.confirm(confirmationMessage)) {
          const signedDepositTxn = await this.web3.eth.accounts.signTransaction(rawDepositTxn, privateKey)
  
          if (signedDepositTxn?.rawTransaction) {
            const { transactionHash } = await this.web3.eth.sendSignedTransaction(signedDepositTxn.rawTransaction)
            return transactionHash
          }
        }
      }

    } else if (this.account.walletConnection) {
      await this.account.walletConnection.sendTransaction(rawProxyTxn)
      const transactionHash = await this.account.walletConnection.sendTransaction(rawDepositTxn)
      return transactionHash

    } else {
      await this.ecliptic.methods.setTransferProxy(star.point, REACT_APP_TREASURY_ADDRESS).send({
        from: this.account.currentAddress
      })
  
      if (window.confirm(confirmationMessage)) {
        const { transactionHash } = await this.treasury.methods.deposit(star.point).send({
          from: this.account.currentAddress
        })
        return transactionHash
      }
    }
    
  }

  redeemTokens = async (tokens: number, gasPrice?: number) : Promise<string[]> => {
    this.checkConnection()

    const hashes = []

    for (let i = 0; i < tokens; i++) {
      const rawRedeemTxn = {
        from: this.account.currentAddress!, 
        to: REACT_APP_TREASURY_ADDRESS, 
        data: this.treasury.methods.redeem().encodeABI(),
        gas: REDEEM_GAS_LIMIT, 
        gasPrice,
      }

      if (this.account.urbitWallet) {
        const privateKey = this.account.urbitWallet.ownership.keys.private
        const signedRedeemTxn = await this.web3.eth.accounts.signTransaction(rawRedeemTxn, privateKey)

        if (signedRedeemTxn?.rawTransaction) {
          const { transactionHash } = await this.web3.eth.sendSignedTransaction(signedRedeemTxn.rawTransaction)
          hashes.push(transactionHash)
        }

      } else if (this.account.walletConnection) {
        const transactionHash = await this.account.walletConnection.sendTransaction(rawRedeemTxn)
        hashes.push(transactionHash)

      } else {
        const { transactionHash } = await this.treasury.methods.redeem().send({
          from: this.account.currentAddress
        })
        hashes.push(transactionHash)
      }
    }

    return hashes
  }
}

import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'

import Account from '../account'
import { DUST_ABI, TREASURY_ABI } from '../constants/abi'
import { TOKENS_PER_STAR } from '../constants/token'
import Star from '../types/Star'

const ajs = require('azimuth-js')

const {
  REACT_APP_AZIMUTH_ADDRESS,
  REACT_APP_TREASURY_ADDRESS,
  REACT_APP_INFURA_URL,
} = process.env

export const SET_TRANSFER_PROXY_GAS_LIMIT = 400000
export const DEPOSIT_GAS_LIMIT = 800000
export const REDEEM_GAS_LIMIT = 600000

export default class Api {
  web3: Web3
  account: Account
  contracts?: any
  eclipticAddress?: string
  ecliptic?: Contract
  treasury: Contract

  constructor(account: Account) {
    this.account = account
    
    const ethereum = (window as any).ethereum // default is to use metamask

    // Use infura connection if ethereum isn't available
    const connection = ethereum || REACT_APP_INFURA_URL;

    this.web3 = new Web3(connection);
    this.treasury = new this.web3.eth.Contract(TREASURY_ABI, REACT_APP_TREASURY_ADDRESS)
  }

  loadContracts = async () => {
    const contracts = await ajs.initContractsPartial(this.web3, REACT_APP_AZIMUTH_ADDRESS)
    this.contracts = contracts
    this.ecliptic = contracts.ecliptic
    const eclipticAddress = await ajs.azimuth.owner(contracts)
    this.eclipticAddress = eclipticAddress
  }

  getBalance = async () => this.account.currentAddress ? this.web3.eth.getBalance(this.account.currentAddress) : '0'

  connectMetamask = async () => {
    const ethereum = (window as any).ethereum

    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' });
      this.account.currentAddress = ethereum.selectedAddress
      this.loadContracts()
    }
  }

  getStars = async () : Promise<Star[]> => {
    if (!this.contracts) {
      return []
    }
    
    const points = await ajs.azimuth.getOwnedPoints(this.contracts, this.account.currentAddress)
  
    const stars : Star[] = await Promise.all(points
      .map(Number)
      .filter(ajs.check.isStar)
      .map(async (point: number) => {
        const isEligible = 0 === Number(await ajs.azimuth.getSpawnCount(this.contracts, point))

        return new Star({
          point,
          isEligible,
        })
      }))
    return stars
  }

  getTreasuryBalance = async (): Promise<number> => {
    const assetCount = await this.treasury.methods.getAssetCount().call()
    return assetCount
  }

  getDust = async () : Promise<number> => {
    const tokenAddress = await this.treasury.methods.startoken().call()
    const starToken = new this.web3.eth.Contract(DUST_ABI, tokenAddress)

    const dust = await (await starToken.methods.balanceOf(this.account.currentAddress)).call()
    return (dust / TOKENS_PER_STAR)
  }

  setTransferProxy = async (star: Star, gwei: number) : Promise<string | undefined> =>  {
    if (!this.contracts || !this.ecliptic || !this.eclipticAddress) {
      throw new Error('You must refresh the page.')
    }

    const gasPrice = this.web3.utils.toWei(gwei.toString(), 'gwei')
    const transferProxy : string = await ajs.azimuth.getTransferProxy(this.contracts, star.point)
    
    if (transferProxy === REACT_APP_TREASURY_ADDRESS) { // Already set
      return
    }

    const rawProxyTxn = {
      from: this.account.currentAddress!, 
      to: this.eclipticAddress,
      data: this.ecliptic.methods.setTransferProxy(star.point, REACT_APP_TREASURY_ADDRESS).encodeABI(),
      gas: SET_TRANSFER_PROXY_GAS_LIMIT,
      gasPrice,
    }

    if (this.account.urbitWallet) {
      const privateKey = this.account.urbitWallet.ownership.keys.private

      const signedProxyTx = await this.web3.eth.accounts.signTransaction(rawProxyTxn, privateKey)

      if (signedProxyTx?.rawTransaction) {
        return (await this.web3.eth.sendSignedTransaction(signedProxyTx.rawTransaction)).transactionHash
      }
    } else if (this.account.walletConnection) {
      return this.account.walletConnection.sendTransaction(rawProxyTxn)
    } else {
      return this.ecliptic.methods.setTransferProxy(star.point, REACT_APP_TREASURY_ADDRESS).send({
        from: this.account.currentAddress,
        gasPrice,
      })
    }
  }

  depositStar = async (star: Star, gwei: number) : Promise<string | undefined> =>  {
    if (!this.ecliptic || !this.eclipticAddress) {
      throw new Error('Ecliptic address not set')
    }

    const gasPrice = this.web3.utils.toWei(gwei.toString(), 'gwei')
    const rawDepositTxn = {
      from: this.account.currentAddress!, 
      to: REACT_APP_TREASURY_ADDRESS, 
      data: this.treasury.methods.deposit(star.point).encodeABI(),
      gas: DEPOSIT_GAS_LIMIT, 
      gasPrice,
    }

    if (this.account.urbitWallet) {
      const privateKey = this.account.urbitWallet.ownership.keys.private
      const signedDepositTxn = await this.web3.eth.accounts.signTransaction(rawDepositTxn, privateKey)

      if (signedDepositTxn?.rawTransaction) {
        const { transactionHash } = await this.web3.eth.sendSignedTransaction(signedDepositTxn.rawTransaction)
        return transactionHash
      }

    } else if (this.account.walletConnection) {
      const transactionHash = await this.account.walletConnection.sendTransaction(rawDepositTxn)
      return transactionHash

    } else {
      const { transactionHash } = await this.treasury.methods.deposit(star.point).send({
        from: this.account.currentAddress,
        gasPrice,
      })
      return transactionHash
    }
  }

  redeemTokens = async (tokens: number, gwei: number) : Promise<string[]> => {
    const gasPrice = this.web3.utils.toWei(gwei.toString(), 'gwei')
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
          from: this.account.currentAddress,
          gasPrice,
        })
        hashes.push(transactionHash)
      }
    }

    return hashes
  }
}

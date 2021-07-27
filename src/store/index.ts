import create from 'zustand'
import Account from '../account'
import Api from '../api'
import Star from '../types/Star'

export interface Store {
  account: Account
  api: Api
  dust: number
  stars: Star[]
  treasuryBalance: number
  gasPrice: number
  loading: boolean
  successTxHashes: string[]
  errorMessage?: string
  setAccount: (account: Account) => void
  setDust: (dust: number) => void
  setStars: (stars: Star[]) => void
  setTreasuryBalance: (balance: number) => void
  setGasPrice: (gasPrice: number) => void
  setLoading: (loading: boolean) => void
  setSuccessTxHashes: (successTxHash: boolean) => void
  setErrorMessage: (errorMessage: boolean) => void
}

export const useStore = create(set => ({
  account: Account,
  api: Api,
  gasPrice: 20,
  dust: 0,
  stars: [],
  treasuryBalance: 0,
  loading: false,
  successTxHashes: [],
  setAccount: (account: Account) => set(state => ({ account, api: new Api(account) })),
  setDust: (dust: number) => set(state => ({ dust })),
  setStars: (stars: Star[]) => set(state => ({ stars })),
  setTreasuryBalance: (treasuryBalance: number) => set(state => ({ treasuryBalance })),
  setGasPrice: (gasPrice: number) => set(state => ({ gasPrice })),
  setLoading: (loading: boolean) => set(state => ({ loading })),
  setSuccessTxHashes: (successTxHashes: string[]) => set(state => ({ successTxHashes })),
  setErrorMessage: (errorMessage: string) => set(state => ({ errorMessage })),
}))

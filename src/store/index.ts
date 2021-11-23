import create from 'zustand'
import Account from '../account'
import Api from '../api'
import { DEFAULT_GAS_PRICE_GWEI } from '../constants/gas'
import Star from '../types/Star'
import { SuggestedGasPrices } from '../types/SuggestedGasPrices'
import { defaultGasValues } from '../utils/gas-prices'

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
  suggestedGasPrices: SuggestedGasPrices
  loadingText: null | string
  ethBalance: number
  setAccount: (account: Account) => void
  setDust: (dust: number) => void
  setStars: (stars: Star[]) => void
  setTreasuryBalance: (balance: number) => void
  setGasPrice: (gasPrice: number) => void
  setLoading: (loading: boolean) => void
  setSuccessTxHashes: (successTxHashes: string[]) => void
  setErrorMessage: (errorMessage: string) => void
  setSuggestedGasPrices: (prices: SuggestedGasPrices) => void
  setLoadingText: (loadingText: null | string) => void
  setEthBalance: (ethBalance: number) => void
}

export const useStore = create<Store>(set => ({
  account: new Account({}),
  api: new Api(new Account({})),
  gasPrice: 20,
  dust: 0,
  stars: [],
  treasuryBalance: 0,
  loading: false,
  successTxHashes: [],
  suggestedGasPrices: defaultGasValues(DEFAULT_GAS_PRICE_GWEI),
  loadingText: null,
  ethBalance: 0,
  setAccount: (account: Account) => set(() => ({ account, api: new Api(account) })),
  setDust: (dust: number) => set(() => ({ dust })),
  setStars: (stars: Star[]) => set(() => ({ stars: stars.sort((a, b) => Number(b.isEligible) - Number(a.isEligible) ) })),
  setTreasuryBalance: (treasuryBalance: number) => set(() => ({ treasuryBalance })),
  setGasPrice: (gasPrice: number) => set(() => ({ gasPrice })),
  setLoading: (loading: boolean) => set(({ loadingText }) => ({ loading, loadingText: !loading ? null : loadingText })),
  setSuccessTxHashes: (successTxHashes: string[]) => set(() => ({ successTxHashes })),
  setErrorMessage: (errorMessage: string) => set(() => ({ errorMessage })),
  setSuggestedGasPrices: (suggestedGasPrices: SuggestedGasPrices) => set(() => ({ suggestedGasPrices })),
  setLoadingText: (loadingText: null | string) => set(() => ({ loadingText, loading: true })),
  setEthBalance: (ethBalance: number) => set(() => ({ ethBalance })),
}))

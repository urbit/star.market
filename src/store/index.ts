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
  setAccount: (account: Account) => void
  setDust: (dust: number) => void
  setStars: (stars: Star[]) => void
  setTreasuryBalance: (balance: number) => void
}

export const useStore = create(set => ({
  account: Account,
  api: Api,
  dust: 0,
  stars: [],
  treasuryBalance: 0,
  setAccount: (account: Account) => set(state => ({ account, api: new Api(account) })),
  setDust: (dust: number) => set(state => ({ dust })),
  setStars: (stars: Star[]) => set(state => ({ stars })),
  setTreasuryBalance: (treasuryBalance: number) => set(state => ({ treasuryBalance }))
}))

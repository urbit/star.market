import create from 'zustand'
import Star from '../types/Star'

export interface Store {
  stars: Star[],
  setStars: (stars: Star[]) => void
}

export const useStore = create(set => ({
  dust: 0,
  stars: [],
  setDust: (dust: number) => set(state => ({ dust })),
  setStars: (stars: Star[]) => set(state => ({ stars })),
}))

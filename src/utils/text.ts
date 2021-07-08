import { Exchange } from "../components/SwapForm";

export const starDustLabel = (exchange: Exchange) => `${exchange === Exchange.starsForDust ? 'DUST' : 'star'}`

export const pluralize = (text: string, amount: number, canPluralize?: boolean) => amount === 1 || !canPluralize ? text : `${text}s`

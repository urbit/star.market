import { Exchange } from "../components/Forms/SwapForm";

export const starDustLabel = (exchange: Exchange) => `${exchange === Exchange.starsForDust ? 'WSTR' : 'star'}`

export const pluralize = (text: string, amount: number, canPluralize?: boolean) => amount === 1 || !canPluralize ? text : `${text}s`

export const getExchangeRate = (starsForDust: boolean) => starsForDust ? '1 WSTR = 1.00 Star' : '1 Star = 1.00 WSTR'

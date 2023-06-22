import { Exchange } from "../components/Forms/SwapForm";

export const starDustLabel = (exchange: Exchange) => `${exchange === Exchange.starsForDust ? 'WSTR' : 'star'}`

export const pluralize = (text: string, amount: number, canPluralize?: boolean) => amount === 1 || !canPluralize ? text : `${text}s`

export const getExchangeRate = (starsForDust: boolean) => starsForDust ? '1 WSTR = 1.00 Star' : '1 Star = 1.00 WSTR'

export const formatComma = (amount: number) => String(amount).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')

export const truncateAddress = (address: string) => address.slice(0, 6) + '...' + address.slice(-4);

  export const formatNumber = (num: number) => {
    return Number(num.toFixed(0)).toLocaleString("en-US");
  };

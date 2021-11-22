import Api from "../api"
import { GWEI, TEN_THOUSAND } from "./constants"

export const weiToEth = (weiBalance: string) => Math.round(parseInt(weiBalance, 16) * GWEI * GWEI * TEN_THOUSAND) / TEN_THOUSAND

export const getEthBalance = async (api: Api, setEthBalance: (ethBalance: number) => void) => {
  try {
    if (api) {
      const weiBalance = await api.getBalance()

      setEthBalance(weiToEth(weiBalance))
    }
  } catch (e) {
    console.warn(e)
  }
}

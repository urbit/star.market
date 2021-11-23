import Api from "../api"
import { TEN_THOUSAND } from "./constants"

export const formatEth = (ethBalance: number) => Math.round(ethBalance * TEN_THOUSAND) / TEN_THOUSAND

export const getEthBalance = async (api: Api, setEthBalance: (ethBalance: number) => void) => {
  try {
    if (api) {
      const weiBalance = await api.getBalance()
      const ethBalance = api.web3.utils.fromWei(weiBalance, 'ether');

      setEthBalance(formatEth(Number(ethBalance)))
    }
  } catch (e) {
    console.warn(e)
  }
}

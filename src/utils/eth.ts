import Account from "../account"
import { GWEI, TEN_THOUSAND } from "./constants"

export const weiToEth = (weiBalance: string) => Math.round(parseInt(weiBalance, 16) * GWEI * GWEI * TEN_THOUSAND) / TEN_THOUSAND

export const getEthBalance = async (account: Account, setEthBalance: (ethBalance: number) => void) => {
  try {
    if (account && account.currentWalletType) {
      const weiBalance = await account.getBalance()

      setEthBalance(weiToEth(weiBalance))
    }
  } catch (e) {
    console.warn(e)
  }
}

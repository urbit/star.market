import { WalletType } from "../account";

const PREFERRED_WALLET_TYPE = 'preferred_wallet_type'

export const setPreferredWallet = (type?: WalletType) => window.localStorage.setItem(PREFERRED_WALLET_TYPE, String(type))

export const getPreferredWallet = async () : Promise<WalletType | null> => {
  const type = await window.localStorage.getItem(PREFERRED_WALLET_TYPE)
  
  if (type === 'undefined') {
    return null
  } else if (typeof type === 'string') {
    return type as WalletType
  }

  return type
}

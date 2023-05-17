export interface GasPrice {
  price: number
  wait: string
  maxFeePerGas: string
  maxPriorityFeePerGas: number
  suggestedBaseFeePerGas: number
}

export interface SuggestedGasPrices {
  fast: GasPrice
  average: GasPrice
  low: GasPrice
}

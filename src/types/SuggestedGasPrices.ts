export interface GasPrice {
  price: number;
  wait: string;
}

export interface SuggestedGasPrices {
  fast: GasPrice
  average: GasPrice
  low: GasPrice
}

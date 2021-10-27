import { MAX_GAS_PRICE_GWEI } from "../constants/gas";

export const defaultGasValues = (value: number) => ({
  fast: {
    price: value,
    wait: '120',
  },
  average: {
    price: value,
    wait: '120',
  },
  low: {
    price: value,
    wait: '120',
  },
});

export const formatWait = (wait: number) => String(Math.round(wait * 100) / 100);

export const minGas = (gas: number) => Math.min(Math.ceil(gas / 10), MAX_GAS_PRICE_GWEI);

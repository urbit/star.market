import { MAX_GAS_PRICE_GWEI } from "../constants/gas";

export const defaultGasValues = (value: number) => ({
  fast: {
    price: value,
    wait: '120',
    maxFeePerGas: '20',
    maxPriorityFeePerGas: 20,
    suggestedBaseFeePerGas: 20,
  },
  average: {
    price: value,
    wait: '120',
    maxFeePerGas: '20',
    maxPriorityFeePerGas: 20,
    suggestedBaseFeePerGas: 20,
  },
  low: {
    price: value,
    wait: '120',
    maxFeePerGas: '20',
    maxPriorityFeePerGas: 20,
    suggestedBaseFeePerGas: 20,
  },
});

export const formatWait = (wait: number) => String(Math.round(wait * 100) / 100);

export const minGas = (gas: string) => Math.min(Math.ceil(Number(gas)), MAX_GAS_PRICE_GWEI);

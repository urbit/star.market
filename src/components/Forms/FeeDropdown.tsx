import React, { useCallback, useEffect, useState } from 'react';
import { Box, Row, StatelessTextInput } from '@tlon/indigo-react';

import { useStore } from '../../store';
import Dropdown from './Dropdown';
import './FeeDropdown.scss';
import { GasPrice } from '../../types/SuggestedGasPrices';

const PRICE_LABELS = ['Fast', 'Average', 'Slow'];

export const formatWait = (wait: number) => Math.round(wait * 100) / 100;
export const formatDisplay = ({ price, wait }: GasPrice) =>
  `${price} gwei (${wait} min)`;

export default function FeeDropdown() {
  const { suggestedGasPrices, setGasPrice } = useStore();

  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState<string>('0');
  const [selected, setSelected] = useState<GasPrice>(
    suggestedGasPrices.average
  );

  const handleCustom = (e: any) => {
    const cleanedValue = e.target.value.replace(/[^0-9]/g, '');
    const cleanedNum = Number(cleanedValue);
    setCustom(cleanedValue);
    setGasPrice(cleanedNum);

    let customWait = 'Unknown';

    const { fast, average, low } = suggestedGasPrices;

    if (cleanedNum < low.price) {
      customWait = `> ${low.wait}`;
    } else if (cleanedNum < average.price) {
      customWait = `~${low.wait}`;
    } else if (cleanedNum < fast.price) {
      customWait = `~${average.wait}`;
    } else {
      customWait = `< ${fast.wait}`;
    }

    setSelected({ price: cleanedValue, wait: customWait });
  };

  useEffect(() => {
    setSelected(suggestedGasPrices.average);
  }, [suggestedGasPrices]);

  const selectPrice = useCallback(
    (value: GasPrice) => () => {
      setSelected(value);
      setGasPrice(value.price);
      setOpen(false);
    },
    [setGasPrice, setSelected, setOpen]
  );

  return (
    <Dropdown
      className="fee-dropdown"
      open={open}
      value={formatDisplay(selected)}
      toggleOpen={() => setOpen(!open)}>
      <Box className="prices">
        {Object.values(suggestedGasPrices).map(
          (value: GasPrice, ind: number) => (
            <Row
              className="price"
              onClick={selectPrice(value)}
              key={value.wait}>
              {PRICE_LABELS[ind]}: {formatDisplay(value)}
            </Row>
          )
        )}
        <Row className="price">
          <Box className="label">Custom:</Box>
          <StatelessTextInput
            value={custom}
            className="custom-input"
            placeholder="0"
            onChange={handleCustom}
          />
          <Box className="unit">gwei</Box>
        </Row>
      </Box>
    </Dropdown>
  );
};

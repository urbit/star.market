import React, { useCallback, useEffect, useState } from 'react';
import { Row, StatelessTextInput, Icon } from '@tlon/indigo-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useStore } from '../../store';
import './FeeDropdown.scss';
import { GasPrice } from '../../types/SuggestedGasPrices';

const PRICE_LABELS = ['Fast', 'Average', 'Slow'];

// ST: wait time no longer displayed, keeping in case we feel like adding it back
// export const formatWait = (wait: number) => Math.round(wait * 100) / 100;
export const formatDisplay = ({ price, wait }: GasPrice) =>
  `${price} gwei`;

export default function FeeDropdown() {
  const { suggestedGasPrices, setGasPrice } = useStore();

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

    setSelected({ price: cleanedValue, wait: customWait, maxFeePerGas: 'unknown', maxPriorityFeePerGas: 0, suggestedBaseFeePerGas: 0 });
  };

  useEffect(() => {
    setSelected(suggestedGasPrices.average);
  }, [suggestedGasPrices]);

  const selectPrice = useCallback(
    (value: GasPrice) => () => {
      setSelected(value);
      setGasPrice(value.price);
    },
    [setGasPrice, setSelected]
  );


  return (
    <div className="flex gas-container">
      <div className="ml-0.5em mr-0.5em text-lightGray">{formatDisplay(selected)}</div>
      <DropdownMenu.Root modal={true}>

      <DropdownMenu.Trigger className="dropdown-button">
        <Icon icon="Ellipsis" color="black"/>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="dropdown-menu" sideOffset={5}>
        {Object.keys(suggestedGasPrices).map(
          (key: string, ind: number) => (
            <DropdownMenu.Item
              className="dropdown-item"
              onSelect={selectPrice(suggestedGasPrices[key as 'fast' | 'average' | 'low'])}
              key={key}>
                <p className="label">{PRICE_LABELS[ind]}:</p>
                <p>{formatDisplay(suggestedGasPrices[key as 'fast' | 'average' | 'low'])}</p>
            </DropdownMenu.Item >
          )
        )}
        <Row className="dropdown-input-container">
          <p className="label">Custom:</p>
          <StatelessTextInput
            value={custom}
            className="custom-input"
            placeholder="0"
            onChange={handleCustom}
          />
          <p className="unit">gwei</p>
        </Row>
      </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
};

import { useEffect, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components'

import light from './components/themes/light'
import dark from './components/themes/dark'

import { useStore } from './store';
import Api from './api';
import Container from './components/Container'

import './App.scss';
import Account from './account';

const ETHERSCAN_API_KEY = 'BXEKQG3V5SSS57PUCHCIJJ3X8CMRYS4B6D'

const App = () => {
  const { setStars, setDust, setTreasuryBalance, setAccount, setGasPrice } = useStore((store: any) => store)

  const initialize = useCallback(async () => {
    const account = new Account()
    const api = new Api(account)
    setAccount(account)

    const stars = await api.getStars().catch(console.error)
    setStars(stars || [])

    const dust = await api.getDust().catch(console.error)
    setDust(dust || 0)

    const treasuryBalance = await api.getTreasuryBalance().catch(console.error)
    setTreasuryBalance(treasuryBalance || 0)

    try {
      const { result: { SafeGasPrice } } = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`)
        .then(result => result.json())
      setGasPrice(Number(SafeGasPrice))
    } catch (e) {
      console.warn(e)
    }
  }, [setAccount, setStars, setDust, setTreasuryBalance, setGasPrice])

  useEffect(() => {
    initialize()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <ThemeProvider theme={false ? dark : light}>
        <Container />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

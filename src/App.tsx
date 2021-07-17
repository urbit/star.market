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

const App = () => {
  const { setStars, setDust, setTreasuryBalance, setAccount } = useStore((store: any) => store)

  const initialize = useCallback(async () => {
    const account = new Account()
    const api = new Api(account)
    setAccount(account)

    const stars = await api.getStars().catch(console.error)
    setStars(stars)

    const dust = await api.getDust().catch(console.error)
    setDust(dust)

    const treasuryBalance = await api.getTreasuryBalance().catch(console.error)
    setTreasuryBalance(treasuryBalance)
  }, [setAccount, setStars, setDust, setTreasuryBalance])

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

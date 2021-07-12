import { useEffect, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components'

import light from './components/themes/light'
import dark from './components/themes/dark'

import { useStore } from './store';
import api from './api';
import Container from './components/Container'

import { Box } from '@tlon/indigo-react'
import './App.css';

const App = () => {
  const { setStars, setDust, setTreasuryBalance } = useStore((store: any) => store)

  const initialize = useCallback(async () => {
    const stars = await api.getStars().catch(console.error)
    setStars(stars)

    const dust = await api.getDust().catch(console.error)
    setDust(dust)

    const treasuryBalance = await api.getTreasuryBalance().catch(console.error)
    setTreasuryBalance(treasuryBalance)
  }, [setStars, setDust, setTreasuryBalance])

  useEffect(() => {
    initialize()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <ThemeProvider theme={false ? dark : light}>
        <Box display='flex' flexDirection='column' position='absolute' backgroundColor='white' height='100%' width='100%' px={[0,4]} pb={[0,4]}>
          <Container />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

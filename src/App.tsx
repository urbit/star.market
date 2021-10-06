import { useCallback } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"

import { ThemeProvider } from 'styled-components'

import light from './components/themes/light'
import dark from './components/themes/dark'

import { useStore } from './store';
import Api from './api';
import Container from './components/Container'
import Home from './components/Home'
import About from './components/About'
import Disclaimer from './components/Disclaimer'
import NoMatch from './components/NoMatch'
import './App.scss';

import Account, { WalletType } from './account';
import { useEffect } from 'react';
import { getPreferredWallet } from './utils/local-storage';

const ETHERSCAN_API_KEY = 'BXEKQG3V5SSS57PUCHCIJJ3X8CMRYS4B6D'

interface WalletConnectParams {
  accounts: string[]
  chainId: string
}

const App = () => {
  const { account, setAccount, setStars, setDust, setTreasuryBalance, setGasPrice, setLoading } = useStore()

  // TODO: REMOVE THIS BEFORE FINAL VERSION
  console.log(
    'Connect to Hardhat network running on http://65.108.49.124:8545',
    'Use PK: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'
  )

  const refresh = useCallback(async (account: Account) => {
    if (account.currentAddress) {
      setLoading(true)
      const api = new Api(account)
  
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
  
      setLoading(false)
    }
  }, [setStars, setDust, setTreasuryBalance, setGasPrice, setLoading])

  const updateCurrentAddress = useCallback((error, payload) => {
    if (error) {
      throw error // need to handle
    }

    const data: WalletConnectParams = payload.params[0]

    if (account) {
      setAccount(account.setCurrentAddress(data.accounts[0]))
    }
  }, [account, setAccount])

  const connectWalletConnector = useCallback(() => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    })
  
    if (!connector.connected) {
      connector.createSession()
    }

    connector.on("connect", updateCurrentAddress)
    connector.on("session_update", updateCurrentAddress)
  
    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error
      }

      setAccount(new Account({}))
  
      // Delete connector
    })

    // create new Account
    const newAccount = new Account({ walletConnection: connector })
    setAccount(newAccount)
    refresh(newAccount)
  }, [setAccount, refresh, updateCurrentAddress])

  const setMetamask = useCallback(() => {
    const newAccount = new Account({ useMetamask: true })
    setAccount(newAccount)
    refresh(newAccount)
  }, [setAccount, refresh])

  const connectMetamask = useCallback(() => {
    const ethereum = (window as any).ethereum
    setMetamask()
    ethereum.on('accountsChanged', () => setMetamask())
    ethereum.request({ method: 'eth_requestAccounts' })
  }, [setMetamask])

  useEffect(() => {
    const loadPreferredWallet = async () => {
      const walletType = await getPreferredWallet()

      if (walletType === WalletType.Metamask) {
        connectMetamask()
      } else if (walletType === WalletType.WalletConnect) {
        connectWalletConnector()
      }
    }

    loadPreferredWallet()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <ThemeProvider theme={false ? dark : light}>
      <Switch>
          <Route path="/app">
            {/* <Container/> refers to the swap app */}
            <Container {...{ refresh, connectMetamask, connectWalletConnector }} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/disclaimer">
            <Disclaimer />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

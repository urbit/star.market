import { useCallback } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"

import { ThemeProvider } from 'styled-components'

import light from './components/themes/light'
import dark from './components/themes/dark'

import { useStore } from './store';
import Api from './api';

import Home from './components/Home'
import About from './components/About'
import Disclaimer from './components/Disclaimer'
import Tos from './components/Tos'
import NoMatch from './components/NoMatch'
import './App.scss';

import Account, { WalletType } from './account';
import { useEffect } from 'react';
import { getPreferredWallet } from './utils/local-storage';
import { defaultGasValues, formatWait, minGas } from './utils/gas-prices';
import { DEFAULT_GAS_PRICE_GWEI } from './constants/gas';
import { getEthBalance } from './utils/eth';
import Container from './components/Container';
// import { toPairsIn } from 'lodash';
// import { ToggleSwitch } from '@tlon/indigo-react';

// const ETHERSCAN_API_KEY = 'BXEKQG3V5SSS57PUCHCIJJ3X8CMRYS4B6D'

interface WalletConnectParams {
  accounts: string[]
  chainId: string
}

const App = () => {
  const { setAccount, setStars, setDust, setTreasuryBalance, setGasPrice, setLoading, setSuggestedGasPrices, setEthBalance } = useStore()

  const loadGasPrices = useCallback(async () => {
    try {
      // const { result } = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`)
      //   .then(result => result.json())
      // const { FastGasPrice, ProposeGasPrice, SafeGasPrice } = result
      // setGasPrice(Number(SafeGasPrice))
      // const [fastTime, proposeTime, safeTime] = await Promise.all([FastGasPrice, ProposeGasPrice, SafeGasPrice].map((price) =>
      //   fetch(`https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=${2000}&apikey=${ETHERSCAN_API_KEY}`)
      //     .then(result => result.json())
      // ))

      const json = await fetch('https://ethgasstation.info/json/ethgasAPI.json',
        {
          method: 'GET',
          cache: 'no-cache',
        }
      ).then(response => response.json())

      setGasPrice(minGas(json.average))

      setSuggestedGasPrices({
        fast: {
          price: minGas(json.fast),
          wait: formatWait(json.fastWait),
        },
        average: {
          price: minGas(json.average),
          wait: formatWait(json.avgWait),
        },
        low: {
          price: minGas(json.safeLow),
          wait: formatWait(json.safeLowWait),
        },
      })
    } catch (e) {
      setSuggestedGasPrices(defaultGasValues(DEFAULT_GAS_PRICE_GWEI));
    }
  }, [setGasPrice, setSuggestedGasPrices])

  const refresh = useCallback(async (account: Account) => {
    if (account.currentAddress) {
      setLoading(true)
      const api = new Api(account)

      await api.loadContracts()
  
      const stars = await api.getStars().catch(console.error)
      setStars(stars || [])
  
      const dust = await api.getDust().catch(console.error)
      setDust(dust || 0)
  
      const treasuryBalance = await api.getTreasuryBalance().catch(console.error)
      setTreasuryBalance(treasuryBalance || 0)
  
      loadGasPrices()

      setTimeout(() => getEthBalance(account, setEthBalance), 3000)

      setLoading(false)
    }
  }, [setStars, setDust, setTreasuryBalance, setLoading, loadGasPrices, setEthBalance])

  const updateCurrentAddress = useCallback((connector) => (error: any, payload: any) => {
    if (error) {
      throw error // need to handle
    }

    
    const data: WalletConnectParams = payload.params[0]

    const newAccount = new Account({ walletConnection: connector })
    newAccount.setCurrentAddress(data.accounts[0])
    
    setAccount(newAccount)
    refresh(newAccount)
  }, [setAccount, refresh])

  const connectWalletConnector = useCallback(() => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    })
  
    if (!connector.connected) {
      connector.createSession()
    }

    connector.on("connect", updateCurrentAddress(connector))
    connector.on("session_update", updateCurrentAddress(connector))
  
    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error
      }

      setAccount(new Account({}))
    })
  }, [updateCurrentAddress, setAccount])

  const setMetamask = useCallback(() => {
    const newAccount = new Account({ useMetamask: true })
    setAccount(newAccount)
    refresh(newAccount)
  }, [setAccount, refresh])

  const connectMetamask = useCallback(() => {
    const ethereum = (window as any).ethereum
    if (ethereum.selectedAddress) {
      setMetamask()
    }
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
    loadGasPrices()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <ThemeProvider theme={false ? dark : light}>
      <Switch>
          {/* <Container/> refers to the swap app */}
          <Route path="/app">
            
            <Container {...{ refresh, connectMetamask, connectWalletConnector }} />
            
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/disclaimer">
            <Disclaimer />
          </Route>
          <Route path="/tos">
            <Tos />
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

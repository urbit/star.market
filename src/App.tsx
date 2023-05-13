import { useCallback } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"
import Web3 from 'web3';

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
import { minGas } from './utils/gas-prices';
import { getEthBalance } from './utils/eth';
import Container from './components/Container';

// import { toPairsIn } from 'lodash';
// import { ToggleSwitch } from '@tlon/indigo-react';

const ETHERSCAN_API_KEY = 'BXEKQG3V5SSS57PUCHCIJJ3X8CMRYS4B6D'

const formatWait = (wait: number) => String(Math.round(wait * 100 / 60) / 100);

const feeToInt = (f: number) => f < 1 ? 1 : Math.round(f);
const feeToWei = (fee: number) => Web3.utils.toHex(Web3.utils.toWei(String(fee), 'gwei' ))

const calculateMaxFee = (baseFee: number, maxPriorityFee: number) => feeToWei(Math.round((2 * baseFee) + maxPriorityFee))

interface WalletConnectParams {
  accounts: string[]
  chainId: string
}

const App = () => {
  const { api, setAccount, setStars, setDust, setTreasuryBalance, setGasPrice, setLoading, setSuggestedGasPrices, setEthBalance } = useStore()

  const loadTreasuryBalance = useCallback(async () => {
    const treasuryBalance = await api.getTreasuryBalance().catch(console.error)
    setTreasuryBalance(treasuryBalance || 0)
  }, [api, setTreasuryBalance])

  const loadGasPrices = useCallback(async () => {

    try {
      const [feeResponse, waitResponse] = await Promise.all([
        fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`,
          {
            method: 'GET',
            cache: 'no-cache',
          }
        ),
        fetch(
          'https://ethereum-api.xyz/gas-prices',
          {
            method: 'GET',
            cache: 'no-cache',
          }
        )
      ]);
  
      const [feeJson, waitJson] = await Promise.all([
        feeResponse.json(),
        waitResponse.json()
      ])

      const suggestedBaseFeePerGas = Number(feeJson.result.suggestBaseFee);

      setGasPrice(minGas(feeJson.result.SafeGasPrice))

      // Calculations derived from:
      // https://www.blocknative.com/blog/eip-1559-fees
      setSuggestedGasPrices({
        fast: {
          price: minGas(feeJson.result.FastGasPrice),
          wait: formatWait(waitJson.result.fast.time),
          maxFeePerGas: calculateMaxFee(suggestedBaseFeePerGas, feeJson.result.FastGasPrice - suggestedBaseFeePerGas),
          maxPriorityFeePerGas: feeToInt((feeJson.result.FastGasPrice - suggestedBaseFeePerGas)),
          suggestedBaseFeePerGas
        },
        average: {
          price: minGas(feeJson.result.ProposeGasPrice),
          wait: formatWait(waitJson.result.average.time),
          maxFeePerGas: calculateMaxFee(suggestedBaseFeePerGas, feeJson.result.ProposeGasPrice - suggestedBaseFeePerGas),
          maxPriorityFeePerGas: feeToInt((feeJson.result.ProposeGasPrice - suggestedBaseFeePerGas)),
          suggestedBaseFeePerGas
        },
        low: {
          price: minGas(feeJson.result.SafeGasPrice),
          wait: formatWait(waitJson.result.slow.time),
          maxFeePerGas: calculateMaxFee(suggestedBaseFeePerGas, feeJson.result.SafeGasPrice - suggestedBaseFeePerGas),
          maxPriorityFeePerGas: feeToInt((feeJson.result.SafeGasPrice - suggestedBaseFeePerGas)),
          suggestedBaseFeePerGas
        },
      })
    } catch (e) {}
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
  
      loadTreasuryBalance()
      loadGasPrices()

      setTimeout(() => getEthBalance(api, setEthBalance), 3000)

      setLoading(false)
    }
  }, [setStars, setDust, loadTreasuryBalance, setLoading, loadGasPrices, setEthBalance])

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
    loadTreasuryBalance()
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

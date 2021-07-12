import { useState, ChangeEvent } from "react"

import { Box, Button, Icon } from "@tlon/indigo-react"
import TextInput from "./TextInput"
import StarList from "./StarList"
import ReceiveDisplay from './ReceiveDisplay'
import Star from "../types/Star"
import { addOrRemove } from "../utils/array"
import api from '../api'

export enum Exchange {
  starsForDust,
  dustForStars,
}

const SwapForm = () => {
  const [dust, setDust] = useState('')
  const [selectedStars, setSelectedStars] = useState([] as Star[])
  const [exchange, setExchange] = useState(Exchange.starsForDust)

  const changeDust = (event: ChangeEvent<HTMLInputElement>) => setDust(event.target.value.replace(/\D/g,''))
  const selectStar = (star: Star) => setSelectedStars(addOrRemove(selectedStars, star))
  const toggleExchange = () => 
    setExchange(
      exchange === Exchange.starsForDust ?
      Exchange.dustForStars : 
      Exchange.starsForDust
    )

  const starsForDust = exchange === Exchange.starsForDust

  const dustInput = <TextInput
    label="Dust"
    placeholder="Dust to trade"
    value={dust}
    onChange={changeDust}
    type="numeric"
  />

  const starSelector = <StarList selected={selectedStars} onSelect={selectStar} />

  const trade = async () => {
    if (exchange === Exchange.starsForDust) {
      if (selectedStars.length) {
        try {
          await Promise.all(selectedStars.map((star) => api.depositStar(star)))
        } catch (e) {
          console.warn('ERROR DEPOSITING STARS', e)
        }
      }
    } else {
      try {
        if (dust && Number(dust))
        await api.redeemTokens(Number(dust))
      } catch (e) {
        console.warn('ERROR REDEEMING DUST', e)
      }
    }
  }

  const tradeText = exchange === Exchange.starsForDust ? 'Deposit Stars' : 'Redeem Tokens'

  return <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-around"
    border="2px solid black" height="300px" width="200px" padding="40px">

    {starsForDust ? starSelector : dustInput}
    <Box padding="20px" onClick={toggleExchange}>
      <Icon icon={"Swap"} />
    </Box>
    <ReceiveDisplay amount={starsForDust ? selectedStars.length : Number(dust)} exchange={exchange} />

    {(selectedStars.length || dust) && <Button onClick={trade}>
      {tradeText}
    </Button>}
  </Box>
}

export default SwapForm

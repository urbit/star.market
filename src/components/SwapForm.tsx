import { useState, ChangeEvent } from "react"

import { Box, Icon } from "@tlon/indigo-react"
import TextInput from "./TextInput"
import StarList from "./StarList"
import ReceiveDisplay from './ReceiveDisplay'
import Star from "../types/Star"
import { addOrRemove } from "../utils/array"

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

  return <Box margin="100px" display="flex" flexDirection="column" alignItems="center" justifyContent="space-around"
    border="2px solid black" height="400px" padding="40px">

    {starsForDust ? starSelector : dustInput}
    <Box padding="20px" onClick={toggleExchange}>
      <Icon icon={"Swap"} />
    </Box>
    <ReceiveDisplay amount={starsForDust ? selectedStars.length : Number(dust)} exchange={exchange} />

  </Box>
}

export default SwapForm

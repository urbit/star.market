import { Box } from '@tlon/indigo-react'
import { useStore } from '../store'
import StarList from './StarList'
import SwapForm from './SwapForm'

const Container = () => {
  const dust: number = useStore((store: any) => store.dust) || 0
  const treasuryBalance: number = useStore((store: any) => store.treasuryBalance) || 0

  return <Box display="flex" flexDirection="column" alignItems="center">
    <h1>Starketplace</h1>
    <h2>Stars in Treasury: {treasuryBalance}</h2>
    <h2>Your Stars:</h2>
    <StarList />
    <h2>Your DUST: {dust}</h2>
    <SwapForm />
  </Box>
}

export default Container

import { Box, Text, Paragraph, Image, Anchor, Ul, Li } from '@tlon/indigo-react'
import stalagmites from '../Icons/stalagmites.png';
import go from '../Icons/go.png';
import { Link } from 'react-router-dom';

export const SwapWSTR = () => {
  return (
    <Box
      alignSelf="start"
      flex="1 1 0%"
      width="100%"
      maxWidth="576px"
      padding={4}
      borderRadius="1.5rem"
      background="#A9ECF5"
    >
      <Text display="block" bold marginBottom="50px" opacity={.6}>Swapping WSTR for Stars</Text>
      <Paragraph fontWeight="bold" fontSize="20px" marginBottom="50px">
        You’re currently swapping WSTR for Stars (Urbit IDs), a nonfungible token.
      </Paragraph>
      <Ul listStyle="none">
        <Li marginBottom={3}>
          <Anchor as={Link} display="flex" alignItems="center" to="/about" underline={false}>
            <Image src={stalagmites} size={4} marginRight={3}/>
            <Text bold>What's a WSTR?</Text>
          </Anchor>
        </Li>
        <Li>
          <Anchor display="flex" alignItems="center" href="https://bridge.urbit.org/" underline={false} target="_blank" rel="noreferrer">
            <Image src={go} size={4} marginRight={3}/>
            <Text bold>How to view WSTR in your wallet</Text>
          </Anchor>
        </Li>
      </Ul>
    </Box>
  )
}
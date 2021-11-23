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
      <Text display="block" bold marginBottom="25px" opacity={.6}>Swapping WSTR for Stars</Text>
      <Paragraph fontWeight="bold" fontSize="20px" marginBottom="25px">
        You’re currently swapping WSTR (ERC-20) for stars (NFT), Urbit IDs.
      </Paragraph>
      <Paragraph fontWeight="regular" fontSize="16px" marginBottom="50px">
        You will need to make one transaction per WSTR swapped.
      </Paragraph>
      <Ul listStyle="none">
        <Li marginBottom={3}>
          <Anchor as={Link} display="flex" alignItems="center" to="/about" underline={false}>
            <Image src={stalagmites} size={4} marginRight={3}/>
            <Text bold>What's a WSTR?</Text>
          </Anchor>
        </Li>
        <Li>
          <Anchor display="flex" alignItems="center" href="https://operators.urbit.org/guides/which-id-should-i-buy#user-content-what-is-an-urbit-id" underline={false} target="_blank" rel="noreferrer">
            <Image src={go} size={4} marginRight={3}/>
            <Text bold>What's an Urbit ID?</Text>
          </Anchor>
        </Li>
      </Ul>
    </Box>
  )
}
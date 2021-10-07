import { Box, Text, Paragraph, Image, Anchor, Ul, Li } from '@tlon/indigo-react'
import stalagmites from '../Icons/stalagmites.png';
import go from '../Icons/go.png';

export const SwapStars = () => {
  return (
    <Box
      alignSelf="start"
      flex="1 1 0%"
      width="100%"
      maxWidth="576px"
      padding={4}
      borderRadius="1.5rem"
      background="#9392EB"
    >
      <Text display="block" bold marginBottom="50px" opacity={.6}>Swapping Stars for WSTR</Text>
      <Paragraph fontWeight="bold" fontSize="20px" marginBottom="50px">
        You’re currently swapping Stars (Urbit&nbsp;ID) for WSTR, a fungible token.
      </Paragraph>
      <Ul listStyle="none">
        <Li marginBottom={3}>
          <Anchor display="flex" alignItems="center" href="https://urbit.org/docs/glossary/star" underline={false} target="_blank" rel="noreferrer">
            <Image src={stalagmites} size={4} marginRight={3}/>
            <Text bold>What's a Star?</Text>
          </Anchor>
        </Li>
        <Li>
          <Anchor display="flex" alignItems="center" href="https://bridge.urbit.org/" underline={false} target="_blank" rel="noreferrer">
            <Image src={go} size={4} marginRight={3}/>
            <Text bold>View Urbit IDs in your wallet</Text>
          </Anchor>
        </Li>
      </Ul>
    </Box>
  )
}
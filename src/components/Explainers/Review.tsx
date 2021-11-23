import { Box, Text, Paragraph, Image, Anchor, Ul, Li } from '@tlon/indigo-react'
import stalagmites from '../Icons/stalagmites.png';
import go from '../Icons/go.png';
import { useStore } from '../../store';
import { WalletType } from '../../account';
import { Exchange } from '../Forms/SwapForm';

export const Review = ({ exchange }: { exchange: Exchange }) => {
  const { account } = useStore()

  const starsForDust = exchange === Exchange.starsForDust
  const isMasterTicket = account.currentWalletType === WalletType.MasterTicket

  return (
    <Box
      alignSelf="start"
      flex="1 1 0%"
      width="100%"
      maxWidth="576px"
      padding={4}
      borderRadius="1.5rem"
      background="#51D721"
    >
      <Text display="block" bold marginBottom="25px" opacity={.6}>Review</Text>
      <Paragraph fontWeight="bold" fontSize="20px" marginBottom="50px">
       {starsForDust
        ? <>You’ll need {!isMasterTicket && 'to accept'} two transactions per star: one to set a transfer proxy and another to deposit the star.</>
        : <>You’ll need {!isMasterTicket && 'to accept'} one transaction per star.</>
       }
      </Paragraph>
      <Ul listStyle="none">
        <Li marginBottom={3}>
          <Anchor display="flex" alignItems="center" href="https://operators.urbit.org/guides/which-id-should-i-buy#user-content-star" underline={false} target="_blank" rel="noreferrer">
            <Image src={stalagmites} size={4} marginRight={3}/>
            <Text bold>What's a star?</Text>
          </Anchor>
        </Li>
        <Li>
          <Anchor display="flex" alignItems="center" href="https://bridge.urbit.org/" underline={false} target="_blank" rel="noreferrer">
            <Image src={go} size={4} marginRight={3}/>
            <Text bold>View or claim your stars in Bridge</Text>
          </Anchor>
        </Li>
      </Ul>
    </Box>
  )
}
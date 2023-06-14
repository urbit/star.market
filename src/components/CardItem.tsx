
import { Box, Text, Image } from "@tlon/indigo-react"

type CardItemProps = {
    imageSrc: string;
    desc?: string;
    sizeH?: number;
    sizeW?: number;
}

const CardItem: React.FC<CardItemProps> = ({ imageSrc, desc = '', sizeH, sizeW }) => {

    return (
        <Box color="rgba(77,77,77,1)" backgroundColor="rgba(17,17,17,0)" border="solid"
            borderWidth={0} width={250} height={140} borderRadius={15} fontSize={14} fontWeight={600} paddingTop={15} margin={1}
            alignItems="center" justifyContent={'flex-start'} display="flex" flexDirection={"column"}>
            <Box>
                <Image src={imageSrc} height={sizeH} width={sizeW} marginRight={0} marginBottom={0} />
            </Box>
            <Box marginLeft={30}>
                <Text fontWeight={500} fontSize={12}>
                    {desc}
                </Text>
            </Box>
        </Box>
    )
}

export default CardItem;

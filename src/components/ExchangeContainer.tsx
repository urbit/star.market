import { Box, Text } from '@tlon/indigo-react';
import React, { CSSProperties } from 'react';

type ExchangeItemProps = {
  name: string,
  description: string,
  link: string,
  style?: CSSProperties,
};

const ExchangeItem: React.FC<ExchangeItemProps> = ({
  name,
  description,
  link,
  style,
}) => {
  return (
    <a href={link}>
      <Box
        color="rgba(77,77,77,1)"
        border="solid"
        borderWidth={0}
        width={250}
        height={140}
        borderRadius={15}
        fontSize={14}
        fontWeight={600}
        paddingTop={15}
        alignItems="center"
        justifyContent={'flex-start'}
        display="flex"
        flexDirection={'column'}
        margin={1}
        style={{ ...style }}
      >
        <Box>
          <Text
            fontSize={35}
            fontWeight={700}
            opacity={1}
            marginRight={0}
            color={'white'}
            style={{ whiteSpace: 'nowrap', fontFamily: "Plus Jakarta Sans" }}
          >
            {name}
          </Text>
        </Box>
        <Box marginLeft={30}>
          <Text
            fontWeight={500}
            fontSize={12}
            color={'white'}
            fontStyle={'italic'}
          >
            {description}
          </Text>
        </Box>
      </Box>
    </a>
  );
};

const ExchangeContainer = () => {
  return (
    <Box
      display="flex"
      flexDirection={'row'}
      width={'100%'}
      borderWidth={0}
      marginTop={20}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <a href={'https://opensea.io/collection/urbit-id-star'}>
        <Box
          color="rgba(77,77,77,1)"
          border="solid"
          borderWidth={0}
          width={250}
          height={140}
          borderRadius={15}
          fontSize={14}
          fontWeight={600}
          paddingTop={15}
          alignItems="center"
          justifyContent={'flex-start'}
          display="flex"
          flexDirection={'column'}
          margin={1}
        >
          <Box style={{ display: 'flex' }}>
            <div style={{ marginRight: 10 }}>
              <img
                alt="opensea logo"
                src="https://opensea.io/static/images/logos/opensea.svg"
                style={{ width: 50, height: 50 }}
              />
            </div>

            <Text
              fontSize={35}
              fontWeight={700}
              opacity={1}
              marginRight={0}
              color={'white'}
              style={{ fontFamily: "Plus Jakarta Sans", }}
            >
              OpenSea
            </Text>
          </Box>
        </Box>
      </a>

      <ExchangeItem
        name={'Star Swap'}
        description={'community project'}
        link={'https://starswap.app'}
        style={{ fontStyle: 'italic' }}
      />

      <ExchangeItem
        name={'urbitex'}
        description={'community project'}
        link={'https://urbitex.io'}
      />
    </Box>
  );
};

export default ExchangeContainer;

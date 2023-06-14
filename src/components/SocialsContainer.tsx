import { Box } from '@tlon/indigo-react';
import twitter from './Icons/twitter-logo.webp';
import youtube from './Icons/youtube-logo.png';

const SocialsContainer = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'flex-end'}
      alignItems={'center'}
      marginRight={'5%'}
      marginTop={'5%'}
    >
      <a
        className="social-container"
        target="_blank"
        rel="noreferrer"
        href={'https://twitter.com/urbit'}
      >
        <img src={twitter} alt="Twitter Icon" />
      </a>
      <a
        className="social-container"
        style={{ marginLeft: 15 }}
        target="_blank"
        rel="noreferrer"
        href={'https://www.youtube.com/@urbit_'}
      >
        <img src={youtube} alt="YouTube Icon" />
      </a>
    </Box >
  );
};

export default SocialsContainer;

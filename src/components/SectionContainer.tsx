import { Box } from '@tlon/indigo-react';
import { ReactNode, CSSProperties } from 'react';

type SectionContainerProps = {
  children: ReactNode,
  style?: CSSProperties
}

const SectionContainer = ({ children, style }: SectionContainerProps) => {
  return (
    <Box
      style={{
        padding: 30,
        borderRadius: 20,
        color: 'white',
        justifyContent: 'center',
        background:
          'linear-gradient(to bottom right, rgba(8, 11, 42, 0.4), rgba(40, 48, 137, 0.8))',
        ...style,
      }}
    >
      {children}
    </Box>
  )
}


export default SectionContainer;

import { Box } from '@tlon/indigo-react';
import StarCard from './StarCard';

const StarCardContainer = () => {
  return (
    <Box display="flex" flexDirection="row" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
      <Box style={{ display: 'flex' }}>
        <StarCard
          patp={'~tirryx'}
          size={165}
          sigColors={['rgb(234, 67, 104, 1)', 'rgb(15, 58, 63, 1)']}
        />
        <StarCard
          patp={'~magnus'}
          size={165}
          sigColors={['rgb(12, 7, 131, 1)', 'rgb(153, 248, 229, 1)']}
        />
      </Box>
      <Box style={{ display: 'flex' }}>
        <StarCard
          patp={'~delhul'}
          size={165}
          sigColors={['rgb(11, 8, 82, 1)', 'rgb(172, 254, 82, 1)']}
        />
        <StarCard
          patp={'~sonnex'}
          size={165}
          sigColors={['rgb(190, 201, 0, 1)', 'rgb(28, 4, 58, 1)']}
        />
      </Box>
      <div className="remove-when-reduced">
        <StarCard
          patp={'~bolreg'}
          size={165}
          sigColors={['#00203FFF', '#ADEFD1FF']}
        />
      </div>
    </Box>
  );
};

export default StarCardContainer;

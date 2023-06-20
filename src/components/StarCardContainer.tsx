import { Box } from '@tlon/indigo-react';
import StarCard from './StarCard';

const StarCardContainer = () => {

  const size = 165;
  const bgColor = '#f3f2f0';
  const shapeColor = '#272720';

  return (
    <Box className="card-container">
      <Box style={{ display: 'flex' }}>
        <StarCard
          patp={'~tirryx'}
          size={size}
          sigColors={[bgColor, shapeColor]}
        />
        <StarCard
          patp={'~magnus'}
          size={size}
          sigColors={[bgColor, shapeColor]}
        />
      </Box>
      <Box style={{ display: 'flex' }}>
        <StarCard
          patp={'~delhul'}
          size={size}
          sigColors={[bgColor, shapeColor]}
        />
        <StarCard
          patp={'~bolreg'}
          size={size}
          sigColors={[bgColor, shapeColor]}
        />
      </Box>
      <div className="remove-when-reduced">
        <StarCard
          patp={'~sonnex'}
          size={size}
          sigColors={[bgColor, shapeColor]}
        />
      </div>
    </Box>
  );
};

export default StarCardContainer;



import { sigil, reactRenderer } from '@tlon/sigil-js';

type CardProps = {
  patp: string;
  size: number;
  sigColors: [string, string];
};

const Card: React.FC<CardProps> = ({ patp, size, sigColors }) => {
  const _sigil = sigil({
    patp: patp,
    renderer: reactRenderer,
    size: size,
    colors: sigColors,
  });

  return (
    <div
      className="star-card"
      style={{
        overflow: 'hidden',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        maxWidth: size,
        objectFit: 'contain',
      }
      }
    >
      <div className="flex-container">

        {_sigil}

      </div>

      <div className="text-container">
        {patp}
      </div>
    </div >
  );
};

export default Card;

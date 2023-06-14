import { useEffect, useState } from 'react';
import Footer from './Footer/Footer';
import { Link } from 'react-router-dom';
import {
  Icon,
  Box,
  Text,
  Image,
} from '@tlon/indigo-react';
import NavBar from './NavBar';
import MarketInfoCard from './MarketInfoCard';
import StarCardContainer from './StarCardContainer';
import ExchangeContainer from './ExchangeContainer';
import BubbleLink from './Generics/BubbleLink';
import { truncateAddress } from '../utils/text';
import SocialsContianer from './SocialsContainer';

const Main = () => {
  const { REACT_APP_DUNE_API_KEY, PUBLIC_URL } = process.env;

  const wrappedStar = `${PUBLIC_URL}/assets/network-graph.png`;
  const starVisual = `${PUBLIC_URL}/assets/star-visual.png`;
  const sigilCreate = `${PUBLIC_URL}/assets/sigil-create.png`;

  const [starPrice, setStarPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunction = async () => {
      setLoading(true);

      const apiUrl = `https://api.dune.com/api/v1/query/2627114/results?api_key=${REACT_APP_DUNE_API_KEY}`;

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        const res = await response.json();
        setStarPrice(res.result.rows[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    asyncFunction();
  }, [REACT_APP_DUNE_API_KEY]);

  return (
    <div className="gradient-background">
      <NavBar />
      <SocialsContianer />

      <div className="layout-container">
        <section className="layout" id="market-info">
          <Box style={{ marginBottom: 30 }}>
            <h2 className='white-title'>
              Market Information
            </h2>
          </Box>
          <Box className="responsive-box" >
            <MarketInfoCard
              title="Star Price (USD)"
              value={starPrice?.['last_sale_usd'] ?? 0}
              change={starPrice?.['percent_difference_last_sale_usd'] ?? 0}
              currency="USD"
              isLoading={loading}
            />
            <MarketInfoCard
              title="Star Price (ETH)"
              value={starPrice?.['last_sale_eth'] ?? 0}
              change={starPrice?.['percent_difference_last_sale_eth'] ?? 0}
              currency="ETH"
              isLoading={loading}
            />
            <MarketInfoCard
              title="Fully Diluted Market Cap."
              value={(starPrice?.['avg_current_week_usd'] ?? 0) * 65280}
              currency="USD"
              change={0}
              isLoading={loading}
            />
          </Box>

          <Box
            style={{
              padding: 30,
              borderRadius: 20,
              marginTop: 30,
              justifyContent: 'center',
              background:
                'linear-gradient(to bottom right, rgba(8, 11, 42, 0.4), rgba(40, 48, 137, 0.8))',
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: 'white',
              }}
            >
              Star Price Trend
            </h2>
            <Box width={'100%'} borderWidth={0} marginTop={20} color={'white'}>
              <iframe
                src="https://dune.com/embeds/2508458/4128263"
                height="350px"
                width="100%"
                title="chart 1"
                style={{ border: 'none', overflow: 'hidden' }}
              />
            </Box>
            <Box
              style={{
                marginTop: 20,
                fontWeight: 600,
                color: '#a0afc0',
                fontSize: 14,
              }}
            >
              For more detailed metrics, visit the Urbit dashboard on{' '}
              <a
                className='custom-link'
                href="https://dune.com/urbitfoundation/urbit"
                target="_blank"
                rel="noreferrer"
              >
                Dune Analytics
              </a>
              .
            </Box>
          </Box>
        </section>
        <section className="section-layout" id="urbit-stars">
          <h2
            className="white-title"
          >
            Urbit Stars
          </h2>
          <div>
            <Text
              fontSize={18}
              fontWeight={400}
              style={{ color: '#a0afc0' }}
            >
              <br />
              A star is a non-fungible asset that is both a unique digital
              collectible and a critical part of Urbit network infrastructure.
              <br />
            </Text>
            <h3
              style={{
                color: 'white',
                fontSize: 18,
                marginTop: 30,
                marginBottom: 10,
              }}
            >
              Scarce collectible and ID:
            </h3>
            <Text
              fontSize={18}
              fontWeight={400}
              style={{ color: '#a0afc0' }}
            >
              Stars have unique names and artwork, and can also be used as
              your digital identity and avatar on Urbit.
            </Text>
            <br />
            <br />

            <Box style={{ marginBottom: 25, marginTop: 25 }}>
              <StarCardContainer />
            </Box>
          </div>
          <h3
            style={{
              color: 'white',
              fontSize: 18,
              marginTop: 30,
              marginBottom: 10,
            }}
          >
            Network infrastructure:
          </h3>

          <div style={{ marginTop: 0 }}>
            <Text
              fontSize={18}
              fontWeight={400}
              style={{ color: '#a0afc0' }}
            >
              Your star has the ability to spawn over 65,000 planets, perform
              peer routing, and provide services. New applications for stars
              continue to be developed by the Urbit community.
            </Text>
            <div
              style={{
                marginTop: 50,
                borderRadius: 8,
                overflow: 'hidden',
                marginBottom: 15,
                marginLeft: 5,
                marginRight: 5,
              }}
              className="img-container"
            >
              <Image src={starVisual} />
            </div>
          </div>
        </section>

        <section className="section-layout" id="where-to-buy">
          <h2
            className="white-title"
          >
            Where to buy stars
          </h2>

          <ExchangeContainer />
        </section>

        <section className="section-layout-flex" id="wrapped-star">
          <Box>
            <h2
              className='white-title'

            >
              Wrapped Star
            </h2>

            <Box style={{ paddingRight: 15, paddingTop: 10 }}>
              <Text style={{ color: '#a0afc0', fontSize: 18 }}>
                Wrapped Star (WSTR) is an ERC-20 token that represents one
                Urbit star. One star can be converted to one wrapped star, and
                vice-versa.
                <br />
                To convert between stars and wrapped stars, use the star
                market conversion app link below.{' '}

              </Text>
            </Box>
            <div style={{ marginTop: 20 }}>
              <BubbleLink
                href="https://app.uniswap.org/#/swap?exactField=output&inputCurrency=ETH&outputCurrency=0xF0dC76C22139ab22618dDFb498BE1283254612B1&exactAmount=1"
                caption="Buy WSTR on Uniswap"
              >
                <img
                  alt="uniswap logo"
                  className="bubble"
                  src="/assets/uniswap-logo.png"
                />
              </BubbleLink>
            </div>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 25,
                alignItems: 'center',
              }}
            >
              <Link
                to="/app"
                className="pill-button bg-yellow"
              >
                <Text fontSize={16} fontWeight={600}>
                  Convert Star to WSTR
                </Text>
                <Icon
                  color="black"
                  size={16}
                  icon="Swap"
                  style={{ marginLeft: 10 }}
                />
              </Link>
            </Box>


          </Box>

          <Box style={{ paddingTop: 30 }}>
            <Image
              className="remove-when-reduced"
              src={wrappedStar}
              borderRadius={10}
              width={330}
            />
          </Box>
        </section>

        <section className="section-layout-flex" id="about-urbit">
          <Box>
            <h2
              className='white-title'
            >
              About Urbit
            </h2>

            <Box style={{ paddingRight: 15, paddingTop: 10 }}>
              <Text style={{ color: '#a0afc0', fontSize: 18 }}>
                Urbit is a clean-slate OS and network for the 21st century.
                It's a new kind of computer that you can own completely in
                ways that matter: networking, identity, & data. It's a real
                system with thousands of users that are building all kinds of
                communities, software, DAOs, and more.
                <br />
                <br />
                <a
                  className='custom-link'
                  href="https://urbit.org/overview"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more{' '}
                </a>{' '}
                about Urbit.
              </Text>
            </Box>
          </Box>
          <Box style={{ paddingTop: 30 }}>
            <Image
              src={sigilCreate}
              borderRadius={10}
            />
          </Box>
        </section>

        <section className="section-layout" id="media">
          <div style={{ marginTop: 20 }}>
            <h2
              className='white-title'
            >
              Featured Media
            </h2>

            <div className="video-container" style={{ marginTop: 20 }}>
              <iframe
                src="https://www.youtube.com/embed/nAmSj5JpHNo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Urbit Media"
                style={{ border: 'none', overflow: 'hidden' }}
              />
            </div>
          </div>
        </section>

        <section className="section-layout token-info" style={{ color: 'white' }}>
          <h2 className='white-title'>Urbit Star Specs</h2>
          <table className="mb-4em" >
            <tbody>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Blockchain</td>
                <td>Ethereum</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Asset Type</td>
                <td>ERC-721</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Total Supply</td>
                <td>65,280</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Azimuth Contract</td>
                <td>
                  <a
                    href="https://etherscan.io/address/0x223c067f8cf28ae173ee5cafea60ca44c335fecb"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'white' }}
                  >
                    {' '}
                    {truncateAddress(
                      '0x223c067f8cf28ae173ee5cafea60ca44c335fecb',
                    )}
                  </a>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Ecliptic Contract</td>
                <td>
                  <a
                    href="https://etherscan.io/address/0x33EeCbf908478C10614626A9D304bfe18B78DD73"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'white' }}
                  >
                    {' '}
                    {truncateAddress(
                      '0x33EeCbf908478C10614626A9D304bfe18B78DD73',
                    )}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          Wrapped star specs can be found{' '}
          <a
            className='custom-link'
            href="https://star.market/about"
          >
            here
          </a>
          .
        </section>

        <Footer className="footer-home" />
      </div>
    </div>
  );
};

export default Main;

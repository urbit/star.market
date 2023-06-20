import Footer from "./Footer/Footer";
import { Link } from "react-router-dom";
import { Icon, Box, Text, Image, Ul, Li } from "@tlon/indigo-react";
import MetricsBar from "./MetricsBar";
import StarCardContainer from "./StarCardContainer";
import uniswapLogo from "./Icons/uniswap-logo.png";
import openseaLogo from "./Icons/opensea-logo.png";
import SectionBar from "./SectionBar";

const Home = () => {
  const { PUBLIC_URL } = process.env;

  const wrappedStar = `${PUBLIC_URL}/assets/network-graph.png`;

  return (
    <div>
      <MetricsBar />
      <div className="layout-container">

        <section className="layout" id="urbit-stars">
          <SectionBar />

          <h2 className="main-title">Urbit Stars</h2>

          <p className="text-content">
            Stars are non-fungible tokens (NFTs) that are part of the broader
            hierarchy of Urbit address space. They represent an asset class that
            is fundamentally distinct from most NFTs, and these differences
            should be understood by prospective buyers. Star Market aims to be a
            resource for those interested in buying Urbit stars, or their ERC-20
            tokenized version, Wrapped Star.
          </p>

          <StarCardContainer />

          <p className="text-content">
            <h2 className="header-title">The value of stars</h2>

            <p>
              Below are some reasons often cited for why stars have value.
              Others have written in more detail on this subject, which can be
              found in this three part series of blog posts:{" "}
              <a
                className="custom-link"
                href="https://urbit.org/blog/value-of-address-space-pt1"
                target="_blank"
                rel="noreferrer"
              >
                Part 1
              </a>
              ,{" "}
              <a
                className="custom-link"
                href="https://urbit.org/blog/value-of-address-space-pt2"
                target="_blank"
                rel="noreferrer"
              >
                Part 2
              </a>{" "}
              and{" "}
              <a
                className="custom-link"
                href="https://urbit.org/blog/value-of-address-space-pt3"
                target="_blank"
                rel="noreferrer"
              >
                Part 3
              </a>
              .

            </p>

            <h3 className="section-title">1. Digital identity and Unique Collectible</h3>
            <p>
              Like most NFTs, stars have a unique ID and image, and are limited
              in supply. Some people may purchase them solely for their
              collectible value, such as stars whose names mimic common English
              words like{" "}
              <span style={{ fontFamily: "Source Code Pro" }}>
                ~winner, ~holder, or ~darryl.
              </span>{" "}
              This makes more sense when you consider that stars are also used
              as a digital identity on Urbit, so acquiring the desired name
              could be important to some.
            </p>

            <h3 className="section-title">2. Bulk address space</h3>
            <p>
              Stars have intrinsic value in the most basic sense by simply being
              large blocks of Urbit address space; with each star having
              ownership of 65,535 planets. Planets are often compared to IP
              addresses, like the one your computer or mobile device is using to
              access the internet. Perhaps unknown to most, these addresses have
              value and are
              <a href="https://auctions.ipv4.global/" className="custom-link"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                bought and sold in marketplaces
              </a>{" "}
              for around $40 each.
            </p>
            <h3 className="section-title">3. Network infrastructure services</h3>
            <p>
              Stars are infrastructure nodes, which makes them uniquely
              positioned to generate cash flow from activities on the network
              like hosting and packet routing. This means that with a couple of
              clicks an ordinary user could buy a planet, sign up for a
              hosting/routing bundle, get access to a set of services, and be
              immediately ready to interact with the community of their choice.
            </p>
            <h3 className="section-title">4. Software distribution</h3>

            <p>
              As the system evolves, stars will also to act as software
              distribution hubs. Apps need to be discoverable and safe, so a
              central hub for finding and downloading trusted software is
              necessary. This presents an opportunity for stars to host and
              distribute software, and perhaps take a fee for this service.
            </p>

            <h3 className="section-title">5. Payment and transactions</h3>

            <p>
              Fiat payments require access to a payment gateway and business
              that can accept liability. Crypto payments require access to a
              node. A payments-focused star could run Bitcoin, Lightning or
              Ethereum nodes exclusively for sponsored planets, or a
              trading-focused star could run a 0x relayer and provide an order
              book for sponsored planets.
            </p>
          </p>
        </section>

        <section className="section-layout-flex" id="wrapped-star">
          <Box>
            <h2 className="secondary-title">Wrapped Star</h2>
            <Box style={{ paddingRight: 40, paddingTop: 10 }}>
              <p className="text-content">
                Wrapped Star (WSTR) is an ERC-20 token that represents one Urbit
                star. It was developed by the community, but has been audited
                and supported by the Urbit Foundation.
                <br />
                <br />
                As an ERC-20 token, WSTR may be purchased in fractions. One
                WSTR may be converted to one star, and vice versa.
              </p>
            </Box>
            <br />
            <Link to="/about" className="custom-link">
              Learn more{" "}
            </Link>
            about Wrapped Star.
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 25,
                alignItems: "center",
              }}
            >
              <Link to="/app" className="pill-button bg-yellow"
                style={{ borderRadius: 5 }}
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
            <Image src={wrappedStar} borderRadius={10} width={330} />
          </Box>
        </section>

        <section className="layout" id="markets">
          <h2 className="secondary-title">Markets for Stars and WSTR</h2>

          <Box style={{ paddingRight: 40, paddingTop: 10 }}>
            <p className="text-content">
              The most active marketplace for stars is currently OpenSea.
              Wrapped Star is traded on Ethereum-based decentralized exchanges
              (DEXs) like Uniswap.
            </p>
          </Box>
          <Box style={{ marginTop: 15, marginBottom: 15 }}>
            <a href={"https://opensea.io/collection/urbit-id-star"}
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="opensea logo"
                src={openseaLogo}
                width={1311 * 0.135}
                height={300 * 0.135}
                style={{ margin: 15 }}
              />
            </a>

            <a
              href={
                "https://app.uniswap.org/#/swap?exactField=output&inputCurrency=ETH&outputCurrency=0xF0dC76C22139ab22618dDFb498BE1283254612B1&exactAmount=1"

              }
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="uniswap logo"
                src={uniswapLogo}
                width={1200 * 0.15}
                height={300 * 0.15}
                style={{ margin: 15 }}
              />
            </a>
          </Box>
          <Box style={{ marginTop: 20 }}>
            <p className="text-content">
              Urbit-specific platforms for buying and selling stars have also
              been developed by the community, like{" "}
              <a
                className="custom-link"
                href="https://starswap.app"
                target="_blank"
                rel="noreferrer"
              >
                Star Swap
              </a>{" "}
              and{" "}
              <a
                className="custom-link"
                href="https://urbitex.io"
                target="_blank"
                rel="noreferrer"
              >
                Urbitex
              </a>
              .
            </p>
          </Box>
        </section>

        <section className="layout" id="price-chart">
          <h2 className="secondary-title">Price History</h2>
          Visit the Urbit dashboard on{" "}
          <a
            className="custom-link"
            href="https://dune.com/urbitfoundation/urbit"
            target="_blank"
            rel="noreferrer"
          >
            Dune
          </a>{" "}
          for more charts and data.
          <Box width={"100%"} borderWidth={0} marginTop={20} color={"white"}>
            <iframe
              src="https://dune.com/embeds/2508458/4128263"
              height="350px"
              width="100%"
              title="chart 1"
              style={{ border: "none", overflow: "hidden" }}
            />
          </Box>
        </section>

        <section className="section-layout" id="media">
          <div style={{ marginTop: 20 }}>
            <h2 className="secondary-title">Media</h2>
            <p className="text-content">
              Follow Star Market on <a className="custom-link"
                target="_blank"
                rel="noreferrer"
                href={'https://twitter.com/stardotmarket'}
              >Twitter</a>, and check out Urbit's{" "}
              <a
                className="custom-link"
                target="_blank"
                rel="noreferrer"
                href={"https://www.youtube.com/@urbit_"}
              >
                YouTube
              </a>{" "}
              channel for more video content.
            </p>
            <div className="video-container" style={{ marginTop: 20 }}>
              <iframe
                src="https://www.youtube.com/embed/nAmSj5JpHNo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Urbit Media"
                style={{ border: "none", overflow: "hidden" }}
              />
            </div>
          </div>
        </section>
      </div>
      <Footer className="footer-home" />
    </div>
  );
};

export default Home;

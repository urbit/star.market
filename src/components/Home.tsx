import { useEffect, useState } from 'react'
import HomeHeader from './Header/HomeHeader';
import Footer from './Footer/Footer';
import Logo from './Icons/LightLogo';
import BubbleLink from './Generics/BubbleLink';

function padZero(str:string) {
    if (str.length < 2) {
        return `0${str}`
    }
    return str
}

export default function Home() {
    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = +new Date(`${year}-10-25`) - +new Date();
        let timeLeft = {
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00'
        };
    
        if (difference > 0) {
          timeLeft = {
            days: padZero(`${Math.floor(difference / (1000 * 60 * 60 * 24))}`),
            hours: padZero(`${Math.floor((difference / (1000 * 60 * 60)) % 24)}`),
            minutes: padZero(`${Math.floor((difference / 1000 / 60) % 60)}`),
            seconds: padZero(`${Math.floor((difference / 1000) % 60)}`),
          };
        }
    
        return timeLeft;
      };

      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

      useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });

      console.log(timeLeft)

    return (
        <div className="layout-container">
            <HomeHeader />
            <section className="layout">
                <div className="hero-rect" style={{backgroundImage: "url('/assets/hero.jpg')"}}>
                    <Logo className="logo" />
                    <div className="inner-text measure-narrow">
                        <p>Star Market is the only place to swap your Urbit star for a WSTR.
</p>

                        <p>Stars are businesses, supernodes, and service providers on the Urbit Network. </p>

                        <p className="timer bg-yellow text-black">
                            Launching in <b className='ml-0.25em'>{timeLeft.days}</b><b>:</b><b>{timeLeft.hours}</b><b>:</b><b>{timeLeft.minutes}</b><b>:</b><b>{timeLeft.seconds}</b>
                        </p>

                    </div>
                </div>
            </section>

            <section className="layout">
                <div className="flex justify-between">
                    <div className="measure mr-1em">
                        <h3 className="gray-title">What is Urbit ID?</h3>
                        <h2>
                            A key to a new digital world
                        </h2>
                        <p>Urbit ID is a decentralized addressing system and public key infrastructure designed for Urbit OS. It is a unique number, a username, an avatar, a piece of a collectively owned network, and a key to a new digital world. Sort of like DNS, IP and a username system combined into one thing. Each Urbit ID is an ERC-721 NFT on the Ethereum blockchain.
                        </p>
                            <a rel="noreferrer" target="_blank" href="https://urbit.org/understanding-urbit/urbit-id" className="inline-block mt-1 button-sm button-bg-black">Learn More about Urbit ID</a>
                    </div>
                    <div style={{
                        backgroundImage:"url('/assets/sigil-grid.png')",
                        backgroundSize:"cover",
                        backgroundPosition:"center",
                        width: '300px',
                        height: '300px',
                        marginTop:'1em'
                    }}
                    className="home-section-img w-full ml-1em" />
                </div>
            </section>

            <section className="layout">
                <div className="flex justify-between">
                    <div className="measure mr-1em">
                        <h3 className="gray-title">What is a star?</h3>
                        <h2>
                            Infrastructure for businesses and communities
                        </h2>
                        <p>There are 5 different types of Urbit IDs. A star is an infrastructure node and, as such, is for businesses, communities, or metropolises. Stars spawn and sponsor planets, perform peer routing, provide services, and swap for WSTR. There are 2^16 (~65K) stars and each can sponsor ~65K planets.
                       
                        </p>
                            <a rel="noreferrer" target="_blank" href="https://operators.urbit.org/guides/running-a-star" className="inline-block mt-1 button-sm button-bg-black">Star & Galaxy Guides</a>
                    </div>
                    <div style={{
                        backgroundImage:"url('/assets/floaty-sigil.png')",
                        backgroundSize:"cover",
                        backgroundPosition:"center",
                        width: '300px',
                        height: '300px',
                        marginTop:'1em'
                    }}
                    className="home-section-img w-full ml-1em" />
                </div>
            </section>

            <section className="layout">
                <div className="measure">
                    <h3 className="gray-title">Get Urbit Stars</h3>
                    <h2>
                        Stars are available from a variety of marketplaces
                    </h2>

                    <ul>
                        <BubbleLink
                            href="https://opensea.io/assets/urbit-id"
                            title="OpenSea"
                            caption="A large, general NFT marketplace"
                        >
                            <img alt="opensea logo" className="bubble" src="https://opensea.io/static/images/logos/opensea.svg" />
                        </BubbleLink>

                        <BubbleLink
                            href="web+urbitgraph://group/~tirrel/the-marketplace"
                            className="mt-2"
                            title="The Marketplace"
                            caption="An Urbit group for trading address space"
                        >
                            <img alt="the marketplace logo" className="bubble" src="/assets/the-marketplace-logo.png" />
                        </BubbleLink>
                    </ul>
                       
                </div>
            </section>

            <section className="layout">
                <div className="flex justify-between">
                    <div className="measure mr-1em">
                        <h3 className="gray-title">What is a WSTR?</h3>
                        <h2>
                            1 WSTR = 1 star
                        </h2>
                        <p>Urbit Wrapped Star (WSTR) is an ERC-20 token that represents one Urbit star which is an ERC-721 token. Through Star Market, one star can be converted to one wrapped star, and vice-versa. The stars redeemed by a wrapped star are doled out on a last-in-first-out basis.
                        </p>
                        <a href="https://star.market/about" rel="noreferrer" className="inline-block mt-1 button-sm button-bg-black">About WSTR</a>
                    </div>
                    <div style={{
                        backgroundImage:"url('/assets/network-graph.png')",
                        backgroundSize:"cover",
                        backgroundPosition:"center",
                        width: '300px',
                        height: '300px',
                        marginTop:'1em'
                    }}
                    className="home-section-img ml-1em" />
                </div>
            </section>

            <section className="layout">
                <div className="measure">
                    <h3 className="gray-title">Get WSTR</h3>
                    <h2>
                        Trade WSTR on a variety of distributed exchanges
                    </h2>

                    <p>Coming Soon</p>

                    <ul>
                        {/* <BubbleLink
                            href="https://app.uniswap.org/"
                            title="Uniswap V2"
                            caption="A decentralized finance protocol"
                        >
                            <img 
                            alt="uniswap logo"
                            className="bubble" src="/assets/uniswap-logo.png" />
                        </BubbleLink> */}

                        {/* <BubbleLink
                            href="https://sushi.com/"
                            className="mt-2"
                            title="Sushi"
                            caption="A decentralized finance protocol"
                        >
                            <img 
                            alt="sushi swap logo"
                            className="bubble" src="/assets/sushi-logo.png" />

                        </BubbleLink>

                        <BubbleLink
                            href="https://matcha.xyz/"
                            className="mt-2"
                            title="Matcha"
                            caption="Matcha finds you the best prices across exchanges and combines them into one trade."
                        >
                            <img 
                            alt="urbit.live logo"
                            className="bubble" src="/assets/matcha-logo.png" />

                        </BubbleLink> */}
                    </ul>
                       
                </div>
            </section>
            <Footer />
        </div>
    )
}

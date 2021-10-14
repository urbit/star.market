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
        const difference = +new Date(`${year}-10-30`) - +new Date();
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
                    <div className="inner-text measure-narrow timer">
                        <p>Star Market is the easiest 
way to obtain an Urbit star.</p>

                        <p>Stars are gateways to building businesses, supernodes, and 
                        other provider services on 
                        the Urbit Network.</p>

                        <p className="timer bg-yellow text-black table">
                            Launching in <b>{timeLeft.days}</b><b>:</b><b>{timeLeft.hours}</b><b>:</b><b>{timeLeft.minutes}</b><b>:</b><b>{timeLeft.seconds}</b>
                        </p>

                    </div>
                </div>
            </section>

            <section className="layout">
                <div className="flex justify-between">
                    <div className="measure mr-1em">
                        <h3 className="gray-title">Why Urbit ID?</h3>
                        <h2>
                            A key to the world’s only personal computer
                        </h2>
                        <p>Urbit IDs are nonfungible assets that represent an identity, a namespace, a key to a unit of personal computation built on Urbit OS.
                        </p>
                            <a rel="noreferrer" target="/blank" href="https://urbit.org" className="inline-block mt-1 button-sm button-bg-black">Learn More</a>
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
                        <h3 className="gray-title">Why Urbit ID?</h3>
                        <h2>
                            A key to the world’s only personal computer
                        </h2>
                        <p>Urbit IDs are nonfungible assets that represent an identity, a namespace, a key to a unit of personal computation built on Urbit OS.
                        </p>
                            <a rel="noreferrer" target="/blank" href="https://urbit.org" className="inline-block mt-1 button-sm button-bg-black">Learn More</a>
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
                        <h3 className="gray-title">Urbit IDs for Star Operators</h3>
                        <h2>
                            Stars are businesses, supernodes, providers etc
                        </h2>
                        <p>Obtaining a Star-class Urbit ID is an immediate entrypoint to building a business on the Urbit Network. There are a variety of modular tools developed to get provider businesses set up. 
                        </p>
                            <a href="https://operators.urbit.org" rel="noreferrer" className="inline-block mt-1 button-sm button-bg-black">Learn More</a>
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
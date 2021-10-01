import HomeHeader from './Header/HomeHeader';
import Footer from './Footer/Footer';
import Logo from './Icons/Logo';
import BubbleLink from './Generics/BubbleLink';

export default function Home() {
    return (
        <div className="layout-container">
            <HomeHeader />
            <section className="layout">
                <div className="hero-rect">
                    <Logo className="logo" />
                    <div className="inner-text measure-narrow ">
                        <p>Star Market is the easiest 
way to obtain an Urbit star.</p>

                        <p>Stars are gateways to building businesses, supernodes, and 
                        other provider services on 
                        the Urbit Network.</p>

                    </div>
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
                            caption="The world's largest NFT marketplace"
                        >
                            <img className="bubble" src="https://opensea.io/static/images/logos/opensea.svg" />
                        </BubbleLink>

                        <BubbleLink
                            href="https://urbit.live/"
                            className="mt-2"
                            title="Urbit.live"
                            caption="The universe's largest Urbit planet market"
                        >
                            <img className="bubble" src="https://urbit.live/static/media/urbit-live-logo-png-400.6ec9a92b.png" />

                        </BubbleLink>
                    </ul>
                       
                </div>
            </section>

            <section className="layout">
                <div className="measure">
                    <h3 className="gray-title">Get $WSTR</h3>
                    <h2>
                        Trade $WSTR on a variety of distributed exchanges
                    </h2>

                    <ul>
                        <BubbleLink
                            href="https://app.uniswap.org/"
                            title="Uniswap"
                            caption="A decentralized finance protocol"
                        >
                            <img className="bubble" src="https://app.uniswap.org/static/media/logo.4a50b488.svg" />
                        </BubbleLink>

                        <BubbleLink
                            href="https://sushi.com/"
                            className="mt-2"
                            title="Sushi"
                            caption="A decentralized finance protocol"
                        >
                            <img className="bubble" src="https://sushi.com/static/media/logo.dec926df.png" />

                        </BubbleLink>

                        <BubbleLink
                            href="https://matcha.xyz/"
                            className="mt-2"
                            title="Matcha"
                            caption="Matcha finds you the best prices across exchanges and combines them into one trade."
                        >
                            <img className="bubble" src="https://urbit.live/static/media/urbit-live-logo-png-400.6ec9a92b.png" />

                        </BubbleLink>
                    </ul>
                       
                </div>
            </section>
            <Footer />
        </div>
    )
}
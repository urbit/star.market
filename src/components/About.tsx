import HomeHeader from './Header/HomeHeader';

export default function About() {
    return (
        <div className="layout-container">
            <HomeHeader />

            <section className="layout">
                <div className="measure">
                <p>Star Market is the easiest 
                    way to obtain a Star.
                </p>
                <p>
                Stars are gateways to building businesses, supernodes, and other provider services on 
                    the Urbit Network.
                </p>

                <p>
                    Urbit is a clean-slate OS and network.
                        Learn more about Urbit at <a href="urbit.org" target="_blank">Urbit.org</a>.
                </p>
            </div>
            </section>

            <section className="layout">
                <h3 className="gray-title">What is $WSTR?</h3>
                <p>
                Urbit is a clean-slate OS and network.
                    Learn more about Urbit at Urbit.org
                </p>

            </section>
            
        </div>
    )
}
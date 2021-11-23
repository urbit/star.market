import HomeHeader from './Header/HomeHeader';
import Footer from './Footer/Footer';
import BubbleLink from './Generics/BubbleLink';

export default function About() {
    return (
        <div className="layout-container">
            <HomeHeader />

            <section className="layout">
                <div className="measure-narrow hero-text">
                <p>Star Market is the only place to swap your Urbit star for a WSTR.
                </p>
                <p>
                    Star Market is a community driven project audited by Urbit. 
                </p>

                <p>
                    Urbit is a peer-to-peer network of personal servers in the cloud.
                    Learn more about Urbit at <a href="urbit.org" rel="noreferrer" target="_blank">Urbit.org</a>.
                </p>
            </div>
            </section>

            <section className="layout token-info">
                <table className="mb-4em">
                    <tbody>
                        <tr>
                            <td>Token Name</td>
                            <td>Wrapped Star</td>
                        </tr>
                        <tr>
                            <td>Token Symbol</td>
                            <td>WSTR</td>
                        </tr>
                        <tr>
                                <td>Max Supply</td>
                                <td>65,280</td>
                        </tr>
                        <tr>
                                <td>Social</td>
                                <td><a rel="noreferrer" target="_blank" href="https://twitter.com/urbit">@urbit</a> on Twitter</td>
                        </tr>
                        <tr>
                            <td>Token Icon</td>
                            <td><img alt="wstr-logo" style={{width:'96px', height: '96px'}} src="/assets/wstr-logo-192.png" /></td>
                        </tr>
                    </tbody>
                </table>

                <table className="mb-4em">
                    <tbody>
                        <tr>
                            <td>Token Description</td>
                            <td><p>Urbit Wrapped Star (WSTR) is an ERC-20 token that represents one Urbit star which is an ERC-721 token. Through Star Market, one star can be converted to one wrapped star, and vice-versa. The stars redeemed by a wrapped star are doled out on a last-in-first-out basis.</p></td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <tbody>
                        <tr>
                            <td>Contract Address</td>
                            <td>
                                <a href="https://etherscan.io/token/0xf0dc76c22139ab22618ddfb498be1283254612b1" rel="noreferrer" target="_blank">0xf0dc76c22139ab22618ddfb498be1283254612b1</a>
                            </td>
                        </tr>
                        <tr>
                            <td>Contract Source Repo</td>
                            <td><a rel="noreferrer" target="_blank" href="https://github.com/ransonhobbes/stardust">https://github.com/ransonhobbes/stardust</a></td>
                        </tr>
                        <tr>
                            <td>Token Website</td>
                            <td><a href="https://star.market">https://star.market</a></td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="layout">
                <h3 className="gray-title">Audit References</h3>
                <ul>
                    <BubbleLink
                        href="https://18108973658826589741.googlegroups.com/attach/73008de92defe/Preliminary%20Stardust%20Audit%20Report%20v2.pdf?part=0.2&view=1&vt=ANaJVrFY0pvUAvtKp022657-C1GOkCllq0QoQqxiBniLR9IzFbGxSPXQS0qmlHHKUacRtjkabt27FDSbqdZzAI0FKoxxml3RUEQ_wnnRpzpU_rR1E3PicAQ"
                        title="Optilistic Audit"
                        caption="Security audit from Optilistic"
                    >
                    <img 
                        alt="lock icon"
                        className="bubble" src="assets/lock-bg.png" />
                    </BubbleLink>
                     <BubbleLink
                        href="https://18108973658826589741.googlegroups.com/attach/51257300be160/Sigma%20Prime%20-%20Urbit%20-%20Stardust%20Smart%20Contract%20Security%20Assessment%20v1.0.pdf?part=0.1&view=1&vt=ANaJVrE6sFqTUiND0NB1qOyFg7Xo_TuRX4QHnkoY1NOpv8FlP2QEz3gWynLm0MZo4ZsB3h2MQywvFCCv3-ossLb5j9Ytg9BraEiuR4jG6PMk2Ngp4H71g2E"
                        title="Sigma Prime Audit"
                        className="mt-2"
                        caption="Smart contract security review from Sigma Prime"
                    >
                        <img 
                            alt="lock icon"
                            className="bubble" src="assets/lock-bg.png" />
                    </BubbleLink>
                    <BubbleLink
                        href="https://18108973658826589741.googlegroups.com/attach/73008de92defe/Stardust%20Security%20Audit%20Report%20(merged).md?part=0.1&view=1&vt=ANaJVrGgpIpZnv_PCvdmd2QCO2I_RNoo9GuqUgGFB_yTcQkgE-2gToLANjZIxZ6y0_zCNY3eAW-whjIsv3PvqL_3X3JbAy_qCFc70kIWda-NP_7Ur1-WpMg"
                        title="Mix Bytes"
                        caption="Security audit by Mix Bytes"
                        className="mt-2"
                    >
                    <img 
                        alt="lock icon"
                        className="bubble" src="assets/lock-bg.png" />
                    </BubbleLink>
                </ul>
            </section>
            <Footer />
            
        </div>
    )
}

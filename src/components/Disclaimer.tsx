import HomeHeader from './Header/HomeHeader';
import Footer from './Footer/Footer';

export default function Disclaimer() {
    return (
        <div className="layout-container">
            <HomeHeader />

            <section className="layout">
                <div className="measure">
                Disclaimer

<h4>Urbit Wrapped Star (WSTR) Contract and Interface Disclaimer</h4>

<p>Urbit is an open-source peer-to-peer network, virtual computer, and identity system. Urbit identities are instantiated as ERC-721 tokens on the Ethereum blockchain. Urbit Wrapped Star Contract (“The Contract”) is a decentralized smart contract that can be used to deposit Urbit ERC-721 tokens, and receive “wrapped” ERC-20 tokens, and vice versa. The Contract is made up of free, public, open-source or source-available software that is deployed on the Ethereum Blockchain. The Urbit Wrapped Star Contract Interface (“The Interface”) is a website that allows users to interact with The Contract.</p>

<p>Your use of the The Interface and The Contract involves various risks, including, but not limited to, losses while digital assets are being supplied to The Contract, and losses due to the fluctuation of prices of tokens you have exchanged. Before using The Interface or The Contract, you should review the relevant documentation to make sure you understand how they work. Additionally, just as you can access email email protocols such as SMTP through multiple email clients, you can potentially access The Contract through various web or mobile interfaces. Tlon Corporation is not responsible for these various interfaces. You are responsible for doing your own diligence on those interfaces to understand the fees and risks they present.</p>

<p>AS DESCRIBED IN THE INTERFACE AND CONTRACT LICENSES, THEY ARE EACH SEPARATELY  PROVIDED ”AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. Although Tlon Corporation developed much of the initial code for The Interface, it does not provide, own, or control The Contract, which is deployed on the Ethereum blockchain, and was developed by third parties not related to Tlon. Upgrades and modifications to The Contract are managed in a community-driven way by the developers of The Contract. No developer or entity involved in creating the Interface, or The Contract will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of The Contract or The Interface, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.</p>

 
            </div>
            </section>
            <Footer/>
            
        </div>
    )
}
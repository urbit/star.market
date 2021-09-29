import { Row, Text } from '@tlon/indigo-react'
import { Link } from 'react-router-dom';
import HomeHeader from './Header/HomeHeader';
import Footer from './Footer/Footer';

export default function NoMatch() {
    return (
        <div className="layout-container">
            <HomeHeader />
            <section className="layout">
                <div className="fourOFour">
                    <h2>404</h2>
                </div>
            </section>
            <Footer />
        </div>
    )
}
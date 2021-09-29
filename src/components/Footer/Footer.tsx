import { Link } from 'react-router-dom';
import Logo from '../Icons/Logo';

import './Footer.scss'

export default function Footer() {
    return (
        <header className="footer">
            <div className="innerCol">
                <Link to="/">
                    <div className="pill-button">
                        <Logo />
                        <p className="ml-0.5em">
                            Star Market
                        </p>
                    </div>
                </Link>
                <nav>
                    <Link to="/about">
                        <div className='pill-button'>
                            About
                        </div>
                    </Link>
                    <Link to="/app">
                        <div className="pill-button ml-0.5em">
                            Launch App
                        </div>
                    </Link>
                    <Link to="/disclaimer">
                        <div className="pill-button ml-0.5em">
                            Disclaimer
                        </div>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
import { Link } from 'react-router-dom';
import Logo from '../Icons/Logo';

import './Footer.scss'

export default function Footer() {
    return (
        <header className="footer">
            <div className="innerCol">
                <Link to="/">
                    <div className="toolbar-link">
                        <Logo />
                        <p className=" ml-0.5em">
                            Star Market
                        </p>
                    </div>
                </Link>
                <nav>
                    <Link to="/about">
                        <div className='toolbar-link'>
                            About
                        </div>
                    </Link>
                    <Link to="/app">
                        <div className="toolbar-link">
                            Launch App
                        </div>
                    </Link>
                    <Link to="/disclaimer">
                        <div className="toolbar-link">
                            Disclaimer
                        </div>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
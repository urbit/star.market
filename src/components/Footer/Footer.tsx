import { Link } from 'react-router-dom';
import Logo from '../Icons/Logo';

import './Footer.scss'

type FooterProps = {
    className: string,
    style: any,
}

export default function Footer({className, style}:FooterProps) {
    return (
        <footer className={`footer ${className}`} style={{...style}}>
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
                            App
                        </div>
                    </Link>
                    <Link to="/disclaimer">
                        <div className="toolbar-link">
                            Disclaimer
                        </div>
                    </Link>
                    <Link to="/tos">
                        <div className="toolbar-link">
                            Terms of Service
                        </div>
                    </Link>
                    <a href="https://github.com/urbit/starketplace/issues" target="_blank" rel="noreferrer"className="toolbar-link">
                        Bug Reports
                    </a>
                </nav>
            </div>
        </footer>
    )
}

Footer.defaultProps = {
    className: "",
    style: {},
}
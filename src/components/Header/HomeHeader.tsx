import { Link } from 'react-router-dom';
import Logo from '../Icons/Logo';

export default function HomeHeader() {
    return (
        <header className="homeHeader">
            <div className="innerCol">
                <Link to="/">
                    <div className="pill-button bg-gray">
                        <Logo />
                        <p className="ml-0.5em">Star Market</p>
                    </div>
                </Link>
                <nav>
                    <Link to="/about">
                        <div className='pill-button'>
                            About
                        </div>
                    </Link>
                    <Link to="/app">
                    <div className="pill-button bg-yellow ml-0.5em">
                            Launch App
                        </div>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
import { Link } from 'react-router-dom';
import Logo from '../Icons/Logo';

export default function HomeHeader() {
    return (
        <header className="homeHeader">
            <div className="innerCol">
                <Link to="/" className="pill-button">
                    <Logo />
                    <span className="ml-0.5em">Star Market</span>
                </Link>
                {/* <nav>
                    <Link to="/about" className='pill-button'>
                        About
                    </Link>
                    <Link to="/app" className="pill-button bg-yellow ml-0.5em">
                        Launch App
                    </Link>
                </nav> */}
            </div>
        </header>
    )
}

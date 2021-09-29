import { Link } from 'react-router-dom';

export default function HomeHeader() {
    return (
        <header className="homeHeader">
            <div className="innerCol">
                <Link to="/">
                    Star Market
                </Link>
                <nav>
                    <Link to="/about">
                        About
                    </Link>
                    <Link to="/app">
                        Launch App
                    </Link>
                </nav>
            </div>
        </header>
    )
}
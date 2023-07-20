import { Link } from 'react-router-dom';
import Logo from '../Icons/Logo';
import { FC } from 'react';

interface HomeHeaderProps {
    gray?: boolean;
}

const HomeHeader: FC<HomeHeaderProps> = ({ gray }) => {
    return (
        <header className="homeHeader">
            <div className="innerCol">
                <Link to="/" className={`pill-button ${gray ? 'bg-gray' : ''}`}>
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

export default HomeHeader;

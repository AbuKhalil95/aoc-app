import { Link } from "react-router-dom";

const Header = () => {
    return <header className="h-20 flex flex-row justify-between place-items-center px-10 bg-slate-300">
        <div>
            Here is logo
        </div>
        <nav>
            <ul className="flex flex-row">
                <li className="px-3">
                    <Link to="/">
                        <p>Home</p>
                    </Link>
                </li>
                <li className="px-3">
                    <Link to="/sellers">
                        All Sellers
                    </Link>
                </li>
                <li className="px-3">
                    <Link to="/appointments">
                        Appointments
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
};

export default Header;

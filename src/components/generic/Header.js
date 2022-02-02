import { Link, useNavigate } from "react-router-dom";
import { deleteToken } from "utils";

const Header = ({ loggedIn, setLoggedIn, ...props }) => {
    const navigate = useNavigate();

    const logout = () => {
        deleteToken();
        setLoggedIn(false);
        navigate('/');
    }

    return <header {...props} >
        <div>
            Here is logo
        </div>
        <nav>
            <ul className="flex flex-row">
                <li className="px-3">
                    {loggedIn ? (
                        <a className="cursor-pointer" onClick={logout}>Logout</a>
                    ) : (
                        <Link to="/">
                            <p>Login</p>
                        </Link>
                    )}
                </li>
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

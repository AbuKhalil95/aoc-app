import React from 'react';
import { useNavigate } from "react-router-dom"

import LoginForm from 'components/auth/LoginForm';

const Home = ({loggedIn, setLoggedIn}) => {
    const navigate = useNavigate()

    const routeToSellers = () => {
        setLoggedIn(true);
        navigate('/sellers');
    }

    return <>

        <h1 className='text-5xl'>
            Welcome to the booking services
        </h1>
        {(loggedIn !== null && loggedIn) ? (
            <>
                Hello
            </>
        ) : (
            <div>
                <LoginForm onLogin={routeToSellers} />
            </div>
        )}
    </>;
};

export default Home;

import React from 'react';
import { useNavigate } from "react-router-dom"

import LoginForm from 'components/auth/LoginForm';
import { decodeToken } from 'utils';

const Home = ({ loggedIn, setLoggedIn, setType }) => {
    const navigate = useNavigate()

    const routeToSellers = () => {
        setLoggedIn(true);
        setType(decodeToken()?.type)
        navigate('/sellers');
    }

    return (
        <>

            <h1 className='text-5xl'>
                Welcome to the booking services
            </h1>
            {(loggedIn !== null && loggedIn) ? (
                <h2 className='text-3xl mt-11'>
                    You are Logged in!
                </h2>
            ) : (
                <div>
                    <LoginForm onLogin={routeToSellers} />
                </div>
            )}
        </>
    );
};

export default Home;

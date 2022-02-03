import React from 'react';
import { useNavigate } from "react-router-dom"

import LoginForm from 'components/auth/LoginForm';

const Home = ({ loggedIn }) => {
    const navigate = useNavigate();

    const onLogin = () => {
        navigate(0);
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
                    <LoginForm onLogin={onLogin} />
                </div>
            )}
        </>
    );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

import AppointmentsList from 'components/AppointmentList';
import { decodeToken, getToken } from 'utils';

const Appointments = ({ loggedIn, type, userId }) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const requests = data.length !== 0;
    const canAccept = type === "sellers";

    useEffect(async () => {
        if (!loggedIn) {
            alert("You are not logged in!")
            return navigate('/');
        }

        if (userId) {

            const res = await axios.get(
                `${process.env.REACT_APP_BACKEND}/appointments/requests/${userId}`,
                {
                    headers: { Authorization: `Bearer ${getToken()}` }
                }
            );
            setData(res.data);
        }

    }, [userId])
    return (
        <>

            <h1 className='text-5xl mb-10 text-center'>
                Your Scheduled Appointments
            </h1>
            <div>
                {!requests ? (
                    <p className="text-red-700 font-bold mt-5 w-fit m-auto">No Buyers Requests!</p>
                ) : (
                    <AppointmentsList list={data} canAccept={canAccept} />
                )}
            </div>
        </>
    );
};

export default Appointments;

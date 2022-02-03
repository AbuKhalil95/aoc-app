import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

import SellerList from 'components/SellerList';
import { decodeToken, getToken } from 'utils';

const Sellers = ({ loggedIn, type }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFiltered] = useState([]);
    const navigate = useNavigate();
    const available = data.length !== 0;
    const canBook = type === "buyers";
    // TODO: Check if putting userId in a state solves the undefined race issue when passing to children
    let userId;

    useEffect(async () => {
        if (!loggedIn) {
            alert("You are not logged in!")
            return navigate('/');
        }

        const { id } = await decodeToken();
        userId = id;

        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND}/appointments/available/${userId}`,
            {
                headers: { Authorization: `Bearer ${getToken()}` }
            }
        );

        setData(res.data);
    }, [])

    const querySearch = (e) => {
        if (e.key === 'Enter') {
            setFiltered(data.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
        }
    }

    return (
        <>

            <h1 className='text-5xl text-center'>
                The Sellers Club
            </h1>
            <div className='flex justify-center'>
                <input className="px-6 py-2 my-10 border-2 rounded-2xl disabled:border-red-300 disabled:bg-red-200" disabled={!available} type="text" placeholder={!available ? "Unavailable" : "Search for a seller.."} onKeyDown={querySearch} />
            </div>
            <div>
                {!canBook && <p className="text-red-700 font-bold my-5 m-auto w-fit">Only Buyers can book.</p>}
                {!available ? (
                    <p className="text-red-700 font-bold mt-5">No Sellers Available!</p>
                ) : (
                    <SellerList list={(filteredData.length > 0 && filteredData) || data} canBook={canBook} />
                )}
            </div>
        </>
    );
};

export default Sellers;

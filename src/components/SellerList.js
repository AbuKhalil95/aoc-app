import React, { useEffect } from 'react';
import axios from 'axios';

import { decodeToken, getToken } from 'utils';
import { useNavigate } from 'react-router-dom';

// Seller list generating component
const SellerList = ({ list = [] }) => {
    const navigate = useNavigate()
    let userId;

    const bookAppointment = (id) => async (e) => {
        await axios.post(
            `${process.env.REACT_APP_BACKEND}/appointments/${userId}/${id}?date=${e.target.value}`,
            null,
            {
                headers: { Authorization: `Bearer ${getToken()}` }
            })
        navigate(0);
    }

    useEffect(async () => {
        const { id } = await decodeToken();
        userId = id;
    }, [])

    return (
        <ul className='w-1/2  m-auto border-solid border-2 border-slate-400 rounded-xl'>
            {
                list.length > 0 ? (
                    list.map((item) => <Item key={item.id} item={item} onSelect={bookAppointment(item.id)} />)
                ) : (
                    <div className='p-2'>Empty Search Results</div>)}
        </ul>
    )
};

export default SellerList;

const Item = ({ item: { name, appointments = [] }, onSelect }) => {
    // Get today and tomorrow
    let today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrow = today.toISOString().substr(0, 10);

    // checks availability
    const available = appointments.length === 0;
    const accepted = appointments?.[0]?.isAccepted

    return (
        <li className='flex flex-row justify-between p-3'>
            <h3 className='font-bold text-2xl self-center ml-5'>{name}</h3>
            <div>
                {/* TODO: Support all pending, approved and rejected with an enum instead of boolean */}
                {available && <label className='bg-green-600 p-2 rounded-md' htmlFor='date'>Book an Appointment!</label>}
                {!available && !accepted && <label className='bg-gray-500 p-2 rounded-md' htmlFor='date'>Waiting Approval</label>}
                {!available && accepted && <label className='bg-blue-500 p-2 rounded-md' htmlFor='date'>Approved</label>}

                <input className="ml-4 border-slate-300 border p-2 m-2" disabled={!available} id="date" name="date" type="date" min={tomorrow} defaultValue={appointments?.[0]?.date.substr(0, 10) || tomorrow} onChange={onSelect} />
            </div>
        </li>
    )
}
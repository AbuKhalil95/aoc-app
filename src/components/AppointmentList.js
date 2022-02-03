import React, { useEffect } from 'react';
import axios from 'axios';

import { decodeToken, getToken } from 'utils';
import { useNavigate } from 'react-router-dom';

// AppointmentsList list generating component
const AppointmentsList = ({ list = [], canAccept }) => {
    const navigate = useNavigate()
    let userId;

    const acceptAppointment = (id) => async () => {
        await axios.put(
            `${process.env.REACT_APP_BACKEND}/appointments/${id}`,
            {
                isAccepted: true
            },
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
                list.map((item) => <Item key={item.id} item={item} onApprove={acceptAppointment} />)
            }
        </ul>
    )
};

export default AppointmentsList;

const Item = ({ item: { name, appointments = [] }, onApprove }) => {
    // Get today and tomorrow
    let today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrow = today.toISOString().substr(0, 10);

    // checks availability
    const accepted = appointments?.[0]?.isAccepted

    return (
        <li className='flex flex-row justify-between p-3'>
            <h3 className='font-bold text-2xl self-center ml-5'>{name}</h3>
            <div>
                {/* TODO: Support all pending, approved and rejected with an enum instead of boolean */}
                {!accepted && <label className='bg-green-500 p-2 rounded-md' htmlFor='date' onClick={onApprove(appointments?.[0]?.id)}>Approve?</label>}
                {accepted && <label className='bg-blue-500 p-2 rounded-md' htmlFor='date'>Approved</label>}

                <input className="ml-4 border-slate-300 border p-2 m-2" disabled={true} id="date" name="date" type="date" min={tomorrow} defaultValue={appointments?.[0]?.date.substr(0, 10) || tomorrow} />
            </div>
        </li>
    )
}
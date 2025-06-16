import { sendData, setCardDetails } from '@/features/sendCardSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SendCardData = () => {
    const dispatch = useDispatch();
    const { title, description, price, status, error } = useSelector((state) => state.sendCard);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendData({ title, description, price }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setCardDetails({ [name]: value }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Card Title"
                />
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    placeholder="Card Description"
                />
                <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={handleChange}
                    placeholder="Price"
                />
                <button type="submit">Send Card</button>
            </form>

            {status === 'loading' && <p>Sending...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && <p>Card sent successfully!</p>}
        </div>
    );
};

export default SendCardData;

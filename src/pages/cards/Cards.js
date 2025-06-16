import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '@/features/cardsSlice';

const Cards = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.data);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchData());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    );
};

export default Cards;

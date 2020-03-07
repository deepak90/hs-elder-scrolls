import React, { useState, useEffect } from 'react';
import Card from './Card';
import CardSkeleton from './CardSkeleton';

import '../css/card-container.css';

const CardContainer = () => {
    const [hasError, setErrors] = useState(false);
    const [cardData, setCards] = useState([]);

    async function fetchData() {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        try {
            const res = await fetch(
                'https://api.elderscrollslegends.io/v1/cards?pageSize=20'
            );
            await sleep(2000);
            res.json().then(res => setCards(res));
        } catch (err) {
            setErrors(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const { cards = [] } = cardData;

    if (!cards.length && !hasError) {
        return <CardSkeleton />;
    }

    if (hasError) {
        return (
            <span>
                We're unable to fetch Cards at this time, Please try again later
            </span>
        );
    }

    return (
        <ul className="list">
            {cards.map(item => {
                const { id } = item;
                return <Card key={id} info={item} />;
            })}
        </ul>
    );
};

export default CardContainer;

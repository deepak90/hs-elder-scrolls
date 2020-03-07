import React, { useState, useEffect } from 'react';
import Card from './Card';
import CardSkeleton from './CardSkeleton';

import '../css/card-container.css';

const CardContainer = () => {
    const [hasError, setErrors] = useState(false);
    const [cards, setCards] = useState([]);
    const [nextUrl, setUrl] = useState(
        'https://api.elderscrollslegends.io/v1/cards?pageSize=20'
    );
    const [isFetching, setIsFetching] = useState(false);

    async function fetchData() {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        try {
            const res = await fetch(nextUrl);
            res.json().then(res => {
                setCards([...cards, ...res.cards]);
                setUrl(res._links.next || '');
                setIsFetching(false);
            });
        } catch (err) {
            setErrors(err);
        }
    }

    function handleScroll() {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isFetching
        )
            return;
        setIsFetching(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetchData();
    }, [isFetching]);

    if ((isFetching && !hasError) || !cards.length) {
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
            {cards &&
                cards.map(item => {
                    const { id } = item;
                    return <Card key={id} info={item} />;
                })}
        </ul>
    );
};

export default CardContainer;

import React, { useState, useEffect } from 'react';
import Card from './Card';
import CardSkeleton from './CardSkeleton';

import '../css/card-container.css';
import LazyLoad from 'react-lazyload';

const CardContainer = () => {
    const [hasError, setErrors] = useState(false);
    const [cards, setCards] = useState([]);
    const [nextUrl, setNext] = useState(
        'https://api.elderscrollslegends.io/v1/cards?pageSize=20'
    );
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + document.documentElement.scrollTop !==
                    document.documentElement.offsetHeight ||
                isFetching
            ) {
                return;
            }
            if (nextUrl) {
                setIsFetching(true);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [nextUrl, isFetching]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(nextUrl);
                res.json().then(res => {
                    setCards([...cards, ...res.cards]);
                    setNext(res._links.next || null);
                    setIsFetching(false);
                });
            } catch (err) {
                setErrors(err);
            }
        }
        if (!isFetching) return;
        fetchData();
    }, [cards, nextUrl, isFetching]);

    if (!cards.length && !hasError) {
        return (
            <ul className="card-list">
                <CardSkeleton count={9} />
            </ul>
        );
    }

    if (hasError) {
        return (
            <span>
                We're unable to fetch Cards at this time, Please try again later
            </span>
        );
    }

    return (
        <ul className="card-list">
            {cards &&
                cards.map(item => {
                    const { id } = item;
                    return (
                        <LazyLoad
                            once={true}
                            key={id}
                            height={600}
                            placeholder={<CardSkeleton count={1} />}
                        >
                            <Card info={item} />
                        </LazyLoad>
                    );
                })}
        </ul>
    );
};

export default CardContainer;

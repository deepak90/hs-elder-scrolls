import React, { useState, useEffect } from 'react';
import Card from './Card';
import CardSkeleton from './CardSkeleton';
import { forceCheck } from 'react-lazyload';

import '../css/card-container.css';

const CardContainer = () => {
    const baseUrl = 'https://api.elderscrollslegends.io/v1/cards?pageSize=20';
    const [hasError, setErrors] = useState(false);
    const [cards, setCards] = useState([]);
    const [nextUrl, setNext] = useState(baseUrl);
    const [isFetching, setIsFetching] = useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleChange = event => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            resetData();
        }
    };

    async function resetData() {
        try {
            const res = await fetch(baseUrl);
            res.json().then(res => {
                setCards([...res.cards]);
                setNext((res._links && res._links.next) || null);
                setIsFetching(false);
                forceCheck();
            });
        } catch (err) {
            setErrors(err);
        }
    }

    async function fetchData(searchTerm = '') {
        try {
            const url = searchTerm ? `${baseUrl}&name=${searchTerm}` : nextUrl;
            const res = await fetch(url);
            res.json().then(res => {
                searchTerm
                    ? setCards([...res.cards])
                    : setCards([...cards, ...res.cards]);
                setNext((res._links && res._links.next) || null);
                setIsFetching(false);
                if (searchTerm) {
                    forceCheck();
                }
            });
        } catch (err) {
            setErrors(err);
        }
    }

    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + document.documentElement.scrollTop <=
                    document.documentElement.offsetHeight - 300 ||
                isFetching
            ) {
                return;
            }
            if (nextUrl && !searchTerm) {
                setIsFetching(true);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching]);

    useEffect(() => {
        if (!isFetching) return;
        fetchData();
    }, [isFetching]);

    useEffect(() => {
        if (!searchTerm) return;
        fetchData(searchTerm);
    }, [searchTerm]);

    if (hasError) {
        return (
            <span>
                We're unable to fetch Cards at this time, Please try again later
            </span>
        );
    }

    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            {!cards.length && !hasError ? (
                <ul className="card-list">
                    <CardSkeleton count={9} />
                </ul>
            ) : (
                <ul className="card-list">
                    {cards &&
                        cards.map(item => {
                            const { id } = item;
                            return <Card key={id} info={item} />;
                        })}
                    {isFetching && <CardSkeleton count={5} />}
                </ul>
            )}
        </React.Fragment>
    );
};

export default CardContainer;

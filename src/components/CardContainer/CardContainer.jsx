import React, { useState, useEffect } from 'react';
import { forceCheck } from 'react-lazyload';

import Card from '../Card/Card';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import ErrorCard from '../ErrorCard/ErrorCard';
import StickyHeader from '../StickyHeader/StickyHeader';

import './card-container.css';

const CardContainer = () => {
    //Setting up initial states
    const baseUrl = 'https://api.elderscrollslegends.io/v1/cards?pageSize=20';
    const [hasError, setErrors] = useState(false);
    const [cards, setCards] = useState([]);
    const [nextUrl, setNext] = useState(baseUrl);
    const [isFetching, setIsFetching] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [noResults, setNoResults] = useState(false);

    // Fires when search-input is interacted with
    const handleChange = event => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            resetData();
        }
    };

    // Resets cards to initial state when fired
    async function resetData() {
        try {
            const res = await fetch(baseUrl);
            if (res.ok) {
                res.json().then(res => {
                    setCards([...res.cards]);
                    setNext((res._links && res._links.next) || null);
                    setIsFetching(false);
                    setSearchTerm('');
                    setNoResults(false);
                    forceCheck();
                });
            } else {
                throw Error('Non 200 response recieved from API');
            }
        } catch (err) {
            setErrors(err);
        }
    }

    // Fetches data from the elder scrolls api, sets states accordingly
    async function fetchData(searchTerm = '') {
        try {
            const url = searchTerm ? `${baseUrl}&name=${searchTerm}` : nextUrl;
            const res = await fetch(url);
            if (res.ok) {
                res.json().then(res => {
                    if (searchTerm) {
                        if (res.cards && res.cards.length) {
                            setCards([...res.cards]);
                            setNoResults(false);
                        } else {
                            setNoResults(true);
                        }
                    } else {
                        setCards([...cards, ...res.cards]);
                    }
                    setNext((res._links && res._links.next) || null);
                    setIsFetching(false);
                    if (searchTerm) {
                        forceCheck();
                    }
                });
            } else {
                throw Error('Non 200 response recieved from API');
            }
        } catch (err) {
            setErrors(err);
        }
    }

    // Hook fired when state 'isFetching' or 'nextUrl' changes,
    // sets up a scroll listener to see if user has scrolled past the
    // document.offsetHeight
    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + document.documentElement.scrollTop <=
                    document.documentElement.offsetHeight - 300 ||
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

    // Hook fired when state 'isFetching' changes, fetches initial data and
    // additional data for infinite scrolling
    useEffect(() => {
        if (!isFetching) return;
        fetchData();
    }, [isFetching]);

    // Hook fired when state 'searchTerm' is changed, fetches data according to
    // the search term
    useEffect(() => {
        if (!searchTerm) return;
        fetchData(searchTerm);
    }, [searchTerm]);

    return (
        <React.Fragment>
            <StickyHeader
                noResults={noResults}
                handleChange={handleChange}
                searchTerm={searchTerm}
                resetData={resetData}
            />
            <div className="card-container">
                <ErrorCard hasError={hasError} />
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
            </div>
        </React.Fragment>
    );
};

export default CardContainer;

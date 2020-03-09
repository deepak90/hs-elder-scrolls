import React, { useState, useEffect } from 'react';
import Card from './Card';
import CardSkeleton from './CardSkeleton';
import { forceCheck } from 'react-lazyload';

import '../css/card-container.css';
import NoResults from './NoResults';
import ErrorCard from './ErrorCard';

const CardContainer = () => {
    const baseUrl = 'https://api.elderscrollslegends.io/v1/cards?pageSize=20';
    const [hasError, setErrors] = useState(false);
    const [cards, setCards] = useState([]);
    const [nextUrl, setNext] = useState(baseUrl);
    const [isFetching, setIsFetching] = useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [noResults, setNoResults] = useState(false);

    const handleChange = event => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            resetData();
        }
    };

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

    useEffect(() => {
        if (!isFetching) return;
        fetchData();
    }, [isFetching]);

    useEffect(() => {
        if (!searchTerm) return;
        fetchData(searchTerm);
    }, [searchTerm]);

    return (
        <React.Fragment>
            <div className="sticky-header">
                <div className="sticky-header-container">
                    <div className="form-group field">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleChange}
                            className="form-field"
                            name="search"
                            id="search"
                        />
                        <label htmlFor="Search" className="form-label">
                            Search
                        </label>
                    </div>
                    <NoResults
                        noResults={noResults}
                        searchTerm={searchTerm}
                        onClickHandler={resetData}
                    />
                    {searchTerm && !noResults && (
                        <div>
                            <p>{`Showing results for "${searchTerm}"`}</p>
                            <span className="btn-link" onClick={resetData}>
                                Clear Filter
                            </span>
                        </div>
                    )}
                </div>
            </div>
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

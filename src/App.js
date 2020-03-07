import React, { useState, useEffect } from 'react';

const App = () => {
    const [hasError, setErrors] = useState(false);
    const [cardData, setCards] = useState([]);

    async function fetchData() {
        const res = await fetch(
            'https://api.elderscrollslegends.io/v1/cards?pageSize=20'
        );
        res.json()
            .then(res => setCards(res))
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const { cards = [] } = cardData;

    if (!cards.length) {
        return <span>Loading...</span>;
    }

    return cards.map(item => {
        const {
            id,
            imageUrl,
            name,
            text,
            type,
            set: { name: setName }
        } = item;
        return (
            <div key={id}>
                <img src={imageUrl} alt={`${name}`} />
                <h2>{name}</h2>
                <p>{text}</p>
                <h3>{type}</h3>
                <h3>{setName}</h3>
            </div>
        );
    });
};

export default App;

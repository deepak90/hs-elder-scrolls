import React from 'react';
import '../css/card.css';

const Card = ({ info }) => {
    const {
        imageUrl,
        name: cardName,
        text: cardDescription,
        type: cardType,
        set: { name: setName }
    } = info;
    return (
        <article className="card">
            <div className="card__media">
                <img src={imageUrl} alt={cardName} />
                <span className="card__category">{setName}</span>
            </div>

            <div className="card__content">
                <header className="card__header">
                    <h2 className="card__title">{cardName}</h2>
                    <div className="card__subtitle">{cardType}</div>
                </header>
                <p className="card__excerpt">{cardDescription}</p>
            </div>
        </article>
    );
};

export default Card;

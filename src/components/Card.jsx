import React from 'react';
import LazyLoad from 'react-lazyload';
import '../css/card.css';

const Card = ({ info }) => {
    const {
        imageUrl,
        name: cardName,
        text: cardDescription,
        type: cardType,
        set: { name: cardSetName }
    } = info;
    return (
        <li className="card">
            <img src={imageUrl} alt={cardName} className="card-image" />
            <h4 className="card-title">{cardName}</h4>
            <div className="card-type">
                <i>{cardType}</i>
            </div>
            <div className="card-set-name">
                <i>{cardSetName}</i>
            </div>
            {cardDescription && (
                <p className="card-description">{cardDescription}</p>
            )}
        </li>
    );
};

export default Card;

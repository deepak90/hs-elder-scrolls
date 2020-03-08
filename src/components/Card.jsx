import React from 'react';
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
            <div className="card-image-container">
                <img src={imageUrl} alt={cardName} className="card-image" />
            </div>
            <div className="card-info-container">
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
            </div>
        </li>
    );
};

export default Card;

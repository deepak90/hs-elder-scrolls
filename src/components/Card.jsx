import React from 'react';
import LazyLoad from 'react-lazyload';
import ImageLoader from './ImageLoader';
import CardSkeleton from './CardSkeleton';

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
        <LazyLoad
            once={true}
            height={600}
            placeholder={<CardSkeleton count={1} />}
        >
            <li className="card">
                <div className="card-image-container">
                    <ImageLoader src={imageUrl} alt={cardName} />
                </div>
                <div className="card-info-container">
                    <h3 className="card-title">{cardName}</h3>
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
        </LazyLoad>
    );
};

export default Card;

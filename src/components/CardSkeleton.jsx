import React from 'react';
import Skeleton from 'react-loading-skeleton';
import '../css/card.css';

const CardSkeleton = ({ count = 1 }) => {
    return Array(count)
        .fill()
        .map((_item, index) => (
            <li className="card" key={index}>
                <div className="card-image-container">
                    <Skeleton height={450} />
                </div>
                <div className="card-info-container">
                    <h4 className="card-title">
                        <Skeleton height={36} width={'60%'} />
                    </h4>
                    <div className="card-type">
                        <Skeleton width={'40%'} />
                    </div>
                    <div className="card-set-name">
                        <Skeleton width={'40%'} />
                    </div>
                    <p className="card-description">
                        <Skeleton height={50} />
                    </p>
                </div>
            </li>
        ));
};

export default CardSkeleton;

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import '../card/card.css';

const CardSkeleton = ({ count = 1 }) => {
    return Array(count)
        .fill()
        .map((_item, index) => (
            <li className="card" key={index}>
                <div className="card-image-container">
                    <Skeleton duration={0.5} height={450} />
                </div>
                <div className="card-info-container">
                    <h4 className="card-title">
                        <Skeleton duration={0.5} height={36} width={'60%'} />
                    </h4>
                    <div className="card-type">
                        <Skeleton duration={0.5} width={'40%'} />
                    </div>
                    <div className="card-set-name">
                        <Skeleton duration={0.5} width={'40%'} />
                    </div>
                    <p className="card-description">
                        <Skeleton duration={0.5} height={50} />
                    </p>
                </div>
            </li>
        ));
};

export default CardSkeleton;

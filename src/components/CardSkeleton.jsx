import React from 'react';
import Skeleton from 'react-loading-skeleton';
import '../css/card.css';

const CardSkeleton = () => {
    return (
        <section>
            <ul className="list">
                {Array(9)
                    .fill()
                    .map((_item, index) => (
                        <li className="card" key={index}>
                            <Skeleton height={400} />

                            <h4 className="card-title">
                                <Skeleton height={36} />
                            </h4>
                            <div className="card-type">
                                <Skeleton />
                            </div>
                            <div className="card-set-name">
                                <Skeleton />
                            </div>
                            <p className="card-description">
                                <Skeleton />
                            </p>
                        </li>
                    ))}
            </ul>
        </section>
    );
};

export default CardSkeleton;

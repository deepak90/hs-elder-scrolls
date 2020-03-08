import React from 'react';

const NoResults = ({ noResults = false, searchTerm, onClickHandler }) => {
    return (
        noResults && (
            <div>
                <p>{`No Results found for "${searchTerm}"`}</p>
                <span className="btn-link" onClick={onClickHandler}>
                    {' '}
                    Click here to Reset{' '}
                </span>
            </div>
        )
    );
};

export default NoResults;

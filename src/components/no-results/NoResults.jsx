import React from 'react';

const NoResults = ({ noResults = false, searchTerm, onClickHandler }) => {
    return (
        noResults && (
            <div>
                <p>{`No Results found for "${searchTerm}"`}</p>
                <span className="btn-link" onClick={onClickHandler}>
                    Clear Filter
                </span>
            </div>
        )
    );
};

export default NoResults;

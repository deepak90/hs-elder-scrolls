import React from 'react';
import NoResults from '../NoResults/NoResults';
import './sticky-header.css';
import SearchInput from '../SearchInput/SearchInput';

const StickyHeader = ({ noResults, searchTerm, handleChange, resetData }) => {
    return (
        <div className={`sticky-header no-results-${noResults} ${searchTerm ? `isSearching`: ``}`}>
            <div className="sticky-header-container">
                <SearchInput searchTerm={searchTerm} handleChange={handleChange}/>
                <NoResults
                    noResults={noResults}
                    searchTerm={searchTerm}
                    onClickHandler={resetData}
                />
                {searchTerm && !noResults && (
                    <div>
                        <p>{`Showing results for "${searchTerm}"`}</p>
                        <span className="btn-link" onClick={resetData}>
                            Clear Filter
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StickyHeader;

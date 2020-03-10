import React from 'react';
import NoResults from '../no-results/NoResults';
import './sticky-header.css';

const StickyHeader = ({ noResults, searchTerm, handleChange, resetData }) => {
    return (
        <div className={`sticky-header no-results-${noResults}`}>
            <div className="sticky-header-container">
                <div className="form-group field">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleChange}
                        className="form-field"
                        name="search"
                        id="search"
                    />
                    <label htmlFor="Search" className="form-label">
                        Search
                    </label>
                </div>
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

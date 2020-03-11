import React from 'react';
import './search-input.css';

const SearchInput = ({ searchTerm, handleChange }) => {
    return (
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
    );
};

export default SearchInput;

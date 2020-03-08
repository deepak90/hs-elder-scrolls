import React from 'react';
const ErrorCard = ({ hasError }) => {
    return (
        hasError && (
            <span>
                We're unable to fetch Cards at this time, Please try again later
            </span>
        )
    );
};

export default ErrorCard;

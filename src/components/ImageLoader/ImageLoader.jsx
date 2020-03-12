import React, { useState } from 'react';
import './image-loader.css';

const ImageLoader = ({ src: imageSrc, alt: imageAlt, imageClass = '' }) => {
    // Initial states
    const [hasLoaded, setHasLoaded] = useState(false);

    // fired on load of the image - set a state 'hasLoaded' to true to
    // that toggles a class on the image to trigger a load animation
    function onLoad() {
        setHasLoaded(true);
    }

    const imageClasses = `${imageClass} ${
        hasLoaded ? 'img-loaded' : 'img-loading'
    }`;

    return (
        <img
            src={imageSrc}
            className={imageClasses}
            onLoad={onLoad}
            alt={imageAlt}
        />
    );
};

export default ImageLoader;

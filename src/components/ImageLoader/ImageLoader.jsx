import React, { useState } from 'react';
import './image-loader.css';

const ImageLoader = ({ src: imageSrc, alt: imageAlt, imageClass = '' }) => {
    const [hasLoaded, setHasLoaded] = useState(false);

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

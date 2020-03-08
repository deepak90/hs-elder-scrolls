import React, { useState } from 'react';

const ImageLoader = ({ src: imageSrc, alt: imageAlt, imageClass = '' }) => {
    const [hasLoaded, setHasLoaded] = useState(false);

    //image onLoad handler to update state to loaded
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

import React, { useState } from 'react';

const ImageLoader = ({ src, alt, imageClass = '' }) => {
    const [hasLoaded, setHasLoaded] = useState(false);

    //image onLoad handler to update state to loaded
    function onLoad() {
        setHasLoaded(true);
    }

    const imageClasses = `${imageClass} ${
        hasLoaded ? 'img-loaded' : 'img-loading'
    }`;

    return <img src={src} className={imageClasses} onLoad={onLoad} alt={alt} />;
};

export default ImageLoader;

import React, { useState, useEffect, Fragment } from 'react';

import Preview from './HomePreview/HomePreview';
import AboutMe from './About/AboutMe';
import Gallery from './Gallery/Gallery';


const Home = (props) => {
    const { socials } = props;

    return(
        <Fragment>
            <Preview />
            <AboutMe />
            <Gallery />
        </Fragment>
    );
}

export default Home;
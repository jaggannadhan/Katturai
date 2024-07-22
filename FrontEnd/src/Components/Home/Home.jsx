import React, { useState, useEffect, Fragment } from 'react';

import Preview from './HomePreview';
import AboutMe from './AboutMe';
import Gallery from './Gallery';


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
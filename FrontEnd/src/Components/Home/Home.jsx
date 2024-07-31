import React, { useState, useEffect, Fragment } from 'react';

import Preview from './HomePreview';
import AboutMe from './AboutMe';
import Gallery from './Gallery';


const Home = (props) => {
    const { currentUser } = props;
    const { user_info, profile_info } = currentUser || {};


    return(
        <Fragment>
            <Preview  
                tagline={profile_info?.tagline}
                subtext={profile_info?.subtext}
            />
            <AboutMe 
                userInfo={user_info}
                profileInfo={profile_info}
            />
            <Gallery />
        </Fragment>
    );
}

export default Home;
import React, { useRef, Fragment, useEffect } from 'react';
import '../../Styles/Main/Landing1.scss';

import { 
    Container
} from '@material-ui/core';
import { Stack } from '@mui/material';
import Tilt from 'react-parallax-tilt';

import { ParallaxProvider, Parallax } from "react-scroll-parallax";

import landing1 from "../../../public/images/landing/landing1.avif";
import landing2 from "../../../public/images/landing/landing2.avif";
import landing3 from "../../../public/images/landing/landing3.avif"
import downArw from "../../../public/svgs/downArrowWhite.svg";
import fogLow from "../../../public/images/landing/fogLow.webp";

import card1 from "../../../public/images/cards/card1.avif";
import card2 from "../../../public/images/cards/card2.avif";
import card3 from "../../../public/images/cards/card3.avif";
import card4 from "../../../public/images/cards/card4.avif";
import card5 from "../../../public/images/cards/card5.avif";
import card6 from "../../../public/images/cards/card6.avif";
import card7 from "../../../public/images/cards/card7.avif";


const LandingPage = () => {

    const goToWhoWeR = () => {
        document.querySelector('.who1').scrollIntoView({ behavior: "smooth"});
    }

    const onScroll = () => {
        if(document.getElementById("card1"))
            document.getElementById("card1").style.transform = `translateY(${(window.pageYOffset || 1) * 50}px)`;
    };



    return (
        <div className="landing" onScroll={onScroll}>

                <div className='front-row'>

                    <ParallaxProvider>
                        <Parallax speed={10} className='card'>
                            <div className="card-content" > 
                                {/* <div className='card-overlay'>
                                    <p>
                                        Capture everything from diary entries to notes, calendars, important events, and cherish 'em forever with your loved ones.
                                    </p>
                                </div> */}
                            </div> 
                        </Parallax>

                        <Parallax speed={0} className='card'>
                            <div className="card-content" > 
                                {/* <div className='card-overlay'>
                                    <p>
                                        Got some T, pour it here! Don't we all love some annonymous gossip?
                                    </p>
                                </div> */}
                            </div> 
                        </Parallax>


                        <Parallax speed={-10} className='card'>
                            <div className="card-content"> 
                                {/* <div className='card-overlay'>
                                    <p>
                                        Explore and showcase your passions—whether photography, cooking, travel, or DIY—and inspire others along the way!
                                    </p>
                                </div> */}
                            </div>
                        </Parallax>
                    </ParallaxProvider>
                    
                </div>
        </div>
    )
}

export default LandingPage;
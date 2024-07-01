import React, { useState, useEffect, Fragment } from 'react';
import { 
    Container
} from '@material-ui/core';

import { Stack } from '@mui/material';
import Tilt from 'react-parallax-tilt';

import '../../Styles/Main/LandingPage.scss';

import downArw from "../../../public/svgs/downArrowWhite.svg";
import fogLow from "../../../public/images/landing/fogLow.webp";
import landing1 from "../../../public/images/landing/landing11.avif";
import wall from "../../../public/images/landing/wall1.avif";

import card1 from "../../../public/images/cards/card1.avif";
import card2 from "../../../public/images/cards/card2.avif";
import card3 from "../../../public/images/cards/card3.avif";
import card4 from "../../../public/images/cards/card4.avif";
import card5 from "../../../public/images/cards/card5.avif";


const LandingPage = (props) => { 

    const goToWhoWeR = () => {
        document.querySelector('.who-we-are').scrollIntoView({ behavior: "smooth"});
    }

    return (
        <section className="landing">

            <Container id='title-cont' style={{background: `url(${landing1}) center no-repeat`}}>
                <section className='overlay'></section>
                <img className='overlay2' src={fogLow} alt="" />
                <section className='title-sec' >
                    <span className='title'>Raconteur.<br/>
                        <span>Every life becomes a story worth sharing! </span>
                    </span>
                    
                    <span>
                        <img src={downArw} alt="Scroll V" onClick={goToWhoWeR}/>
                    </span>
                </section>
            </Container>

            <Container className='who-we-are' style={{background: `url(${wall}) center no-repeat`}}>
                <div className='overlay'></div>
                <div className='what-is'>
                    <h1>What is 
                        <span className='title'> Raconteur.</span> ?
                    </h1>

                    <Stack direction="row" spacing={2} justifyContent="end">
                        <p>We capture the essence of your personal and professional journeys, allowing you to chronicle unique narratives. </p>
                        <p>Whether for private reflection or public inspiration, we empower you to curate and showcase the moments that matter. </p>
                    </Stack>
                    
                </div>
            </Container>


            <Container className='who-we-are who2'>
                <div className='what-is'>
                    <h1>What  <span className='title'> Else.</span> ?</h1>

                    <Stack direction="row" spacing={2} justifyContent="end">
                        <p>From cherished memories to career milestones, our platform celebrates diversity in storytelling, offering a personalized space to document and immortalize life's most meaningful chapters. </p>
                        <p>Join us in shaping legacies and connecting through the power of personal narrative with  <span className='title'> Raconteur.</span></p>
                    </Stack>
                    
                </div>
            </Container>

            <Container className='who-we-are who3'>
                <div className='frnt-row'>
                    <Tilt tiltReverse className="card">
                        <div className="card-content" style={{background: `url(${card1}) center no-repeat`}}> 
                            <div className='card-overlay'>
                                <p>
                                    Capture everything from diary entries to notes, calendars, important events, and cherish 'em forever with your loved ones.
                                </p>
                            </div>
                        </div> 

                    </Tilt>
                    
                    <Tilt tiltReverse className="card">
                        <div className="card-content" style={{background: `url(${card2}) center no-repeat`}}> 
                            <div className='card-overlay'>
                                <p>
                                    Capture everything from diary entries to notes, calendars, important events, and cherish 'em forever with your loved ones.
                                </p>
                            </div>
                        </div> 
                    </Tilt>

                    <Tilt tiltReverse className="card">
                        <div className="card-content" style={{background: `url(${card3}) center no-repeat`}}> 
                            <div className='card-overlay'>
                                <p>
                                    Capture everything from diary entries to notes, calendars, important events, and cherish 'em forever with your loved ones.
                                </p>
                            </div>
                        </div> 
                    </Tilt>

                    <Tilt tiltReverse className="card">
                        <div className="card-content" style={{background: `url(${card4}) center no-repeat`}}> 
                            <div className='card-overlay'>
                                <p>
                                    Capture everything from diary entries to notes, calendars, important events, and cherish 'em forever with your loved ones.
                                </p>
                            </div>
                        </div> 
                    </Tilt>

                    <Tilt tiltReverse className="card">
                        <div className="card-content" style={{background: `url(${card5}) center no-repeat`}}> 
                            <div className='card-overlay'>
                                <p>
                                    Capture everything from diary entries to notes, calendars, important events, and cherish 'em forever with your loved ones.
                                </p>
                            </div>
                        </div> 
                    </Tilt>
                </div>
                
            </Container>



        </section>
    )
}

export default LandingPage;
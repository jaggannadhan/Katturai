import React, { useState, useEffect, Fragment } from 'react';
import { Container } from '@material-ui/core';

import '../../Styles/Main/LandingPage.scss';

import downArw from "../../../public/svgs/downArrowWhite.svg";
import fogLow from "../../../public/images/landing/fogLow.webp";
import landing1 from "../../../public/images/landing/landing11.avif";
import wall from "../../../public/images/landing/wall.webp";


const LandingPage = (props) => { 

    const goToWhoWeR = () => {
        document.querySelector('.who1').scrollIntoView({ behavior: "smooth"});
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

            <Container className='who-we-are who1'>
                <section className='descriptive-sec ds1' /* style={{background: `url(${wall}) center no-repeat`}} */ >
                    <header className='sec-headers'>
                        <div>
                            <dots>J</dots>
                            <dots>4</dots>
                            <dots>N</dots>
                        </div>
                        
                    </header>
                    <h1>What is <span className='what-is-title'> Raconteur</span> ?</h1>
                </section>
            </Container>

            <Container className='who-we-are who2'>
                <section className='descriptive-sec ds2' /* style={{background: `url(${wall}) center no-repeat`}} */>
                    <header className='sec-headers'>
                        <div>
                            <dots>J</dots>
                            <dots>4</dots>
                            <dots>N</dots>
                        </div>
                        
                    </header>

                    <p>We help you capture the essence of your personal and professional journeys, allowing you to chronicle and preserve unique narratives.</p>
                    <p>Whether for private reflection or public inspiration, Raconteur empowers you to curate and showcase the moments that define you. </p>
                </section>
            </Container>

            <Container className='who-we-are who3'>
                <section className='descriptive-sec ds3' /* style={{background: `url(${wall}) center no-repeat`}} */>
                    <header className='sec-headers'>
                        <div>
                            <dots>J</dots>
                            <dots>4</dots>
                            <dots>N</dots>
                        </div>
                        
                    </header>

                    <p>From cherished memories to career milestones, our platform celebrates diversity in storytelling, offering a personalized space to document and immortalize life's most meaningful chapters. </p>
                    <p>Join us in shaping legacies and connecting through the power of personal narrative with Raconteur.</p>
                </section>
            </Container>

            <Container className='what-we-do'>
                <section className='descriptive-sec ds2' >
                    <header className='sec-headers'>
                        <div>
                            <dots>J</dots>
                            <dots>4</dots>
                            <dots>N</dots>
                        </div>
                    </header>

                    {/* <h1>What is <span className='what-is-title'> Raconteur</span> ?</h1>

                    <p>Welcome to Raconteur, where every life becomes a story worth sharing! 
                        We help you capture the essence of your personal and professional journeys, allowing you to chronicle and preserve unique narratives. 
                        Whether for private reflection or public inspiration, Raconteur empowers you to curate and showcase the moments that define you. 
                        From cherished memories to career milestones, our platform celebrates diversity in storytelling, offering a personalized space to document and immortalize life's most meaningful chapters. 
                        Join us in shaping legacies and connecting through the power of personal narrative with Raconteur.
                    </p> */}
                </section>
            </Container>



        </section>
    )
}

export default LandingPage;
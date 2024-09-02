import React, { useState, useEffect, Fragment } from 'react';
import Tilt from 'react-parallax-tilt';

import IntroAnimation from './IntroAnimation';
import '../../Styles/Main/LandingPage.scss';

import landing from "../../../public/images/landing/landing1.avif";

import card1 from "../../../public/images/cards/card1.avif";
import card3 from "../../../public/images/cards/card2.avif";
import card4 from "../../../public/images/cards/card3.avif";
import card5 from "../../../public/images/cards/card4.avif";
import card7 from "../../../public/images/cards/card5.avif";
import card2 from "../../../public/images/cards/card6.avif";
import card6 from "../../../public/images/cards/card7.avif";


const LandingPage = (props) => { 

    return (
        <div className="landing" style={{background: `url(${landing}) center no-repeat`}} >

            {/* <IntroAnimation /> */}

            <section className='main-landing'>  
                <section className='left'>
                    <header className='main-title'>Katturai.</header>
                    <div className='main-sub'>
                        <p className='sub-big'>It's the season of stories!</p>

                        <p className='sub-mid'>
                            Good stories are alway amusing and we delight in sharing 'em captivating tales. <br/> <br/>
                            Whether for private reflection, public inspiration or just entertaiment. Join us in crafting extraordinary narratives that leave a lasting impact.
                        </p>
                    </div>
                </section>

                <section className='right'>
                    <div className='right-row'>
                        <Tilt className="card big" style={{background: `url(${card1}) center no-repeat`}} 
                            tiltReverse tiltMaxAngleX={5} tiltMaxAngleY={5}
                        >
                            <div className="card-content" > 
                                <div className='card-overlay'>
                                    <p>
                                        Capture everything from diary entries to notes, calendars, important events, and cherish 'em forever with your loved ones.
                                    </p>
                                </div>
                            </div> 
                        </Tilt>

                        <Tilt className="card small" style={{background: `url(${card2}) center no-repeat`}} 
                            tiltReverse tiltMaxAngleX={5} tiltMaxAngleY={5}
                        >
                            <div className="card-content" > 
                                <div className='card-overlay'>
                                    <p>
                                        Got some T, pour it here! Don't we all love some annonymous gossip?
                                    </p>
                                </div>
                            </div> 
                        </Tilt>
                    </div>
                    
                    <div className='right-row'>
                        <Tilt className="card small" style={{background: `url(${card3}) center no-repeat`}} 
                            tiltReverse tiltMaxAngleX={5} tiltMaxAngleY={5}
                        >
                            <div className="card-content"> 
                                <div className='card-overlay'>
                                    <p>
                                        Explore and showcase your passion—whether photography, cooking, travel, or DIY—and inspire others along the way!
                                    </p>
                                </div>
                            </div>
                        </Tilt>

                        <Tilt className="card big" style={{background: `url(${card4}) center no-repeat`}} 
                            tiltReverse tiltMaxAngleX={5} tiltMaxAngleY={5}
                        >
                            <div className="card-content"> 
                                <div className='card-overlay'>
                                    <p>
                                        Craft an exceptional PORTFOLIO that showcases your professional work and captivates recruiters. Exhibit Exemplary!
                                    </p>
                                </div>
                            </div> 
                        </Tilt>
                    </div>
                    

                    <div className='right-row'>
                        <Tilt className="card big" style={{background: `url(${card5}) center no-repeat`}} 
                            tiltReverse tiltMaxAngleX={5} tiltMaxAngleY={5}
                        >
                            <div className="card-content" > 
                                <div className='card-overlay'>
                                    <p>
                                        Make your voice heard—whether it's social, political, or personal, your opinions matter here.
                                    </p>
                                </div>
                            </div>
                        </Tilt>

                        <Tilt className="card small" style={{background: `url(${card6}) center no-repeat`}} 
                            tiltReverse tiltMaxAngleX={5} tiltMaxAngleY={5}
                        >
                            <div className="card-content" > 
                                <div className='card-overlay'>
                                    <p>
                                        Thinkers may not be doers, just do it! This can be your personal blog.
                                    </p>
                                </div>
                            </div> 
                        </Tilt>

                    </div>
                    

                    <Tilt className="card thin" style={{background: `url(${card7}) center no-repeat`}}
                        tiltReverse tiltMaxAngleX={5} tiltMaxAngleY={5}
                    >
                        <div className="card-content" > 
                            <div className='card-overlay'>
                                <p>
                                    Track your journey, from where you began to where you stand now—grow, reminisce, and discover yourself along the way.
                                </p>
                            </div>
                        </div> 
                    </Tilt>

                </section>
            </section>

            <div className='anchor-details'>
                <p onClick={() => window.location = "./signin"}>Let's go!</p>
                <p onClick={() => window.location = "./jegsirox/portfolio"}>Author</p>
            </div>



            {/* <div style={{backgroundImage: `url(${landing2}) `}} className='landing1'></div>
            <div style={{height: "50vh", background: "#f8deac"}}></div>
            <div style={{backgroundImage: `url(${wall2}) `}} className='landing2'></div> */}
        </div> 
    )
}

export default LandingPage;
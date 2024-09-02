import React, { useState, useEffect, Fragment } from 'react';

import '../../Styles/Main/IntroAnimation.scss';
import introGossip from "../../../public/images/landing/introGossip.gif";

const IntroAnimation = (props) => { 

    return (
        <section id="intro">
            <div id="intro-overlay-img" style={{backgroundImage: `url(${introGossip}) `}}></div>

            <div id="intro-strips">
                <section className="strip">
                    <div className="strip-ylw"></div>
                    <div className="strip-noc"></div>
                </section>
                <section className="strip">
                    <div className="strip-ylw"></div>
                    <div className="strip-noc"></div>
                </section>
                <section className="strip">
                    <div className="strip-ylw"></div>
                    <div className="strip-noc"></div>
                </section>
                <section className="strip">
                    <div className="strip-ylw"></div>
                    <div className="strip-noc"></div>
                </section>
                <section className="strip">
                    <div className="strip-ylw"></div>
                    <div className="strip-noc"></div>
                </section>
            </div>


            <p className="title-intro logo">Katturai</p>
            <p className="title-intro tag">Where stories never end</p>
        </section>
    )
}

export default IntroAnimation;
import React, { useState, useEffect, Fragment } from "react";
import { 
    Container,
    Link,
    Stack
  } from '@mui/material';
import { ReactTyped } from "react-typed";

import "../../Styles/Portfolio/PortPreview.scss";
import * as CONSTANTS from "../../Constants/Constants";
import myProfilePic from "../../../public/images/myProfileYlw.png";
import codingGif from "../../../public/images/coding.webp";


const PortPreview = (props) => {
    return (
        <Container className="port-cont"> 
            <section className="portfolio">
                <div className="port-content">

                    <h3>Ola, It's Me</h3>
                    <h1>Jaggannadhan Venugopal</h1>
                    
                    <h3 className="port-title">I'm a 
                        <span> 
                            <ReactTyped 
                                strings={[" Software Engineer", " Blogger", " Martial Artist"]} 
                                typeSpeed={100} 
                                backSpeed={100}
                                backDelay={1000}
                                loop
                            />
                        </span>
                    </h3>
                    <p>
                        From algorithms to user interfaces, I engineer robust software ecosystems that elevate user experiences and exceed expectations.
                    </p>

                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" className='port-socials'> 
                        {CONSTANTS.socials.map((network) => (
                            <Link
                                display="block"
                                variant="body1"
                                href={network.link}
                                key={network.name}
                                sx={{ mb: 0.5 }}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <network.icon className="svg_icons" /> 
                            </Link>
                        ))}
                    </Stack>

                    <div className="download-resume">
                        Download Resume
                    </div>
                </div>
                <div className="port-img">
                    <img src={myProfilePic} alt="jagan" className="prot-profile-pic"/>
                    {/* <img src={codingGif} alt="jagan" className="prot-profile-pic" /> */}
                    
                </div>
            </section>
            </Container>        
    );
}

export default PortPreview;
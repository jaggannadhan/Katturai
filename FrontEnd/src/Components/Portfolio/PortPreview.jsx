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

import protein from "../../../public/images/protein-shake.png";
import coffee from "../../../public/images/coffee-cup.png";
import lipstick from "../../../public/images/lipstick.png";


const PortPreview = (props) => {
    const { currentUser } = props;
    const { user_info, portfolio_info, profile_info } = currentUser || {};
    const { name } = user_info || {};
    const { greetings, description, titles, resume, skills } = portfolio_info || {};

    const [ showQR, setShowQR ] = useState(false);

    return (
        <Container className="port-cont"> 
            <section className="portfolio">
                <div className="port-content">

                    <h3>{greetings || "Hey! How are you?"}</h3>
                    <h1>{name}</h1>
                    
                    <h3 className="port-title">{titles ? "I'm a" : "I'm an"}
                        <span> 
                            <ReactTyped 
                                strings={titles || ['Extrordianary Person']} 
                                typeSpeed={100} 
                                backSpeed={100}
                                backDelay={1000}
                                loop
                            />
                        </span>
                    </h3>
                    <p>
                        {description}
                    </p>

                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" className='port-socials'> 
                        {CONSTANTS.socials.map((network) => {
                            let userLink = profile_info?.[network.name];
                            return (
                                userLink ?
                                <Link
                                    display="block"
                                    variant="body1"
                                    href={userLink || "#"}
                                    key={network.name}
                                    sx={{ mb: 0.5 }}
                                    target={userLink ? "_blank" : ""}
                                    rel="noreferrer"
                                >
                                    <network.icon className="svg_icons" /> 
                                </Link> : ""
                            )
                        })}
                    </Stack>

                    <section className="port-btns-sec1">
                        <div className="buy-me"> 
                            <p>Buy me</p>
                            <img className="shaker-btl" src={protein} onClick={() => setShowQR(true)} />

                            {   
                                showQR ? 
                                <div className="overlay" onClick={() => setShowQR(false)}>
                                    <img className="qr-code" 
                                        src="https://miro.medium.com/v2/resize:fit:789/1*A9YcoX1YxBUsTg7p-P6GBQ.png"
                                    />
                                </div> : ""
                            }
                        </div>
                        {
                            resume ? 
                            <div className="view-resume">
                                <Link
                                    display="block"
                                    variant="body1"
                                    href={resume}
                                    sx={{ mb: 0.5 }}
                                    target={"_blank"}
                                    rel="noreferrer"
                                >
                                    Resume
                                </Link>
                            </div> : ""
                        }
                    </section>
                    
                    

                </div>
                <div className="port-img">
                    <img src={myProfilePic} alt="jagan" className="prot-profile-pic"/>                    
                </div>
            </section>
            </Container>        
    );
}

export default PortPreview;
import React, { useState, useEffect, Fragment } from "react";
import { 
    Container,
    Link,
    Stack
  } from '@mui/material';
import { ReactTyped } from "react-typed";

import "../../Styles/Portfolio/PortPreview.scss";
import * as CONSTANTS from "../../Constants/Constants";


const PortPreview = (props) => {
    const { currentUser } = props;
    const { user_info, portfolio_info, profile_info } = currentUser || {};
    const { name, picture: user_pic } = user_info || {};
    const { greetings, description, titles, resume, buy_me_something, picture: port_pic } = portfolio_info || {};
    const picture = port_pic || user_pic;

    return (
        <Container className="port-preview-cont"> 
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

                        {
                            buy_me_something?.[0] ? 
                            <div className="buy-me"> 
                                <Link
                                    display="block"
                                    variant="body1"
                                    href={buy_me_something[1]}
                                    sx={{ mb: 0.5 }}
                                    target={"_blank"}
                                    rel="noreferrer"
                                >
                                    Buy me  
                                    <img className="shaker-btl" 
                                        src={getBuyMeIcon(buy_me_something[0])} 
                                    />
                                </Link>
                            </div> : ""
                        }
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
                    <img src={picture} alt={name} className="prot-profile-pic"/>                    
                </div>
            </section>
            </Container>        
    );
}

const getBuyMeIcon = (wish) => {
    let icon = CONSTANTS.buyMeItems.reduce((icon, item) => {
        if(item.name == wish) icon = item.icon;

        return icon;
    }, CONSTANTS.buyMeItems[0].icon);

    return icon
}

export default PortPreview;
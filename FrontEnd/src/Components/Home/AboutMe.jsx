import React from 'react';
import { Typography } from '@material-ui/core';
import { Stack, Avatar, Link } from '@mui/material';
import * as CONSTANTS from "../../Constants/Constants";

import '../../Styles/Home/AboutMe.scss';
import myProfile from "../../../public/images/myProfile.png";

const AboutMe = (props) => {
    const { userInfo, profileInfo } = props;
    const { name, picture } = userInfo || {};
    const { title, epigraph } = profileInfo || {};

    return (
        <div className="about-me">
            <div className="avatar-container">
                <Avatar className="avatar" src={picture} alt={name} />
            </div>
            
            <div className="content">
                <Typography variant="h4" className="about-name">{name}</Typography>
                <Typography variant="h6" className="about-title">{title}</Typography>

                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" className='about-socials'> 
                    {CONSTANTS.socials.map((network) =>  {
                        let userLink = profileInfo?.[network.name];
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


                <Typography variant="h6" className="about-content">
                    {epigraph} <br />
                </Typography>
                {
                    epigraph ? 
                    <Typography variant="h6" className="about-content content-by">
                        -- That's just me.
                    </Typography> : ""
                }
                
                
            </div>
        </div>
    );
};

export default AboutMe;

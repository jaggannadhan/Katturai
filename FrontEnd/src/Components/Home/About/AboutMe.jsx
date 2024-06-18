import React from 'react';
import { Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import Link from '@mui/material/Link';
import * as CONSTANTS from "../../../Constants/Constants";

import '../../../Styles/Home/About/AboutMe.scss';
import myProfile from "../../../../public/images/myProfile.png";

const AboutMe = (props) => {
    const { socials, description } = props;
    return (
        <div className="about-me">
            <div className="avatar-container">
                <img className="avatar" src={myProfile} alt="Avatar" />
            </div>
            
            <div className="content">
                <Typography variant="h4" className="about-name">Jaggannadhan Venugopal</Typography>
                <Typography variant="h6" className="about-title">Software Engineer, MS Computer Science</Typography>

                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" className='about-socials'> 
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


                <Typography variant="h6" className="about-content">
                    Happiness can be a state of mind when you realize<br />
                    there is no better time or way to live and <br />
                    when this realization strikes, sharpen you brain and brawn, for only a <br />
                    strong body and a healthy mind can sustain the epiphany.<br />
                    Live Fluid, Train Hard! <br />
                </Typography>
                <Typography variant="h6" className="about-content content-by">
                    -- That's just me.
                </Typography>
                
            </div>
        </div>
    );
};

export default AboutMe;

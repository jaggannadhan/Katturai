import * as React from 'react';
// import PropTypes from 'prop-types';
import { 
  Box,
  Container,
  Typography,
  Link,
  Stack
} from '@mui/material';

import "../../Styles/Footer/Footer.scss";

import HomeFooterImg from "../../../public/images/footer/bg10.jpeg";
import DiaryFooterImg from "../../../public/images/footer/cleanWaters.gif";
import TravelFooterImg from "../../../public/images/footer/northEndBoston.jpeg";
import PortfolioFooterImg from "../../../public/images/footer/northEndBoston.jpeg";


import valleyWhite from "../../../public/svgs/valleyWhite.svg";

import * as CONSTANTS from "../../Constants/Constants";

function Copyright() {
  return (
    <Typography sx={{color:"white"}} className="copyright">
      {'© '}
      <Link color="inherit" href=".">
        Raconteur.
      </Link>{' '}
      {" All rights reserved "}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer(props) {
  const { selectedNav, description } = props;
  const bgImg = {
    "Home": HomeFooterImg,
    "Diary": DiaryFooterImg,
    "Travel": TravelFooterImg,
    "Portfolio": PortfolioFooterImg
  } 

  return (
        <React.Fragment>
        <Box component="footer" sx={{py: 6, background: `url( ${bgImg[selectedNav?.name || "Home"]} ) no-repeat center`, backgroundSize: "cover"}} className='ldlz footer'>
            <div className="edge-mask">
                <div className="ldlz" style={{opacity: 1, visibility: "visible", backgroundImage: `url(${valleyWhite})`, dataSrc:{bgImg}}}></div>
            </div>
            
            <Container className='footer-container'>
               <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <Typography 
                    variant="h6" 
                    align="center" 
                    gutterBottom 
                    component="a"
                    href="." 
                    className="navbar-title"
                  >
                      Raconteur
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" className='footer-socials'> 
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
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    {description}
                </Typography>
            </Container>
        </Box>
        <div className='copy'><Copyright /></div>
        </React.Fragment>
  );
}

// Footer.propTypes = {
//   description: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
// };

export default Footer;
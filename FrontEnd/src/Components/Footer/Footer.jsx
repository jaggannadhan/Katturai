import * as React from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import "../../Styles/Footer/Footer.scss";
import starrySky from "../../../public/svgs/starrySky.svg";
import bg10 from "../../../public/images/bg10.jpeg";
import valleyWhite from "../../../public/svgs/valleyWhite.svg";

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
  const { socials, description } = props;

  return (
        <React.Fragment>
        <Box component="footer" sx={{py: 6, background: `url( ${bg10} ) no-repeat center`, backgroundSize: "cover"}} className='ldlz footer'>
            <div className="edge-mask">
                <div className="ldlz" style={{opacity: 1, visibility: "visible", backgroundImage: `url(${valleyWhite})`, dataSrc:{valleyWhite}}}></div>
            </div>
            
            <Container className='footer-container'>
                <Typography variant="h6" align="center" gutterBottom className="navbar-title">
                    Raconteur
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" className='footer-socials'> 
                    {socials.map((network) => (
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
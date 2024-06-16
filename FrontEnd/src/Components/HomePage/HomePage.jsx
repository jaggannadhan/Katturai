import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import NavBar from '../NavBar/NavBar';
import ResponsiveAppBar from "../NavBar/ResponsiveNavBar"
import Preview from '../Preview/Preview';
import AboutMe from '../About/AboutMe';
import Gallery from '../Gallery/Gallery';
import Footer from '../Footer/Footer';


import '../../Styles/HomePage/HomePage.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh', // Ensure full viewport height
    }
}));

const socials = [
    { name: 'GitHub', icon: GitHubIcon, link: "https://github.com/jaggannadhan" },
    { name: 'YouTube', icon: YouTubeIcon, link: "https://www.youtube.com/@jegsirox3674"  },
    { name: 'IG', icon: InstagramIcon, link: "https://www.instagram.com/jagg4n/"  },
    { name: 'Linkedin', icon: LinkedInIcon, link: "https://www.linkedin.com/in/jvenu94/"  },
]


const HomePage = () => {
    const classes = useStyles();
    const [isNavTrans, setIsNavTrans] = useState(document.body.scrollTop < (document.body.scrollHeight/10));

    useEffect(() => {
        const handleScroll = () => {
            setIsNavTrans(document.body.scrollTop < (document.body.scrollHeight/10));
        };
        handleScroll();
        document.body.addEventListener('scroll', handleScroll);
    }, []);
    

    return (
        <div className={`home-page ${classes.root}`}>
            <ResponsiveAppBar 
                isNavTrans={isNavTrans}
                socials={socials}
            />
            <Preview />
            <AboutMe socials={socials} />
            <Gallery />
            <Footer socials={socials} />
        </div>
    );
};

export default HomePage;

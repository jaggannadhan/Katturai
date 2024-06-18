import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ResponsiveAppBar from "../NavBar/ResponsiveNavBar";
import Footer from '../Footer/Footer';
import * as CONSTANTS from "../../Constants/Constants";


import '../../Styles/MainPage/MainPage.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh', // Ensure full viewport height
    }
}));


const MainPage = () => {
    const classes = useStyles();
    const [ isNavTrans, setIsNavTrans ] = useState(document.body.scrollTop < (document.body.scrollHeight/10));
    const [ selectedNav, setSelectedNav ] = useState(CONSTANTS.navigation.default);

    useEffect(() => {
        const handleScroll = () => {
            setIsNavTrans(document.body.scrollTop < (document.body.scrollHeight/10));
        };
        handleScroll();
        document.body.addEventListener('scroll', handleScroll);
    }, []);

    function handleNavSelect(navItem) {
        setSelectedNav(navItem);
    }
    
    const Content = selectedNav.component();

    return (
        <div className={`home-page ${classes.root}`}>
            <ResponsiveAppBar 
                isNavTrans={isNavTrans}
                handleNavSelect={handleNavSelect}
            />
            
            <Content />
            
            <Footer />
        </div>
    );
};

export default MainPage;

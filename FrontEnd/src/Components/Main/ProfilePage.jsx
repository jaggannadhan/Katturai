import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ResponsiveAppBar from "../NavBar/ResponsiveNavBar";
import Footer from '../Footer/Footer';
import * as CONSTANTS from "../../Constants/Constants";
import * as APIS from "../../Apis/userApis";


import '../../Styles/Main/ProfilePage.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh', // Ensure full viewport height
    }
}));


const ProfilePage = () => {
    const classes = useStyles();
    const [ isNavTrans, setIsNavTrans ] = useState(document.body.scrollTop < (document.body.scrollHeight/10));
    // const [ selectedNav, setSelectedNav ] = useState(CONSTANTS.navigation.navItems[2]);
    const [ selectedNav, setSelectedNav ] = useState(CONSTANTS.navigation.default);
    const [ currentUser, setCurrentUser ] = useState({});

    useEffect(() => {
        const getCurrentUser = async () => {
            const currentUser = await APIS.getCurrentUser();
            setCurrentUser(currentUser);
        }

        getCurrentUser();
    }, []);

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
                currentUser={currentUser}
            />
            
            <Content />
            
            <Footer 
                selectedNav={selectedNav} 
            />
        </div>
    );
};

export default ProfilePage;

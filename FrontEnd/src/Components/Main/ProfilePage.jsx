import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ResponsiveAppBar from "../NavBar/ResponsiveNavBar";
import Footer from '../Footer/Footer';

import * as CONSTANTS from "../../Constants/Constants";
import * as APIS from "../../Apis/userApis";
import { Routes, Route, useParams, useLocation, useNavigate } from "react-router-dom";
import PageNotFound from '../Main/PageNotFound';

import '../../Styles/Main/ProfilePage.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh', // Ensure full viewport height
    }
}));


const ProfilePage = () => {
    const { user_route } = useParams();
    const location = useLocation();
    const { pathname } = location;
    const slug = pathname?.split("/")?.at(-1);
    const navigate = useNavigate();
    
    const classes = useStyles();
    const [ isNavTrans, setIsNavTrans ] = useState(document.body.scrollTop < (document.body.scrollHeight/10));
    const [ selectedNav, setSelectedNav ] = useState(CONSTANTS.navigation.default);
    const [ currentUser, setCurrentUser ] = useState({});


    useEffect(() => {
        const navigateToPage = async () => {
            if(slug==user_route) {
                setSelectedNav(CONSTANTS.navigation.default);
                return;
            }
            const nav = CONSTANTS.navigation.getRouteBasedComponent(slug);
            if(! nav) { navigate(pathname) }
            setSelectedNav(nav);
        }
        navigateToPage();
    }, []);

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
    
    const Content = selectedNav ? selectedNav.component(): null;

    return (
        <div className={`home-page ${classes.root}`}>
            <ResponsiveAppBar 
                isNavTrans={isNavTrans}
                handleNavSelect={handleNavSelect}
                currentUser={currentUser}
                user_route={user_route}
            />
            
            <Routes>
                {
                    selectedNav ?
                    <Route path={`/${selectedNav.route}`} element={ <Content /> } /> :
                    <Route path={`/*`} element={ <PageNotFound /> } />

                }
                
            </Routes>
            
            {/* <Content /> */}
            
            <Footer 
                selectedNav={selectedNav} 
            />
        </div>
    );
};

export default ProfilePage;

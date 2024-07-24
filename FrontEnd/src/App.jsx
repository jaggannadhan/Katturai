import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './Components/Main/LandingPage';
import SignIn from './Components/SignIn/SignIn';
import ProfilePage from './Components/Main/ProfilePage';
import PageNotFound from './Components/Main/PageNotFound';

const App = () => {

    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <LandingPage /> } />
                    <Route path="/signin" element={ <SignIn /> } />
                    <Route path={`/:user_route/*`} element={ <ProfilePage /> } />
                    <Route path="/*" element={ <PageNotFound /> } />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}

export default App;
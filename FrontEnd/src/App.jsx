import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './Components/Main/LandingPage';
import SignIn from './Components/SignIn/SignIn';
import ProfilePage from './Components/Main/ProfilePage';

const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <LandingPage /> } />
                    <Route path="/signin" element={ <SignIn /> } />
                    <Route path="/home" element={ <ProfilePage /> } />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}

export default App;
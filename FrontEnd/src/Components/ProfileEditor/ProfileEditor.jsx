import React, { useState, useEffect, Fragment } from "react";
import { 
    Stack,
    IconButton,
    Avatar
 } from '@mui/material';
 import HourglassTopIcon from '@mui/icons-material/HourglassTop';

import PageEditorLoader from "./ProfileEditorLoader";
import UserInfo from "./UserInfo";
import HomeSettings from "./HomeSettings";
import PortfolioSettings from "./PortflioSettings";

import '../../Styles/ProfileEditor/ProfileEditor.scss';
import { uuid } from "../../Helper/Helper";


const editorNav = [ 
    {name: "User Info", component: UserInfo}, 
    {name: "Profile", component: HomeSettings}, 
    {name: "Portfolio", component: PortfolioSettings} 
];


const ProfileEditor = (props) => {
    const { currentUser } = props;
    const [ selectedNav, setSelectedNav ] = useState(editorNav[0]);
    // console.log(">>>>>>currentUser: ", currentUser);

    const Nav = selectedNav.component;

    return (
        <Fragment>
            {
                currentUser ?
                <Stack direction="row" spacing={2} className="profile-editor">
                    <section className="profile-editor-avatar">
                        <IconButton sx={{ p: 0 }} className="icon-btn">
                            {
                                currentUser ?
                                <Avatar className="avatar" alt={currentUser.name} src={currentUser.picture} /> :
                                <Avatar className="avatar"> 
                                    <HourglassTopIcon className="avatar-loader"/>
                                </Avatar> 
                            }
                        </IconButton>
                    </section>
                    <section className="profile-editor-input">
                        <header className="profile-editor-nav">
                            {
                                editorNav.map((item) => {
                                    return(
                                        <h3 className={`items ${selectedNav.name == item.name ? "selected" : ""}`}
                                            key={uuid()}
                                            onClick={ () => {setSelectedNav(item)} }
                                        >{item.name}
                                        </h3>
                                    )
                                })
                            }
                        </header>

                        <Nav 
                            currentUser={currentUser}
                        />
                    </section>
                    
                </Stack > : <PageEditorLoader/>

            }
        </Fragment>
        
    )
}

export default ProfileEditor;
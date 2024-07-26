import React from "react";
import { 
    Stack,
    IconButton,
    Avatar
 } from '@mui/material';
import '../../Styles/ProfileEditor/ProfileEditorLoader.scss';

const ProfileEditorLoader = (props) => {
    return ( 
        <Stack direction="row" spacing={2} className="profile-editor-loader">
            <section className="profile-editor-loader-avtar">
                <div className="sub-rect pure-background icn-btn animated-background"></div>
            </section>
            <section className="main-item">
                {/* <div className="static-background">
                    <div className="background-masker btn-divide-left"></div>
                </div> */}
                
                <div className="animated-background">
                    <div className="background-masker btn-divide-left"></div>
                </div>
                <br/>
                <div className="animated-background">
                    <div className="background-masker btn-divide-left"></div>
                </div>
                <br/>
                <div className="animated-background">
                    <div className="background-masker"></div>
                </div>

                <br/>
                
                {/* <div className="shared-dom">
                    <div className="sub-rect pure-background"></div>
                    <div className="sub-rect pure-background"></div>
                    <div className="sub-rect pure-background"></div>
                    <div className="sub-rect pure-background"></div>
                    <div className="sub-rect pure-background"></div>
                    <div className="sub-rect pure-background"></div>
                </div> */}
                
                <div className="css-dom"></div>
            </section>
            
        </Stack>
    )
}

export default ProfileEditorLoader;
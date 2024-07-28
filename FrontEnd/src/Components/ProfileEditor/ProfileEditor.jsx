import React, { useState, useEffect, Fragment } from "react";
import { 
    Stack,
    IconButton,
    Avatar
 } from '@mui/material';

 import CancelIcon from '@mui/icons-material/Cancel';

 import HourglassTopIcon from '@mui/icons-material/HourglassTop';

import PageEditorLoader from "./ProfileEditorLoader";
import UserInfo from "./UserInfo";
import ProfileSettings from "./ProfileSettings";
import PortfolioSettings from "./PortflioSettings";

import '../../Styles/ProfileEditor/ProfileEditor.scss';
import { uuid } from "../../Helper/Helper";


const editorNav = [ 
    {name: "User Info", component: UserInfo}, 
    {name: "Profile", component: ProfileSettings}, 
    {name: "Portfolio", component: PortfolioSettings} 
];


const ProfileEditor = (props) => {
    const { currentUser, handleCurrentUserChange } = props;
    const [ userDetails, setUserDetails ] = useState(currentUser?.user_info);
    const [ profileDetails, setProfileDetails ] = useState(currentUser?.profile_info);
    const [ portfolioDetails, setPortfolioDetails ] = useState(currentUser?.portfolio_info);
    const [ selectedNav, setSelectedNav ] = useState(editorNav[0]);

    const [ tempPic, setTempPic ] = useState(null);
    // console.log(">>>>>>currentUser: ", currentUser);

    useEffect(() => {

        setUserDetails(currentUser?.user_info);
        setProfileDetails(currentUser?.profile_info);
        setPortfolioDetails(currentUser?.portfolio_info);
    }, [currentUser])

    const handleChangePicture = (e) => {
        if(tempPic) {
            URL.revokeObjectURL(tempPic);
        }

        let file = e.target.files[0];
        setTempPic(URL.createObjectURL(file));
    }

    const removeTempProfilePic = (e) => {
        URL.revokeObjectURL(tempPic);
        setTempPic(null);
    }

    const uploadTempProfilePic = (e) => {

    }

    const Editor = selectedNav.component;
    return (
        <Fragment>
            {
                currentUser ?
                <Stack direction="row" spacing={2} className="profile-editor">
                    <section className="profile-editor-left">
                        <IconButton sx={{ p: 0 }} className="icon-btn">
                            {
                                userDetails?.picture ?
                                <div>
                                    <Avatar className="avatar" alt={userDetails?.name} src={tempPic || userDetails.picture} /> 

                                    <label htmlFor="avatar-overlay" className="avatar-overlay">Change Picture</label>
                                    <input type="file" id="avatar-overlay" onChange={handleChangePicture} />
                                </div>  :
                                <Avatar className="avatar"> 
                                    <HourglassTopIcon className="avatar-loader"/>
                                </Avatar> 
                            }
                        </IconButton>
                        {
                            tempPic ? 
                            <div> 
                                <CancelIcon className="avatar-clear" onClick={removeTempProfilePic} /> 
                                <button className="formbold-btn upload-avatar" onClick={uploadTempProfilePic}>
                                    Upload Picture
                                </button>
                            </div> : ""
                        }
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

                        <Editor 
                            userDetails={userDetails}
                            profileDetails={profileDetails}
                            portfolioDetails={portfolioDetails}
                            handleCurrentUserChange={handleCurrentUserChange}
                        />
                    </section>
                    
                </Stack > : <PageEditorLoader/>

            }
        </Fragment>
        
    )
}

export default ProfileEditor;
import React, { useState, useEffect, useRef, Fragment } from "react";
import { uuid } from "../../Helper/Helper";
import { uploadProfilePic } from "../../Apis/userApis";

import { toast } from "react-hot-toast";
import PageEditorLoader from "./ProfileEditorLoader";
import UserInfo from "./UserInfo";
import ProfileSettings from "./ProfileSettings";
import PortfolioSettings from "./Portfolio/PortfolioSettings";


import '../../Styles/ProfileEditor/ProfileEditor.scss';
import { 
    Stack,
    IconButton,
    Avatar
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Preview from "./Preview";

const editorNav = [ 
    {name: "User Info", component: UserInfo}, 
    {name: "Profile", component: ProfileSettings}, 
    {name: "Portfolio", component: PortfolioSettings}
];


const ProfileEditor = (props) => {
    const { currentUser, 
        handleCurrentUserChange, 
        profileCompletion,
        showUserPrompt
    } = props;

    const { 
        user_info: userDetails, 
        profile_info: profileDetails, 
        portfolio_info: portfolioDetails, 
    } = currentUser || {};
    
    const [ selectedNav, setSelectedNav ] = useState(editorNav[0]);

    const [ tempPic, setTempPic ] = useState(null);
    const [ tempPicURL, setTempPicURL ] = useState(null);
    const [ newProfPic, setNewProfPic ] = useState(null);

    const profileImgIp = useRef(null);
    const [ isLoading, setIsLoading ] = useState(null);
    const [ showPreview, setShowPreview ] = useState(false);
    const [ previewProps, setPreviewProps ] = useState({});
    // console.log(">>>>>>currentUser: ", currentUser);

    useEffect(() => {


    }, [currentUser]);

    const handleChangePicture = (e) => {
        if(tempPic) {
            URL.revokeObjectURL(tempPic);
        }

        // Navigate to User Info tab while changing picture
        if(selectedNav.name == "Profile")
            setSelectedNav(editorNav[0]);

        let file = e.target.files[0];
        setTempPic(file)
        setTempPicURL(URL.createObjectURL(file));
    }

    const resetProfilePicChanges = (deleteNew=false) => {
        if(tempPic)
            URL.revokeObjectURL(tempPic);
        setTempPic(null);
        setTempPicURL(null);

        if(deleteNew) setNewProfPic(null);
    }

    const uploadTempProfilePic = async (e) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('profilePic', tempPic);

        setIsLoading(true);
        await uploadProfilePic(formData).then(response => {
            console.log(response);
            if(response.success) {
                let newDetails = {...userDetails};
                newDetails.picture = response.url;
                setNewProfPic(response.url);
                resetProfilePicChanges();
                toast.success("Upload successful, make sure you hit the save button!");
            } else {
                toast.error("Unable to upload image, please try again!");
            }
            setIsLoading(false);
        });
    }

    const triggerPicUpload = () => {
        profileImgIp?.current?.click();
    }

    const setDisplayPic = () => {
        if(selectedNav.name == "Portfolio") {
            return  portfolioDetails?.picture || userDetails?.picture;
        } else {
            return userDetails?.picture;
        }
    }


    const Editor = selectedNav.component;
    const displayPic = setDisplayPic();

    return (
        <Fragment>
            {
                currentUser ?
                <Stack direction="row" spacing={2} className="profile-editor">
                    <section className="profile-editor-left">
                        <IconButton sx={{ p: 0 }} className="icon-btn">
                            {
                                userDetails?.picture ?
                                <div className="avatar-container">
                                    <Avatar className="avatar" alt={userDetails?.name} 
                                        src={
                                            tempPicURL || 
                                            newProfPic ||
                                            displayPic
                                        } 
                                    /> 

                                    <label htmlFor="avatar-overlay" className="avatar-overlay">Change Picture</label>
                                    <input 
                                        id="avatar-overlay" 
                                        ref={profileImgIp}
                                        type="file" 
                                        accept="image/*"
                                        onClick={(e) => e.target.value = null}
                                        onChange={handleChangePicture} 
                                    />
                                </div>  :
                                <Avatar className="avatar"> 
                                    <HourglassTopIcon className="avatar-loader"/>
                                </Avatar> 
                            }
                        </IconButton>
                        {
                            
                            <div> 
                                {
                                    tempPic || newProfPic ?
                                    <CancelIcon className="avatar-clear" 
                                        onClick={() => { resetProfilePicChanges(true) }} 
                                    /> : ""
                                }
                                
                                {
                                    tempPic ? 
                                    <button className="formbold-btn upload-avatar" 
                                            disabled={isLoading}
                                            onClick={uploadTempProfilePic}
                                        >
                                            Upload Picture
                                            {isLoading ? <span className="req-loader"></span> : ""}
                                        </button> : ""
                                }
                            </div> 
                        }

                        <div className="profile-completion-cont">Profile completion
                            <div className="profile-completion">
                                <div className="bar">
                                    <div className="completion" style={{width: `${profileCompletion}%`}}></div>
                                </div>
                                <p style={{marginLeft: `${profileCompletion - 3}%`}}>{profileCompletion}%</p>
                            </div>
                        </div>
                        
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
                            currentUser={currentUser}

                            handleCurrentUserChange={handleCurrentUserChange}
                            
                            newProfPic={newProfPic}
                            setNewProfPic={setNewProfPic}
                            showUserPrompt={showUserPrompt}

                            setShowPreview={setShowPreview}
                            setPreviewProps={setPreviewProps}
                        />
                    </section>
                    
                </Stack > : <PageEditorLoader/>

            }
            {
                showPreview ? 
                <Preview 
                    pageProps={previewProps}
                    setShowPreview={setShowPreview}
                /> : ""
            }

        </Fragment>
        
    )
}

export default ProfileEditor;
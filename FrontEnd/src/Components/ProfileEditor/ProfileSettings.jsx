import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { postProfileDetails } from "../../Apis/userApis";
import { DOMAIN } from "../../Constants/Constants";
import { validateURL } from "../../Helper/Helper";


const ProfileSettings = (props) => {
    const { profileDetails, handleCurrentUserChange } = props;

    const [ title, setTitle ] = useState(profileDetails?.title || "");
    const [ tagline, setTagline ] = useState(profileDetails?.tagline || "");
    const [ subText, setSubText ] = useState(profileDetails?.subtext || "");

    const [ gitHub, setGitHub ] = useState(profileDetails?.github || "");
    const [ youTube, setYouTube ] = useState(profileDetails?.youtube|| "");
    const [ instagram, setInstagram ] = useState(profileDetails?.instagram || "");
    const [ linkedin, setLinkedin ] = useState(profileDetails?.linkedin || "");

    const [ epigraph, setEpigraph ] = useState(profileDetails?.epigraph || "");

    const [ gitError, setGitError ] = useState(false);
    const [ youTubeError, setYouTubeError ] = useState(false);
    const [ instagramError, setInstagramError ] = useState(false);
    const [ linkedinError, setLinkedinError ] = useState(false);

    const [ isLoading, setIsLoading ] = useState(false);


    useEffect(() => {
        if(profileDetails) {
            setTitle(profileDetails?.title);
            setTagline(profileDetails?.tagline);
            setSubText(profileDetails?.subtext);
            setGitHub(profileDetails?.github);
            setYouTube(profileDetails?.youtube);
            setInstagram(profileDetails?.instagram);
            setLinkedin(profileDetails?.linkedin);
            setEpigraph(profileDetails?.epigraph);
        }
    }, [profileDetails]);

    const noErrors = () => {
        return !gitError && !youTubeError && !instagramError && !linkedinError && title;
    }

    const hasChanged = () => {
        return (
            !(!title && !profileDetails?.title) && (title != profileDetails?.title) ||
            !(!tagline && !profileDetails?.tagline) && (tagline != profileDetails?.tagline) || 
            !(!subText && !profileDetails?.subtext) && (subText != profileDetails?.subtext) ||
            
            !(!gitHub && !profileDetails?.github) && (gitHub != profileDetails?.github) ||
            !(!youTube && !profileDetails?.youtube) && (youTube != profileDetails?.youtube) || 
            !(!instagram && !profileDetails?.instagram) && (instagram != profileDetails?.instagram) ||
            !(!linkedin && !profileDetails?.linkedin) && (linkedin != profileDetails?.linkedin) ||

            !(!epigraph && !profileDetails?.epigraph) && (epigraph != profileDetails?.epigraph)
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(noErrors() && hasChanged()) {
            setIsLoading(true);
            await postProfileDetails({
                "title": title,
                "tagline": tagline,
                "subtext": subText,

                "github": gitHub,
                "youtube": youTube,
                "instagram": instagram,
                "linkedin": linkedin,

                "epigraph": epigraph,
            }).then((response) => {
                console.log("postProfileDetails: ", response);
                if(response.success) {
                    handleCurrentUserChange({newDetails: response.profile_details, _changeKey:"profile_info"});
                    toast("Profile details updated successfully!");
                } else {
                    toast("Unable to update profile details, please try again later!");
                }
                    
                setIsLoading(false);
            });
            
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleTaglineChange = (e) => {
        setTagline(e.target.value);
    }

    const handleSubTextChange = (e) => {
        setSubText(e.target.value);
    }

    const handleGitHubChange = (e) => {
        let val = e.target.value;
        setGitHub(val);
        !val ? setGitError(false) : setGitError(!validateURL(val) && !val.includes(DOMAIN.github));
    }

    const handleYouTubeChange = (e) => {
        let val = e.target.value;
        setYouTube(val);
        !val ? setYouTubeError(false) : setYouTubeError(!validateURL(val) && !val.includes(DOMAIN.youtube));
    }

    const handleInstagramChange = (e) => {
        let val = e.target.value;
        setInstagram(val);
        !val ? setInstagramError(false) : setInstagramError(!validateURL(val) && !val.includes(DOMAIN.instagram));
    }

    const handleLinkedinChange = (e) => {
        let val = e.target.value;
        setLinkedin(val);
        !val ? setLinkedinError(false) : setLinkedinError(!validateURL(val) && !val.includes(DOMAIN.linkedin));
    }

    const handleEpigraphChange = (e) => {
        setEpigraph(e.target.value);
    }

    const changesMade = hasChanged() && noErrors();
    return (
        <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
                <form onSubmit={handleSubmit}>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Who are you?"
                                className="formbold-form-input"
                                value={title}
                                onChange={handleTitleChange}
                            />

                            <label htmlFor="title" className="formbold-form-label">
                                Title
                            </label>
                        </div>
                    </div>

                    <div className="formbold-input-flex">
                        <div>
                            <input
                                type="text"
                                name="tagline"
                                id="tagline"
                                placeholder="Let's do it"
                                className="formbold-form-input"
                                value={tagline}
                                onChange={handleTaglineChange}
                            />
                            <label htmlFor="tagline" className="formbold-form-label"> Tagline </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="subtext"
                                id="subtext"
                                placeholder="always and forever"
                                className="formbold-form-input"
                                value={subText}
                                onChange={handleSubTextChange}
                            />
                            <label htmlFor="subtext" className="formbold-form-label"> Subtext </label>
                        </div>
                    </div>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="gitlink"
                                id="gitlink"
                                placeholder="Enter your GitHub link"
                                className={`formbold-form-input ${gitError ? "error-input" : ""}`}
                                value={gitHub}
                                onChange={handleGitHubChange}
                            />

                            <label htmlFor="gitlink" className={`formbold-form-label ${gitError ? "error-label" : ""}`}>
                                GitHub
                            </label>
                        </div>
                    </div>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="youtubelink"
                                id="youtubelink"
                                placeholder="Add your YouTube Channel"
                                className={`formbold-form-input ${youTubeError ? "error-input" : ""}`}
                                value={youTube}
                                onChange={handleYouTubeChange}
                            />

                            <label htmlFor="youtubelink" className={`formbold-form-label ${youTubeError ? "error-label" : ""}`}>
                                YouTube
                            </label>
                        </div>
                    </div>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="linkedinlink"
                                id="linkedinlink"
                                placeholder="Enter your LinkedIn URL"
                                className={`formbold-form-input ${linkedinError ? "error-input" : ""}`}
                                value={linkedin}
                                onChange={handleLinkedinChange}
                            />

                            <label htmlFor="linkedinlink" className={`formbold-form-label ${linkedinError ? "error-label" : ""}`}>
                                LinkedIn
                            </label>
                        </div>
                    </div>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="iglink"
                                id="iglink"
                                placeholder="Add your Instagram handle"
                                className={`formbold-form-input ${instagramError ? "error-input" : ""}`}
                                value={instagram}
                                onChange={handleInstagramChange}
                            />

                            <label htmlFor="iglink" className={`formbold-form-label ${instagramError ? "error-label" : ""}`}>
                                Instagram
                            </label>
                        </div>
                    </div>

                    <div className="formbold-textarea">
                        <textarea
                            rows="6"
                            name="epigraph"
                            id="epigraph"
                            placeholder="An Epigraph, An Adage or just Something Funny"
                            className="formbold-form-input"
                            value={epigraph}
                            onChange={handleEpigraphChange}
                        ></textarea>
                        <label htmlFor="epigraph" className="formbold-form-label"> Share Your Thoughts </label>
                    </div>

                    <button className="formbold-btn" disabled={!changesMade || isLoading}>
                        Save Profile
                        {isLoading ? <span className="req-loader"></span> : ""}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProfileSettings;
import React, { useState, useEffect, Fragment } from "react";
import { uuid } from "../../../Helper/Helper";

import GeneralSettings from "./GeneralSettings";
import SkillSettings from "./SkillSettings";
import WorkSettings from "./WorkSettings";
import EmailFormSettings from "./EmailFormSettings";

import "../../../Styles/ProfileEditor/PortflioSettings.scss";

const editorNav = [ 
    {name: "General", component: GeneralSettings}, 
    {name: "Skills", component: SkillSettings}, 
    {name: "Work", component: WorkSettings},
    {name: "Email Form", component: EmailFormSettings} 
];


const PortfolioSettings = (props) => {
    const [ selectedNav, setSelectedNav ] = useState(editorNav[0]);
    const { 
        portfolioDetails, 
        handleCurrentUserChange, 
        userDetails,
        
        newProfPic,
        setNewProfPic,
        showUserPrompt,
    } = props;

    useEffect(() => {
        if(newProfPic) {
            setSelectedNav(editorNav[0]);
        }
    }, [newProfPic])
    
    const Editor = selectedNav.component;
    return (
        <section className="portfolio-editor-input">
            <header className="portfolio-editor-nav">
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
                portfolioDetails={portfolioDetails}
                handleCurrentUserChange={handleCurrentUserChange}
                userDetails={userDetails}

                newProfPic={newProfPic}
                setNewProfPic={setNewProfPic}
                showUserPrompt={showUserPrompt}

            />
        </section>
    );
}

export default PortfolioSettings;
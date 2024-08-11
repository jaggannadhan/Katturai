import React, { useState, useEffect, Fragment } from "react";
import { uuid } from "../../../Helper/Helper";

import GeneralSettings from "./GeneralSettings";
import SkillSettings from "./SkillSettings";
import WorkSettings from "./WorkSettings";

import "../../../Styles/ProfileEditor/PortflioSettings.scss";

const editorNav = [ 
    {name: "General", component: GeneralSettings}, 
    {name: "Skills", component: SkillSettings}, 
    {name: "Work", component: WorkSettings} 
];


const PortfolioSettings = (props) => {
    const [ selectedNav, setSelectedNav ] = useState(editorNav[2]);
    const { 
        portfolioDetails, 
        handleCurrentUserChange, 

        newProfPic,
        setNewProfPic,
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

                newProfPic={newProfPic}
                setNewProfPic={setNewProfPic}
            />
        </section>
    );
}

export default PortfolioSettings;
import React, { useState, useEffect, Fragment } from "react";
import { uuid } from "../../../Helper/Helper";

import GeneralSettings from "./GeneralSettings";
import SkillSettings from "./SkillSettings";
import "../../../Styles/ProfileEditor/PortflioSettings.scss";

const editorNav = [ 
    {name: "General", component: GeneralSettings}, 
    {name: "Skills", component: SkillSettings}, 
    // {name: "Work", component: () => {<Fragment></ Fragment>}} 
];


const PortfolioSettings = (props) => {
    const [ selectedNav, setSelectedNav ] = useState(editorNav[0]);
    const { portfolioDetails, handleCurrentUserChange } = props;
    
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
            />
        </section>
    );
}

export default PortfolioSettings;
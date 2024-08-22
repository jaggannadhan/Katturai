import React, { useState, useEffect, Fragment } from "react";
import PortPreview from "./PortPreview";
import TechStack from "./TechStack";
import RecentWork from "./RecentWork";
import EmailForm from "./EmailForm";

import boston from "../../../public/images/boston.png";
import "../../Styles/Portfolio/Portfolio.scss"

const Portfolio = (props) => {
    const { currentUser } = props;
    const { portfolio_info } = currentUser || {}; 
    
    // console.log(currentUser);
    return(
        <section className="portfolio-section">
            <PortPreview 
                currentUser={currentUser}
            />
            {/* <img src={boston}/> */}
            
            <RecentWork 
                portfolio_info={portfolio_info}
            />

            <TechStack 
                portfolio_info={portfolio_info}
            />

            {
                portfolio_info?.form_submit ?
                <EmailForm 
                    emailProxy={portfolio_info?.form_submit?.[1]}
                /> : ""
            }
            


            {/* <embed src={resume} style={{ height: "60vw", width: "100vw" }} /> */}
            
        </section>
    );
}

export default Portfolio;
import React, { useState, useEffect, Fragment } from "react";
import PortPreview from "./PortPreview";
import TechStack from "./TechStack";
import RecentWork from "./RecentWork";

import resume from "../../Files/Resume_4.pdf";
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
            <TechStack 
                portfolio_info={portfolio_info}
            />

            <RecentWork 
                portfolio_info={portfolio_info}
            />
            {/* <embed src={resume} style={{ height: "60vw", width: "100vw" }} /> */}
            
        </section>
    );
}

export default Portfolio;
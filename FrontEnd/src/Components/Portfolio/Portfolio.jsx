import React, { useState, useEffect, Fragment } from "react";
import PortPreview from "./PortPreview";
import TechStack from "./TechStack";
import RecentWork from "./RecentWork";

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
            {/* <embed src={resume} style={{ height: "60vw", width: "100vw" }} /> */}
            
        </section>
    );
}

export default Portfolio;
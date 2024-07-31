import React, { useState, useEffect, Fragment } from "react";
import PortPreview from "./PortPreview";
import TechStack from "./TechStack";

import resume from "../../Files/Resume_4.pdf";
import "../../Styles/Portfolio/Portfolio.scss"

const Portfolio = (props) => {
    const { currentUser } = props;
    const { protfolio_info } = currentUser || {}; 
    
    console.log(currentUser);
    return(
        <Fragment>
            <PortPreview 
                currentUser={currentUser}
            />
            <TechStack 
                protfolio_info={protfolio_info}
            />
            {/* <embed src={resume} style={{ height: "60vw", width: "100vw" }} /> */}
            
        </Fragment>
    );
}

export default Portfolio;
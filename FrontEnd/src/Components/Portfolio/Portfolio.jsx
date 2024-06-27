import React, { useState, useEffect, Fragment } from "react";
import PortPreview from "./PortPreview";
import TechStack from "./TechStack";

import resume from "../../Files/Resume_4.pdf";
import "../../Styles/Portfolio/Portfolio.scss"

const Portfolio = () => {
    return(
        <Fragment>
            <PortPreview />
            <TechStack />
            {/* <embed src={resume} style={{ height: "60vw", width: "100vw" }} /> */}
            
        </Fragment>
    );
}

export default Portfolio;
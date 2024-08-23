import React, { Fragment, useState, useEffect } from "react";
import Portfolio from "../Portfolio/Portfolio";
import Close from "@mui/icons-material/Close";
import Tooltip from '@mui/material/Tooltip';

import "../../Styles/ProfileEditor/Preview.scss";

const Preview = (props) => {
    const { pageProps, setShowPreview } = props;
    const { page, currentUser } = pageProps || {};

    useEffect(() => {
        if(page == "WorkSettings") {
            document.getElementById("recent-work-container").scrollIntoView();
        }
    }, [pageProps, setShowPreview]);

    const handlePreviewShow = () => {
        setShowPreview(false);
    }

    return (
        <section className="editor-preview">
            {
                page == "WorkSettings" ?
                <Portfolio 
                    currentUser={currentUser}
                /> : ""
            }

            <header className="close-header">
                <h4 className="close-preview" onClick={handlePreviewShow}>
                    Close&nbsp;Preview
                </h4>
            </header>
            
            
        </section>
    )
}

export default Preview;
import React, { useState, useEffect, useRef } from "react";
import { 
    Container,
    Link,
    Stack
  } from '@mui/material';

import { ReactTyped } from "react-typed";
import { WORKTHEMES } from "../../Constants/Constants";
import "../../Styles/Portfolio/RecentWork.scss";


const RecentWork = (props) => {
    const { portfolio_info } = props;
    const { recent_work, theme } = portfolio_info || {};
    
    useEffect(() => {   
        let selected = getThemedTemplate();
        MyThemedTemplate = selected.theme;
        if( selected.name == "Simple" ) {
            changeBackgroundImg("none");
        } else if( selected.name == "Tiled" ) {
            changeBackgroundImg("var(--bg_coffee)");
        }

    }, [portfolio_info]);

    const changeBackgroundImg = (val) => {
        let container = document.getElementById("recent-work-container");
        if(container) container.style.backgroundImage = val;
    }

    const getThemedTemplate = () => {
        let myTheme = WORKTHEMES.filter(wrkTheme => wrkTheme.name == theme) ;
        return myTheme.length ? myTheme[0] : WORKTHEMES[0];
    }

    let MyThemedTemplate = getThemedTemplate().theme;

    return (
        <Container className="recent-work-cont" id="recent-work-container"> 
            <section className="recent-work-preview">
                <code> {">> "} </code>
                <ReactTyped 
                    strings={["My Work", "My Projects"]} 
                    typeSpeed={100} 
                    backSpeed={100}
                    backDelay={1000}
                    loop
                />
            </section>

            <div style={{width: "92vw", margin: "auto" }}> 
            {
                
                    recent_work?.map((work, idx) => {
                        return (
                            <MyThemedTemplate
                                key={`work-preview-${idx}`}
                                work={work}
                                idx={idx}
                            />
                        )
                    })
                
            }
            </div>

            <br />
        </Container>
    );
}

export default RecentWork;


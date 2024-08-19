import React, { useState, useEffect, useRef } from "react";
import { 
    Container,
    Link,
    Stack
  } from '@mui/material';

import { ReactTyped } from "react-typed";
import SimpleWorkTemplate from "./SimpleWorkTemplate";
import TiledWorkTemplate from "./TiledWorkTemplate";

import "../../Styles/Portfolio/RecentWork.scss";


const RecentWork = (props) => {
    const { portfolio_info } = props;
    const { recent_work } = portfolio_info || {};
    
    return (
        <Container className="recent-work-cont"> 
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
                            <TiledWorkTemplate
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


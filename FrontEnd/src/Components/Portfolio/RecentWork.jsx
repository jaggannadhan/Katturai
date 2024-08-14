import React, { useState, useEffect, useRef } from "react";
import { 
    Container,
    Link,
    Stack
  } from '@mui/material';
import { ImgGallery } from "../ImgGallery";
import { ReactTyped } from "react-typed";

import "../../Styles/Portfolio/RecentWork.scss";


const RecentWork = (props) => {
    const { portfolio_info } = props;
    const { recent_work } = portfolio_info || {};
    const [ showOverlay, setShowOverlay ] = useState(false);
    const overlay = useRef(null);


    const handleOverlayClick = (e) => {
        e.preventDefault();
        if(e.target == overlay?.current)
            setShowOverlay(false);
    }

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


            {
                recent_work?.map((work, idx) => {
                    const { title, desc, images, link } = work;

                    return (
                        <section className="work-preview" key={`work-preview-${idx}`}>
                            <div className="work-info">
                                {
                                    link ?
                                    <p className="work-title">
                                        <a href={link} target="blank">{title}</a>
                                    </p> : 

                                    images ?
                                    <p className="work-title">
                                        <a onClick={() => setShowOverlay(true)}>{title}</a>
                                    </p> : ""
                                }
                                    
                                {
                                    desc ? <p className="work-desc">{desc}</p> : ""
                                }
                                
                            </div>

                           {
                                showOverlay ? 
                                <div className="work-overlay" ref={overlay} onClick={handleOverlayClick}>
                                    <ImgGallery
                                        images={images}
                                    />
                                </div> : ""
                           }
                            
                        </section>
                        
                    )
                })
            }
            <br />
        </Container>
    );
}

export default RecentWork;


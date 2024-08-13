import React, { useState, useEffect, Fragment } from "react";
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
                                <div className="headerNlink">
                                    <span className="work-title">{title}</span>
                                    {
                                        link ? <button><a href={link} target="blank">View demo</a></button> : ""
                                    }
                                    
                                </div>
                                {
                                    desc ? <p className="work-desc">{desc}</p> : ""
                                }
                                
                            </div>
                            
                            <ImgGallery 
                                images={images}
                            />
                        </section>
                        
                    )
                })
            }
        </Container>
    );
}

export default RecentWork;


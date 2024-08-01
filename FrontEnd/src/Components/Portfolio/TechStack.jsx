
import React, { useState, useEffect, Fragment } from "react";
import { 
    Container,
    Stack
  } from '@mui/material';
import { ReactTyped } from "react-typed";

import "../../Styles/Portfolio/TechStack.scss";

const TechStack = (props) => {
    const { portfolio_info } = props;
    const skillsCategory = (portfolio_info || {}).skills || [];

    return (
        <Container className="tech-stack-cont">
            <section className="tech-stack">
                <div className="tech-content">
                    {
                        skillsCategory.length ?
                        <h1 id="typed-stack-header">
                            <code> {">> "} </code>
                            <ReactTyped 
                                strings={[" My Tech Stack", "My Knowledge Bundle"]} 
                                typeSpeed={100} 
                                backSpeed={100}
                                backDelay={1000}
                                loop
                            />
                        </h1> : ""
                    }

                    
                    {
                        skillsCategory.map((category) => {
                            let skills = category.skills || [];
                            return (
                                <section className="tech-stack-sec" key={category.name}>
                                    <h1 className="tech-sec-title">{category.name}</h1>
                                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" className="tech-row">
                                        {
                                            skills.map(skill => {

                                                let subSkills = skill.subSkills || [];
                                                return (
                                                    <div key={skill.name}>
                                                        <h3>{skill.name}</h3>

                                                        {
                                                            subSkills.map(subSkill => {
                                                                return (
                                                                    <li key={subSkill}>{subSkill}</li>
                                                                )
                                                            })
                                                        }
                                                        
                                                    </div>
                                                )
                                            })
                                        }
                                    </Stack>
                                </section>
                            )
                        })  
                    }
                </div>
            </section>
        </Container>
    );
}

export default TechStack;
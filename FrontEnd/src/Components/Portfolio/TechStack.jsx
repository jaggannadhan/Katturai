
import React, { useState, useEffect, Fragment } from "react";
import { 
    Container,
    Stack
  } from '@mui/material';
import { ReactTyped } from "react-typed";

import "../../Styles/Portfolio/TechStack.scss";

const TechStack = (props) => {
    return (
        <Container className="tech-stack-cont">
            <section className="tech-stack">
                <div className="tech-content">
                    <h1 id="typed-stack-header">
                        <code> {">> "} </code>
                        <ReactTyped 
                            strings={[" My Tech Stack", "My Knowledge Bundle"]} 
                            typeSpeed={100} 
                            backSpeed={100}
                            backDelay={1000}
                            loop
                        />
                    </h1>

                    <section className="tech-stack-sec">
                        <h1 className="tech-sec-title">Front-End</h1>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" className="tech-row">
                            <div>
                                <h3>JavaScript</h3>
                                <li>React.js - Redux</li>
                                <li>TypeScript</li>
                            </div>

                            <h3>HTMl</h3>
                            <div>
                                <h3>CSS</h3>
                                <li>scss</li>
                            </div>
                        </Stack>
                    </section>

                    <section className="tech-stack-sec">
                        <h1 className="tech-sec-title">Back-End</h1>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" className="tech-row">
                            <div>
                                <h3>Python</h3>
                                <li>Flask</li>
                                <li>Django</li>
                            </div>
                            <div>
                                <h3>SQL</h3>
                                <li>MySQL</li>
                            </div>
                            <div>
                                <h3>NoSQL</h3>
                                <li>MongoDB</li>
                            </div>
                            <div>
                                <h3>Google Cloud Platform</h3>
                                <li>AppEngine</li>
                                <li>ComputeEngine</li>
                            </div>
                            
                        </Stack>
                    </section>

                    <section className="tech-stack-sec">
                        <h1 className="tech-sec-title">Testing</h1>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" className="tech-row">
                            <h3>Jest</h3>
                            <h3>React Testing Library</h3>
                            <h3>PyTest</h3>
                            <h3>UnitTest</h3>
                        </Stack>
                    </section>

                    <section className="tech-stack-sec">
                        <h1 className="tech-sec-title">AI / ML</h1>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" className="tech-row">
                        
                        <div>
                            <h3>CNNs</h3>
                        </div>
                        <div>
                            <h3>Conversational AI</h3>
                            <li>OpenAI</li>
                        </div>
                        <div>
                            <h3>Frameworks</h3>
                            <li>TensorFlow</li>
                            <li>PyTorch</li>
                        </div>
                        </Stack>
                    </section>
                </div>
            </section>
        </Container>
    );
}

export default TechStack;
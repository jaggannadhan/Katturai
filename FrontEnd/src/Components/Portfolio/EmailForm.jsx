import React, { Fragment, useState, useEffect } from "react";

import { sendEmail } from "../../Apis/userApis";
import "../../Styles/Portfolio/EmailForm.scss";
import { Container } from "@mui/material";

const EmailForm = (props) => {
    const { emailProxy } = props;
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showResponse, setShowResponse ] = useState(null);

    useEffect(() => {
        
    }, [emailProxy]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let subject = e.target.subject.value;
        let message = e.target.message.value;

        setIsLoading(true);

        await sendEmail({
            email: email, subject: subject, message: message
        }).then((response) => {
            if(response.success) {
                setShowResponse({success: true});
            } else {
                setShowResponse({success: false});
            }
            setIsLoading(false);
        })
    }

    const sendAnother = (e) => {
        e.preventDefault();
        setShowResponse(null);
    }


    return (
        <Container className="email-form-cont">
                <section className="email-form">
                    {
                        !showResponse ?

                        <div className="contact-form-wrapper">
                            <div className="title">
                                <h1>{"Don't be shy! Talk to me :)"}</h1>
                                <p> Like my work? Wanna know how I did it? Hire me? <br/>Shoot me an email and we'll talk! </p>
                            </div>
                        
                            <form id="contact-form" className="contact-form" role="form" onSubmit={handleSubmit}>

                                <div className="form-group">
                                    <input type="email" placeholder="Your Email" className="form-control" name="email" id="email" required />
                                </div>

                                <div className="form-group">
                                    <input type="text" placeholder="Subject" className="form-control" name="subject" id="subject" required />
                                </div>

                                <div className="form-group">
                                    <textarea rows="6" placeholder="Message" className="form-control" name="message" id="message" required></textarea>    
                                </div>

                                <div id="submit" className="submit" disabled={isLoading}>
                                    <input type="submit" id="contact-submit" className="btn btn-default submit-button" value="Send Message" />
                                    {isLoading ? <span className="req-loader"></span> : ""}
                                </div>
                            </form>
                        </div> : 

                        showResponse.success ? 
                        <div className="success">
                            <div onClick={sendAnother}>
                                <h3>Hurray! Email sent</h3>
                                <button>Send another!</button>
                            </div>
                        </div> :
                        
                        <div className="failed">
                            <div id="oops"></div>
                            <div className="fail-content">
                                <h3>Something is broken!</h3>
                                <p>We are working on it!</p>
                                <button onClick={sendAnother}>Try Again!</button>
                            </div>
                        </div>
                    }
                </section>
        </Container>
        
    )
}

export default EmailForm;

import React, { Fragment, useState, useEffect } from "react";
import { postPortfolioDetails } from "../../../Apis/userApis";
import toast from "react-hot-toast";

import "../../../Styles/ProfileEditor/EmailFormSettings.scss";
import { validateEmail } from "../../../Helper/Helper";

const EmailFormSettings = (props) => {

    const { 
        portfolioDetails, 
        userDetails,
        handleCurrentUserChange, 
        showUserPrompt
    } = props;

    const [ email,  setEmail ] = useState("");
    const [ proxy, setProxy ] = useState("");
    const [ emailError,  setEmailError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);


    useEffect(() => {
        if(userDetails && portfolioDetails) {
            let [fEmail, fProxy] = portfolioDetails.form_submit || [];
            fEmail = fEmail || userDetails.email;
            setEmail(fEmail);
            setEmailError(!validateEmail(fEmail));
            setProxy(fProxy ? fProxy : "");
        }
    }, [userDetails, portfolioDetails])

    const hasChanged = () => {
        let fEmail = portfolioDetails?.form_submit?.[0];
        return fEmail != email;
    }

    const noErrors = () => {
        return !emailError;
    }
 
    const handleEmailChange = (e) => {
        let val = e.target.value;
        setEmail(val);
        setEmailError(!val ? false : !validateEmail(val));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email) {
            toast.error("Please provide a valid email!")
            return;
        }
        setIsLoading(true);

        if(hasChanged() && noErrors()) {
            let params = {...portfolioDetails};
            params.form_submit = [email, proxy];

            await postPortfolioDetails(params).then((response) => {
                console.log("postPortfolioDetails: ", response);
                if(response.success) {
                    handleCurrentUserChange({newDetails: response.portfolio_details, _changeKey:"portfolio_info"});
                } else {
                    toast("Unable to initiate FormSubmit, please try again later!");
                }
                setIsLoading(false);
            });
        }
        
    }

    const changesMade = hasChanged() && noErrors();

    return (
        <section className="email-form-settings">
            <div className="formbold-main-wrapper">
                <div className="formbold-form-wrapper">
                    <form action="https://formsubmit.co/jegsirox@gmail.com" method="POST" target="_blank">

                        <div className="formbold-input-flex">
                            <div>
                                <input
                                    type="text"
                                    name="fs-email"
                                    id="fs-email"
                                    placeholder="Enter you email"
                                    className="formbold-form-input"
                                    value={email}
                                    onChange={handleEmailChange}
                                />

                                <label htmlFor="fs-email" className="formbold-form-label">
                                    Email
                                </label>
                            </div>
                            <div>
                                <button className="formbold-btn"
                                    disabled={!changesMade || isLoading}
                                > 
                                    Setup Form
                                </button>
                            </div>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit}>
                        <div className="formbold-mb-3">
                            <div>
                                <input
                                    type="text"
                                    name="fs-proxy"
                                    id="fs-proxy"
                                    placeholder="Enter your email proxy"
                                    className="formbold-form-input"
                                    value={proxy}
                                    disabled={!!(portfolioDetails?.form_submit?.[1])}
                                    onChange={(e) => { setProxy(e.target.value) }}
                                />

                                <label htmlFor="fs-proxy" className="formbold-form-label"
                                    disabled={!changesMade || isLoading || !proxy}
                                >
                                    Email Proxy Key
                                </label>
                            </div>
                        </div>

                        <button className="formbold-btn" disabled={!changesMade || isLoading}>
                            Setup Form
                            {isLoading ? <span className="req-loader"></span> : ""}
                        </button>
                        
                    </form>
                </div>
            </div>

            <section className="how-it-works">
                <h2>How it works!</h2>
                <p>Raconteur uses a third party -&nbsp;
                    <b>
                        <a href="https://formsubmit.co/" target="blank">FormSubmit</a>
                    </b>
                    &nbsp;for sending/receiving emails.
                </p>
                <ol>
                    <li>
                        Enter you email address to which you you want to receive emails
                    </li>
                    <li>
                        Hit the "Enable Form" button
                    </li>
                    <li>
                        You will receive a verification email from FormSubmit. Copy the "random-string" and Activate Form!
                    </li>
                    <li>
                        Past the "random-string" in the Email Proxy Key and don't forget to hit save.<br/>
                        <small>
                            <b>Note:&nbsp;</b>
                            The "random-string" is an alias for your email id, we will save it on our side securely.
                        </small>
                    </li>

                </ol>
            </section>
        </section>
    );
}

export default EmailFormSettings;

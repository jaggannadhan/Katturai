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
    const [ emailError,  setEmailError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);


    useEffect(() => {
        if(userDetails && portfolioDetails) {
            let fEmail = portfolioDetails.form_submit || "";
            fEmail = fEmail || userDetails.email;
            setEmail(fEmail);
            setEmailError(!validateEmail(fEmail));
        }
    }, [userDetails, portfolioDetails])

    const hasChanged = () => {
        let fEmail = portfolioDetails?.form_submit;
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

        setIsLoading(true);

        if(hasChanged() && noErrors()) {
            let params = {...portfolioDetails};
            params.form_submit = email;

            await postPortfolioDetails(params).then((response) => {
                console.log("postPortfolioDetails: ", response);
                if(response.success) {
                    handleCurrentUserChange({newDetails: response.portfolio_details, _changeKey:"portfolio_info"});
                } else {
                    toast("Unable to save changse, please try again later!");
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
                    <form onSubmit={handleSubmit}>

                        <div className="formbold-input-flex">
                            <div>
                                <input
                                    type="text"
                                    name="fs-email"
                                    id="fs-email"
                                    placeholder="Enter you email"
                                    className={`formbold-form-input ${emailError ? "error-input" : ""}`}
                                    value={email}
                                    onChange={handleEmailChange}
                                />

                                <label htmlFor="fs-email" className={`formbold-form-label ${emailError ? "error-label" : ""}`}>
                                    Email
                                </label>
                            </div>
                            <div>
                                <button className="formbold-btn efsb"
                                    disabled={!changesMade || isLoading}
                                > 
                                    { email ? "Setup Form": "Disable Form" }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <section className="how-it-works">
                <h2>How it works!</h2>
                <p>Raconteur uses a third party -&nbsp;
                    <b>
                        <a href="https://www.mailjet.com" target="blank">MailJet</a>
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
                        Enjoy!<br/>
                        <small>
                            <b>Note:&nbsp;</b>
                            MailJet only alows 20 emails per day for free accounts, <br/>make a donation to 
                            &nbsp;<a href="https://buymeacoffee.com/jaggannadhan">Raconteur</a> to enjoy unlimited services.
                        </small>
                    </li>

                </ol>
            </section>
        </section>
    );
}

export default EmailFormSettings;

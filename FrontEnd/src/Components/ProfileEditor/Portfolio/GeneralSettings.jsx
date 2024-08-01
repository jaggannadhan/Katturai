import React, { useState, useEffect } from "react";
import { postPortfolioDetails } from "../../../Apis/userApis";
import { validateURL, deepCloneNested } from "../../../Helper/Helper";

import "../../../Styles/ProfileEditor/PortflioSettings.scss";


const GeneralSettings = (props) => {
    const { portfolioDetails, handleCurrentUserChange } = props;
    const { 
        greetings: greetingsProp, 
        titles: titlesProp, 
        description: descProp,
        resume: resumeProp,
        skills: skillCategoryProp
    } = portfolioDetails || {};
    
    const getTitlesAsString = (arr, join) => {
        return (arr || []).join(join);
    }

    const [ greetings, setGreeting ] = useState(greetingsProp || "");
    const [ titles, setTitles ] = useState(getTitlesAsString(titlesProp, ", "));
    const [ description, setDescription ] = useState(descProp || "");
    const [ resume, setResume ] = useState(resumeProp || "");

    const [ titlesError, setTitlesError ] = useState(false);
    const [ resumeError, setResumeError ] = useState(false);

    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if(portfolioDetails) {
            setGreeting(greetingsProp);
            setTitles(getTitlesAsString(titlesProp, ", "));
            setDescription(descProp);
            setResume(resumeProp);

            setTitlesError(!getTitlesAsString(titlesProp, ''));
        }
    }, [portfolioDetails]);

    const noErrors = () => {
        return !titlesError && !resumeError;
    }

    const hasChanged = () => {
        let oldTitles = getTitlesAsString(titlesProp, ", ");
        
        return (
            !(!greetings && !greetingsProp) && (greetings != greetingsProp) ||
            !(!titles && !oldTitles) && (titles != oldTitles) || 
            !(!description && descProp) && (description != descProp) ||
            !(!resume && !resumeProp) && (resume != resumeProp)
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(noErrors() && hasChanged()) {
            setIsLoading(true);
            await postPortfolioDetails({
                "greetings": greetings,
                "titles": titles.split(","),
                "description": description,
                "resume": resume,
                "skills": skillCategoryProp
            }).then((response) => {
                console.log("postPortfolioDetails: ", response);
                if(response.success)
                    handleCurrentUserChange({newDetails: response.portfolio_details, _changeKey:"portfolio_info"})
                setIsLoading(false);
            });
        }
    }


    const handleGreetingChange = (e) => {
        setGreeting(e.target.value);
    }

    const handleTitlesChange = (e) => {
        let val = e.target.value;
        let titlesArr = val.split(",");
        setTitles(val);
        setTitlesError(!titlesArr.join(''));
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handelResumeChange = (e) => {
        let value = e.target.value;
        setResume(value);
        !value ? setResumeError(false) : setResumeError(!validateURL(value));
    }

    const changesMade = hasChanged() && noErrors();
    return (
        <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
                <form onSubmit={handleSubmit}>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="greetings"
                                id="greetings"
                                placeholder="Greet your viewers"
                                className="formbold-form-input"
                                value={greetings}
                                onChange={handleGreetingChange}
                            />

                            <label htmlFor="greetings" className="formbold-form-label">
                                Greetings
                            </label>
                        </div>
                    </div>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="titles"
                                id="titles"
                                placeholder="Add one or more titles seperated by a comma(,)"
                                className={`formbold-form-input ${titlesError ? "error-input" : ""}`}
                                value={titles}
                                onChange={handleTitlesChange}
                            />

                            <label htmlFor="greetings" className={`formbold-form-label ${titlesError ? "error-label" : ""}`}>
                                Titles
                            </label>
                        </div>
                    </div>

                    <div className="formbold-textarea">
                        <textarea
                            rows="6"
                            name="prof-descr"
                            id="prof-descr"
                            placeholder="Describe your professional journey!"
                            className="formbold-form-input"
                            value={description}
                            onChange={handleDescriptionChange}
                        ></textarea>
                        <label htmlFor="prof-descr" className="formbold-form-label"> Description </label>
                    </div>
                    <br/><br/>

                    
                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="resume"
                                id="resume"
                                placeholder="Enter the link to your resume"
                                className={`formbold-form-input ${resumeError ? "error-input" : ""}`}
                                value={resume}
                                onChange={handelResumeChange}
                            />

                            <label htmlFor="resume" className={`formbold-form-label ${resumeError ? "error-label" : ""}`}>
                                Resume
                            </label>
                        </div>
                    </div>                    

                    <button className="formbold-btn" disabled={!changesMade || isLoading}>
                        Save Profile
                        {isLoading ? <span className="req-loader"></span> : ""}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default GeneralSettings;
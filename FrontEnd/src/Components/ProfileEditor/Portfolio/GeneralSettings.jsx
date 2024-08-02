import React, { useState, useEffect, Fragment } from "react";
import { postPortfolioDetails } from "../../../Apis/userApis";
import { validateURL } from "../../../Helper/Helper";
import { buyMeItems } from "../../../Constants/Constants";

import { 
    Select, MenuItem, Checkbox,
    FormControl, FormControlLabel,
    OutlinedInput, InputLabel
} from '@mui/material';


const GeneralSettings = (props) => {
    const { portfolioDetails, handleCurrentUserChange } = props;
    const { 
        greetings: greetingsProp, 
        titles: titlesProp, 
        description: descProp,
        resume: resumeProp,
        buy_me_something: buyMeSomethingProp,
        skills: skillCategoryProp
    } = portfolioDetails || {};
    
    const getTitlesAsString = (arr, join) => {
        return (arr || []).join(join);
    }

    const [ greetings, setGreeting ] = useState(greetingsProp || "");
    const [ titles, setTitles ] = useState(getTitlesAsString(titlesProp, ", "));
    const [ description, setDescription ] = useState(descProp || "");
    const [ resume, setResume ] = useState(resumeProp || "");

    const [ buyMe, setBuyMe ] = useState(false);
    const [ buyMeSelection, setBuyMeSelection ] = useState(buyMeItems[0]);
    const [ paymentMethod, setPaymentMethod ] = useState("");

    const [ titlesError, setTitlesError ] = useState(false);
    const [ resumeError, setResumeError ] = useState(false);
    const [ paymentLinkError, setPaymentLinkError ] = useState(false);

    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if(portfolioDetails) {
            setGreeting(greetingsProp);
            setTitles(getTitlesAsString(titlesProp, ", "));
            setDescription(descProp);
            setResume(resumeProp);

            getBuyMeSelection((buyMeSomethingProp || []));

            setTitlesError(!getTitlesAsString(titlesProp, ''));
        }
    }, [portfolioDetails]);


    const getBuyMeSelection = (toBuy) => {
        let [something, mode] = toBuy;

        if(!something) {
            setBuyMe(false);
            setPaymentLinkError(false);
            return;
        }

        let mySelection = buyMeItems.reduce((myItem, item) => {
            if(item.name == something) 
                myItem = item;
        
            return myItem
        }, undefined);

        setBuyMe(true);
        setBuyMeSelection(mySelection);
        setPaymentMethod(mode);
        setPaymentLinkError(!validateURL(mode));
    }

    const noErrors = () => {
        return !titlesError && !resumeError && !paymentLinkError;
    }

    const hasChanged = () => {
        let oldTitles = getTitlesAsString(titlesProp, ", ");
        
        return (
            !(!greetings && !greetingsProp) && (greetings != greetingsProp) ||
            !(!titles && !oldTitles) && (titles != oldTitles) || 
            !(!description && descProp) && (description != descProp) ||
            !(!resume && !resumeProp) && (resume != resumeProp) ||
            // Read for changes only if buyMe is checked
            buyMe && !(!buyMeSelection.name && !buyMeSomethingProp[0]) && (buyMeSelection.name != buyMeSomethingProp[0]) || 
            buyMe && !(!paymentMethod && !buyMeSomethingProp[1]) && (paymentMethod != buyMeSomethingProp[1]) ||
            // Read changes if buyMe is added/removed
            !!buyMeSomethingProp[0] != buyMe
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
                "skills": skillCategoryProp,
                "buy_me_something": buyMe ? [buyMeSelection.name, paymentMethod] : []
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

    const handleSetBuyMe = () => {
        setPaymentLinkError(!buyMe ? (!validateURL(paymentMethod)) : false);
        setBuyMe(!buyMe);
    }
        

    const handlePaymentChange = (e) => {
        let value = e.target.value;
        setPaymentMethod(value);
        setPaymentLinkError(!validateURL(value));
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
                    <br/>

                    <div className="buy-me-something">
                        <FormControlLabel sx={{ marginTop: "2vh" }} className="buy-me-chkbox"
                            control={
                                <Checkbox checked={buyMe} onChange={handleSetBuyMe}  />
                            }
                            label={`Buy me ${!buyMe ? "something!": ""}`}
                        />
                        {
                            buyMe ?
                            <Fragment>
                                <FormControl sx={{ m: 1, width: 200, marginTop: "1vh" }}>
                                    <InputLabel id="demo-multiple-name-label">Wish List</InputLabel>
                                    <Select
                                        className="buyme-select"
                                        multiple
                                        value={[buyMeSelection]}
                                        onChange={ (e) => { setBuyMeSelection(e.target.value[1]) } }
                                        input={<OutlinedInput label="Wish List" />}
                                    >
                                        {buyMeItems.map((item) => (
                                            <MenuItem
                                                key={item.name}
                                                value={item}
                                            >
                                                {item.name} 
                                                <img className="buyme-icon" src={item.icon} alt="" />
                                            </MenuItem>
                                        ))}
                                    </Select> 
                                </FormControl> 

                                <div className="formbold-mb-3">
                                    <div>
                                        <input
                                            type="text"
                                            name="payment-info"
                                            id="payment-info"
                                            placeholder="Upload your banking QR to GDrive and enter the link here"
                                            className={`formbold-form-input ${paymentLinkError ? "error-input" : ""}`}
                                            value={paymentMethod}
                                            onChange={handlePaymentChange}
                                        />

                                        <label htmlFor="payment-info" className={`formbold-form-label ${paymentLinkError ? "error-label" : ""}`}>
                                            Link to payment
                                        </label>
                                    </div>
                                </div> 
                            </Fragment>: ""
                        }                        
                    </div>

                    <br/>
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
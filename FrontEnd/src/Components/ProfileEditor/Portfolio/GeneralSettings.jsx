import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-hot-toast";

import { postPortfolioDetails } from "../../../Apis/userApis";
import { validateURL } from "../../../Helper/Helper";
import { buyMeItems } from "../../../Constants/Constants";

import { 
    Select, MenuItem, Checkbox,
    FormControl, FormControlLabel,
    OutlinedInput, InputLabel,
    TextField
} from '@mui/material';


const GeneralSettings = (props) => {
    const { 
        portfolioDetails, 
        handleCurrentUserChange, 

        newProfPic, 
        setNewProfPic
    } = props;

    const { 
        greetings: greetingsProp, 
        titles: titlesProp, 
        description: descProp,
        resume: resumeProp,
        buy_me_something: buyMeSomethingProp,
        skills: skillCategoryProp,
        picture: pictureProp
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

    const [ professionalPicture, setProfessionalPicture ] = useState(pictureProp || "");
    const [ uPP, setUPP ] = useState(false);

    const [ titlesError, setTitlesError ] = useState(false);
    const [ resumeError, setResumeError ] = useState(false);
    const [ paymentLinkError, setPaymentLinkError ] = useState(false);

    const [ isLoading, setIsLoading ] = useState(false);
    const DESC_CHARACTER_LIMIT = 300;

    useEffect(() => {
        if(portfolioDetails) {
            setGreeting(greetingsProp);
            setTitles(getTitlesAsString(titlesProp, ", "));
            setDescription(descProp);
            setResume(resumeProp);

            setUPP(pictureProp ? true: false);
            getBuyMeSelection((buyMeSomethingProp || []));
            setTitlesError(!getTitlesAsString(titlesProp, ''));
        }
    }, [portfolioDetails]);

    useEffect(() => {
        if(newProfPic) {
            setProfessionalPicture(newProfPic);
        }

    }, [newProfPic]);


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
            !(!professionalPicture && !pictureProp) && (professionalPicture != pictureProp) ||

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
                "buy_me_something": buyMe ? [buyMeSelection.name, paymentMethod] : [],
                "picture": professionalPicture
            }).then((response) => {
                console.log("postPortfolioDetails: ", response);
                if(response.success) {
                    handleCurrentUserChange({newDetails: response.portfolio_details, _changeKey:"portfolio_info"});
                    setNewProfPic(null);
                    toast("Settings updated successfully!");
                } else {
                    toast("Unable to update settings, please try again later!");
                }
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
                                Job Titles
                            </label>
                        </div>
                    </div>

                    <div className="formbold-textarea">
                        <TextField
                            rows="4"
                            name="prof-descr"
                            id="prof-descr"
                            multiline
                            placeholder="Describe your professional journey!"
                            className="formbold-form-input gs-pd"
                            variant="standard"
                            inputProps={{
                                maxlength: DESC_CHARACTER_LIMIT,
                            }}
                            value={description}
                            onChange={handleDescriptionChange}
                            helperText={`${description.length}/${DESC_CHARACTER_LIMIT}`}
                        ></TextField>
                        <label htmlFor="prof-descr" className="formbold-form-label"> Description </label>
                    </div>
                    <br/>

                    <div className="buy-me-something">
                        <FormControlLabel sx={{ marginTop: "2vh" }} className="buy-me-chkbox chkbox"
                            control={
                                <Checkbox checked={buyMe} onChange={handleSetBuyMe}  />
                            }
                            label={`Buy me ${!buyMe ? "something!": ""}`}
                        />
                        {
                            buyMe ?
                            <Fragment>
                                <FormControl sx={{ m: "1vw", width: "25vw", marginTop: "1vh" }}>
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
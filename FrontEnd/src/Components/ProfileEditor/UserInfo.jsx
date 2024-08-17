import React, { useState, useEffect} from "react";
import { toast } from "react-hot-toast";
import { validatePhNumber } from "../../Helper/Helper";
import { postUserDetails } from "../../Apis/userApis";

const UserInfo = (props) => {
    const { userDetails, handleCurrentUserChange, newProfPic, setNewProfPic } = props;
    
    const [ firstName, setFirstName ] = useState(userDetails?.first_name || "");
    const [ lastName, setLastName ] = useState(userDetails?.last_name || "");
    const [ phNumber, setPhNumber ] = useState(userDetails?.phone_number || "");
    const [ address, setAddress ] = useState(userDetails?.address || "");
    const [ userRoute, setUserRoute ] = useState(userDetails?.user_uid || "");
    const [ profilePicture, setProfilePicture ] = useState(userDetails?.picture || "");

    const [ phValueError, setPhValueError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const setFields = () => {
            if(userDetails) {
                setFirstName(userDetails.first_name);
                setLastName(userDetails.last_name);
                setPhNumber(userDetails.phone_number);
                setAddress(userDetails.address);
                setUserRoute(userDetails.user_uid);
                setProfilePicture(userDetails.picture);
            }   
        }

        setFields();
    }, [userDetails]);

    useEffect(() => {
        if(newProfPic) setProfilePicture(newProfPic);
    }, [newProfPic]);

    const noErrors = () => {
        return !phValueError && firstName && lastName;
    }

    const hasChanged = () => {
        return (
            !(!firstName && !userDetails?.first_name) && (firstName != userDetails?.first_name) ||
            !(!lastName && !userDetails?.last_name) && (lastName != userDetails?.last_name) || 
            !(!phNumber && !userDetails?.phone_number) && (phNumber != userDetails?.phone_number) ||
            !(!address && !userDetails?.address) && (address != userDetails?.address) ||
            !(!profilePicture && !userDetails?.picture) && (profilePicture != userDetails?.picture)
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(noErrors() && hasChanged()) {
            setIsLoading(true);
            await postUserDetails({
                "address": address,
                "first_name": firstName,
                "last_name": lastName,
                "phone_number": phNumber,
                "picture": profilePicture
            }).then((response) => {
                console.log("postUserDetails: ", response);
                if(response.success) {
                    handleCurrentUserChange({newDetails: response.user_details, _changeKey:"user_info"});
                    setNewProfPic(null);
                    toast("User details updated successfully!");
                } else {
                    toast("Unable to update user details, please try again later!");
                }
                    
                setIsLoading(false);
            });
        }
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handlePhNumberChange = (e) => {
        let val = e.target.value;
        setPhNumber(val);
        !val ? setPhValueError(false) : setPhValueError(!validatePhNumber(val));
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleRouteChange = (e) => {
        setUserRoute(e.target.value);
    }

    const changesMade = hasChanged() && noErrors();
    return (
        <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="formbold-input-flex">
                        <div>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="Jane"
                                className="formbold-form-input"
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                            <label htmlFor="firstname" className="formbold-form-label"> First name </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="Cooper"
                                className="formbold-form-input"
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
                            <label htmlFor="lastname" className="formbold-form-label"> Last name </label>
                        </div>
                    </div>

                    <div className="formbold-input-flex">
                        <div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="jane@gmail.com"
                                className="formbold-form-input"
                                value={userDetails?.email || ""}
                                disabled
                            />
                            <label htmlFor="email" className="formbold-form-label"> Email </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="+1 (319) 555 0115"
                                className={`formbold-form-input ${phValueError ? "error-input" : ""}`}
                                value={phNumber}
                                onChange={handlePhNumberChange}
                            />
                            <label htmlFor="phone" className={`formbold-form-label ${phValueError ? "error-label" : ""}`}> Phone </label>
                        </div>
                    </div>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Boston"
                                className="formbold-form-input"
                                value={address}
                                onChange={handleAddressChange}
                            />

                            <label htmlFor="address" className="formbold-form-label">
                                City
                            </label>
                        </div>
                    
                    </div>

                    <div className="formbold-input-flex-var">
                        <div>
                            <input
                                type="text"
                                name="domain"
                                id="domain"
                                placeholder="/"
                                className="formbold-form-input"
                                defaultValue="https://raconteur/"
                                disabled
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="route"
                                id="route"
                                className="formbold-form-input"
                                value={userRoute}
                                onChange={handleRouteChange}
                                disabled
                            />

                            <label htmlFor="route" className="formbold-form-label marL1">
                                Public URL
                                {/* <small>(This is how people find you)</small> */}
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

export default UserInfo;
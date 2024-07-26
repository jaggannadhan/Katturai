import React, { useState, useEffect} from "react";

const UserInfo = (props) => {
    const { currentUser } = props;
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const [ firstName, setFirstName ] = useState(currentUser?.first_name || "");
    const [ lastName, setLastName ] = useState(currentUser?.last_name || "");
    const [ phNumber, setPhNumber ] = useState(currentUser?.phone_number || "");
    const [ address, setAddress ] = useState(currentUser?.address || "");
    const [ userRoute, setUserRoute ] = useState(currentUser?.user_uid || "");

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handlePhNumberChange = (e) => {
        setPhNumber(e.target.value);
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleRouteChange = (e) => {
        setUserRoute(e.target.value);
    }

    const setFields = () => {
        if(currentUser) {
            setFirstName(currentUser.first_name);
            setLastName(currentUser.last_name);
            setPhNumber(currentUser.phone_number);
            setAddress(currentUser.address);
            setUserRoute(currentUser.user_uid);
        }   
    }

    useEffect(() => {

        setFields();
    }, [currentUser]);

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
                                value={currentUser?.email || ""}
                                disabled
                            />
                            <label htmlFor="email" className="formbold-form-label"> Email </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="(319) 555-0115"
                                className="formbold-form-input"
                                value={phNumber}
                                onChange={handlePhNumberChange}
                            />
                            <label htmlFor="phone" className="formbold-form-label"> Phone </label>
                        </div>
                    </div>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                placeholder="1 South Pt Dr"
                                className="formbold-form-input"
                                value={address}
                                onChange={handleAddressChange}
                            />

                            <label htmlFor="address" className="formbold-form-label">
                                Street Address
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
                            />

                            <label htmlFor="route" className="formbold-form-label marL1">
                                Public URL
                                {/* <small>(This is how people find you)</small> */}
                            </label>
                        </div>
                    
                    </div>

                    <button className="formbold-btn">
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserInfo;
import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-hot-toast";

import Work from "./Work";
import { postPortfolioDetails } from "../../../Apis/userApis";
import { deepCloneNested, validateURL } from "../../../Helper/Helper";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const WorkSettings = (props) => {
    const { portfolioDetails, handleCurrentUserChange } = props;
    const { recent_work: recentWorkProp } = portfolioDetails || {};

    const [ recentWork, setRecentWork ] = useState([]);
    const [ errors, setErrors ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if(portfolioDetails)
            setRecentWork(deepCloneNested(portfolioDetails.recent_work || []));

    }, [portfolioDetails]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!errors && hasChanged()) {
            setIsLoading(true);
            let params = {...portfolioDetails};
            params.recent_work = recentWork;
            await postPortfolioDetails(params).then((response) => {
                console.log("postPortfolioDetails: ", response);
                if(response.success) {
                    handleCurrentUserChange({newDetails: response.portfolio_details, _changeKey:"portfolio_info"});
                    toast("Work updated successfully!");
                } else {
                    toast("Unable to update work, please try again later!");
                }
                setIsLoading(false);
            });
        }
    }

    const hasChanged = () => {
        let changedWork = recentWork.reduce((newWork, task) => {
            newWork.push(task.name, task.desc, task.images, task.link);
            return newWork;
        }, []);

        let oldWork = (recentWorkProp||[]).reduce((oldWork, task) => {
            oldWork.push(task.name, task.desc, task.images, task.link);
            return oldWork;
        }, []);

        oldWork = oldWork.flat(4);
        changedWork = changedWork.flat(4);

        return oldWork.toString().replace(',', '') != changedWork.toString().replace(',', '');
    }

    const canCreateNewWork = () => {
        if(!recentWork.length) return true;
        let emptyWork = recentWork.filter(task => !task.name);

        return emptyWork.length  < 1;
    }

    const createNewWork = () => {
        if(!canCreateNewWork()) {
            toast("Cannot add new work when previous work columns are incomplete!", {
                icon: 'ℹ️'
            });
            return;
        }

        let existingWork = [...recentWork];
        existingWork.push({
            name: "",
            desc: "",
            images: [],
            link: ""
        });
        setRecentWork(existingWork);
    }

    const changesMade = hasChanged() && !errors;

    return (
        <section className="recent-work-section">
            <div className="formbold-main-wrapper">
                <div className="formbold-form-wrapper">
                    <form onSubmit={handleSubmit}>
                    
                        <div className="add-recent-work">
                            <p>Work</p>
                            <AddCircleOutlineIcon 
                                className="add-btn"
                                onClick={createNewWork}
                            />
                        </div>

                        {
                            recentWork.map((work, wrkIdx) => {
                                return (
                                    <Work
                                        key={`work-${wrkIdx}`}
                                        work={work}
                                        wrkIdx={wrkIdx}
                                        recentWork={recentWork}
                                        setRecentWork={setRecentWork}
                                    />
                                )
                            })
                        }
                        
                        <button className="formbold-btn" disabled={!changesMade || isLoading}>
                            Save Profile
                            {isLoading ? <span className="req-loader"></span> : ""}
                        </button>

                    </form>
                </div>
            </div>
        </section>
    )
}


export default WorkSettings;
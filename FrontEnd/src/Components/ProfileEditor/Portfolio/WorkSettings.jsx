import React, { useState, useEffect, Fragment } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { toast } from "react-hot-toast";

import Work from "./Work";
import { postPortfolioDetails } from "../../../Apis/userApis";
import { deepCloneNested, validateURL } from "../../../Helper/Helper";

import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const WorkSettings = (props) => {
    const { portfolioDetails, handleCurrentUserChange, showUserPrompt } = props;
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
            newWork.push(task.title, task.desc, task.images, task.link);
            return newWork;
        }, []);

        let oldWork = (recentWorkProp||[]).reduce((oldWork, task) => {
            oldWork.push(task.title, task.desc, task.images, task.link);
            return oldWork;
        }, []);

        oldWork = oldWork.flat(4);
        changedWork = changedWork.flat(4);

        return oldWork.toString().replace(',', '') != changedWork.toString().replace(',', '');
    }

    const noErrors = () => {
        let hasError = false;
        
        recentWork.forEach(work => {
            if(!work.title) {
                hasError = true;
                return;
            } else if(work.link ? !validateURL(work.link): false) {
                hasError = true;
                return;
            } 
        });

        if(errors != hasError)
            setErrors(hasError);

    }

    const canCreateNewWork = () => {
        if(!recentWork.length) return true;
        let emptyWork = recentWork.filter(task => !task.title);

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

    const deleteRecentWork = (wrkIdx) => {
        let newRecentWork = recentWork.filter((work, idx) => idx != wrkIdx);
        setRecentWork(newRecentWork);
    }

    const changesMade = hasChanged() && !noErrors();
    const dragControls = useDragControls();

    return (
        <section className="recent-work-section">
            <div className="formbold-main-wrapper">
                <div className="formbold-form-wrapper">
                    <form onSubmit={handleSubmit}>
                    
                        <div className="add-recent-work">
                            <p>Work</p>
                            <Tooltip title="Add new work" placement="right">
                                <AddCircleOutlineIcon 
                                    className="add-btn"
                                    onClick={createNewWork}
                                />
                            </Tooltip>
                        </div>

                        <Reorder.Group axis="y" values={recentWork} onReorder={setRecentWork}>
                        {
                            recentWork.map((work, wrkIdx) => {
                                return (
                                    <WorkItem 
                                        key={`wrk-item-${wrkIdx}`} 
                                        work={work} 
                                        wrkIdx={wrkIdx}
                                        recentWork={recentWork}
                                        setRecentWork={setRecentWork}
                                        deleteRecentWork={deleteRecentWork}
                                        showUserPrompt={showUserPrompt}
                                    />
                                )
                            })
                        }
                        </Reorder.Group>
                        
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

const WorkItem = (props) => {
    const { work, wrkIdx } = props;
    const dragControls = useDragControls();
  
    return (
      <Reorder.Item
        value={work}
        id={"workItem-"+wrkIdx}
        dragListener={false}
        dragControls={dragControls}
      >
        <Work 
            {...props}
            dragControls={dragControls}
        />
      </Reorder.Item>
    );
  };
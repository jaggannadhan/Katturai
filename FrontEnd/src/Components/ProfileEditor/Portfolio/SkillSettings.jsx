import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { postPortfolioDetails } from "../../../Apis/userApis";
import { validateURL, deepCloneNested } from "../../../Helper/Helper";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Tooltip from '@mui/material/Tooltip';

import Skills from "./Skills";

const SkillSettings = (props) => {
    const { portfolioDetails, handleCurrentUserChange } = props;
    const { 
        greetings: greetingsProp, 
        titles: titlesProp, 
        description: descProp,
        resume: resumeProp,
        skills: skillCategoryProp
    } = portfolioDetails || {};


    const [ skillCategory, setSkillCategory ] = useState(deepCloneNested(skillCategoryProp || []));
    const [ numberOfCategories, setNumberOfCategories ] = useState([]);

    const [ expandSkills, setExpandSkills ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if(portfolioDetails) {
            setSkillCategory(deepCloneNested(skillCategoryProp || []))
        }
    }, [portfolioDetails]);

    const noErrors = () => {
        return true;
    }

    const hasChanged = () => {
        return checkSkillCategoryChanged();
    }

    const checkSkillCategoryChanged = () => {
        let changedSkills = skillCategory.reduce((newSkills, category) => {
            newSkills.push(category.name, [...category.skills.map(skill => {return [skill.name, skill.subSkills]})]);
            return newSkills;
        }, []);

        let oldSkills = (skillCategoryProp||[]).reduce((oldSkills, category) => {
            oldSkills.push(category.name, [...category.skills.map(skill => {return [skill.name, skill.subSkills]})]);
            return oldSkills;
        }, []);

        oldSkills = oldSkills.flat(4);
        changedSkills = changedSkills.flat(4);

        return oldSkills.toString().replace(',', '') != changedSkills.toString().replace(',', '');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        prepSkillsForExport();

        if(noErrors() && hasChanged()) {
            setIsLoading(true);
            await postPortfolioDetails({
                "greetings": greetingsProp,
                "titles": titlesProp,
                "description": descProp,
                "resume": resumeProp,
                "skills": skillCategory
            }).then((response) => {
                console.log("postPortfolioDetails: ", response);
                if(response.success) {
                    handleCurrentUserChange({newDetails: response.portfolio_details, _changeKey:"portfolio_info"});
                    toast("Skills updated successfully!");
                } else {
                    toast("Unable to skills, please try again later!");
                }
                setIsLoading(false);
            });
        }
    }

    const canCreateNewSkillCategory = () => {
        if(!skillCategory.length) return true;
        let emptyCategories = skillCategory.filter(category => !category.name);

        return emptyCategories.length < 1;
    }

    const createNewSkillCategory = () => {
        if(!canCreateNewSkillCategory()) return;

        setExpandSkills(true);

        let categories = [...skillCategory];
        categories.push({
            name: "",
            skills: [{
                name: "",
                subSkills: []
            }]
        });

        let numCategories = [...numberOfCategories];
        numCategories.push(`Category${numCategories.length + 1}`);
        
        setSkillCategory([...categories]);
        setNumberOfCategories([...numCategories]);
    }

    const handleCategoryNameChange = (e, index) => {
        let categoryName = e.target.value;
        let tempSkillCategory = [...skillCategory];
        tempSkillCategory[index].name = categoryName;
        setSkillCategory([...tempSkillCategory]);
    }

    const handleSkillNameChange = (e, index) => {
        let skillNames = e.target.value;
        let skillsArr = skillNames.split(",");
        // skillsArr = skillsArr.map(skill => skill.trim());

        let tempCategory = [...skillCategory];
        let changedCategory = tempCategory[index];
        let tempSkills = changedCategory.skills;

        changedCategory.skills = skillsArr.map((skill, idx) => {
            return {
                name: skill,
                subSkills: tempSkills[idx]?.subSkills || []
            }
        });

        setSkillCategory([...tempCategory]);
    }

    const handleSubSkillsChange = (e, catIdx, skillIdx) => {
        let subSkillNames = e.target.value;
        let subSkillArr = subSkillNames.split(",");
        // subSkillArr = subSkillArr.map(subSkill => subSkill.trim());

        let tempCategory = [...skillCategory];
        let changedCategory = tempCategory[catIdx];
        let tempSkills = changedCategory.skills;

        let tempSkill = tempSkills[skillIdx];
        tempSkill.subSkills = subSkillArr;

        setSkillCategory([...tempCategory]);
    }

    const removeCategory = (catIdx) => {
        let tempCategory = [...skillCategory];
        tempCategory = tempCategory.filter((category, idx) => idx!=catIdx);
        setSkillCategory([...tempCategory]);
    }

    const removeSkills = (catIdx) => {
        let tempCategory = [...skillCategory];
        tempCategory = tempCategory.map((category, idx) => {
           if(idx!=catIdx) return category;
            category.skills = [{
                name: "",
                subSkills: []
            }]
            return category;
        });
        setSkillCategory([...tempCategory]);
    }

    const prepSkillsForExport = () => {
        let tempCategory = [...skillCategory];
        tempCategory = tempCategory.reduce((newCat, category) => {
            if(!category.name) return newCat;
            if(!category.name.trim()) return newCat;

            let newskills = (category.skills || []).reduce((newSkillArr, skill) => {
                if(!skill.name) return newSkillArr;
                if(!skill.name.trim()) return newSkillArr;

                let newSubSkills = (skill.subSkills || []).reduce((newSubSkillArr, subSkill) => {
                    if(!subSkill) return newSubSkillArr;
                    if(!subSkill.trim()) return newSubSkillArr;
                    
                    newSubSkillArr.push(subSkill.trim());
                    return newSubSkillArr;
                }, []);

                skill.name = skill.name.trim();
                skill.subSkills = newSubSkills;
                newSkillArr.push(skill);
                return newSkillArr;
            }, []);

            category.name = category.name.trim();
            category.skills = newskills;
            newCat.push(category);
            return newCat;
        }, []);

        setSkillCategory([...tempCategory]);
    }

    const changesMade = hasChanged() && noErrors();
    return (
        <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
                <form onSubmit={handleSubmit}>

                    <section className="skills-section">
                        {
                            skillCategory?.length ?
                            expandSkills ?

                            <Tooltip title="Minimize" placement="left">
                                <ExpandLessIcon className="expand-skills" onClick={() => setExpandSkills(!expandSkills)}/> 
                            </Tooltip> :
                            <Tooltip title="Expand" placement="left">
                                <ExpandMoreIcon className="expand-skills" onClick={() => setExpandSkills(!expandSkills)}/> 
                            </Tooltip> : ""
                        }

                        <div className="add-skills">
                            <p>Skills</p>
                            <Tooltip title="Add Skill" placement="right">
                                <AddCircleOutlineIcon 
                                    className="add-btn"
                                    onClick={createNewSkillCategory}
                                />
                            </Tooltip>
                        </div>

                        {
                            expandSkills && skillCategory.map((category, index) => {
                                return (
                                    <Skills 
                                        key={`skillCategory-${index+1}`}
                                        catIndex={index}
                                        category={category}
                                        handleCategoryNameChange={handleCategoryNameChange}
                                        handleSkillNameChange={handleSkillNameChange}
                                        handleSubSkillsChange={handleSubSkillsChange}
                                        removeCategory={removeCategory}
                                        removeSkills={removeSkills}
                                    />
                                )
                            })
                        }
                    </section>
                    

                    <button className="formbold-btn" disabled={!changesMade || isLoading}>
                        Save Profile
                        {isLoading ? <span className="req-loader"></span> : ""}
                    </button>
                    
                </form>
            </div>
        </div>
    )
}

export default SkillSettings;
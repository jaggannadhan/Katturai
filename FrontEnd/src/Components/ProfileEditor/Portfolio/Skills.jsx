import React, { useState, useEffect, Fragment } from "react";

import Tooltip from "@mui/material/Tooltip";
import CloseIcon from '@mui/icons-material/Close';

const Skills  = (props) => {
    const { catIndex, category, removeSkills,
        handleCategoryNameChange, handleSkillNameChange, 
        handleSubSkillsChange, removeCategory
    } = props;
    let skills = category.skills;
    let skillNames = skills.map(skill => (skill.name || "")).join(",");


    let categoryId = "category"+(catIndex+1);
    let skillId = "category"+(catIndex+1)+"skills";

    return (
        <Fragment>
            <div className="formbold-input-flex">
                <div>
                    <Tooltip title="Remove Category" placement="top">
                        <CloseIcon className="remove-category"
                            onClick={() => removeCategory(catIndex)}
                        />
                    </Tooltip>
                    <input
                        type="text"
                        name={categoryId}
                        id={categoryId}
                        placeholder={"Category "+(catIndex+1)}
                        className="formbold-form-input"
                        value={category.name}
                        onChange={(e) => handleCategoryNameChange(e, catIndex)}
                    />
                    <label htmlFor={categoryId} className="formbold-form-label"> Category </label>
                </div>
                {
                    category.name?
                    <div>
                        <Tooltip title="Remove All Skills" placement="top">
                            <CloseIcon className="remove-category"
                                onClick={() => removeSkills(catIndex)}
                            />
                        </Tooltip>
                        <input
                            type="text"
                            name={skillId}
                            id={skillId}
                            placeholder="eg: skill1, skill2, ..."
                            className="formbold-form-input"
                            value={skillNames}
                            onChange={(e) => handleSkillNameChange(e, catIndex)}
                        />
                        <label htmlFor={skillId} className="formbold-form-label"> {`Skills for ${category.name}`} </label>
                    </div> : ""
                }
                
            </div>
            {
                skills.map((skill, skillIdx) => {
                    let subSkills = (skill.subSkills || []).join(",");
                    let subSkillId = skillId+(skillIdx+1);

                    return ( skill.name ?
                        <div className="formbold-mb-3" key={subSkillId}>
                            <div>
                                <input
                                    type="text"
                                    name={subSkillId}
                                    id={subSkillId}
                                    placeholder="eg: subskill1, subskill2, ..."
                                    className={"formbold-form-input"}
                                    value={subSkills}
                                    onChange={(e) => handleSubSkillsChange(e, catIndex, skillIdx)}
                                />

                                <label htmlFor={subSkillId} className={"formbold-form-labe"}>
                                    {`Sub Skills for ${skill.name}`}
                                </label>
                            </div>
                        </div>: ""
                    )
                })
            }
            
        </Fragment>
    )
}

export default Skills;
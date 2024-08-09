import React, { useState, useEffect, Fragment } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

import "../../../Styles/ProfileEditor/EditorGallery.scss";

const EditorGallery = (props) => {
    const { 
        images, removeUploadedImage
    } = props;
    
    return (
        <div className="gallery-section">
            {
                images.map((img, idx) => {
                    return (
                        <Fragment key={`gallery-item-${idx}`}>
                            <img 
                                className="gallery-item"
                                src={img} alt={`img-${idx}`} 
                                onClick={() => {}}
                            />
                            <CancelIcon 
                                className="remove-gallery-item"
                                onClick={() => removeUploadedImage(idx)}
                            />
                        </Fragment>
                    )
                })
            }
        </div>
    );
}

export default EditorGallery;
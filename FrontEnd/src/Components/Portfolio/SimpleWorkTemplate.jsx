import React, { Fragment, useState, useRef } from "react";
import { ImgGallery } from "../ImgGallery";

const SimpleWorkTemplate = (props) => {
    const { work, idx } = props;
    const { title, desc, images, link } = work || {};

    const [ showOverlay, setShowOverlay ] = useState(false);
    const overlay = useRef(null);

    const handleOverlayClick = (e) => {
        e.preventDefault();
        if(e.target == overlay?.current)
            setShowOverlay(false);
    }


    return (
        <section className={`work-preview-simple ${showOverlay ? 'non-sticky': ''}`}>
            <div className="work-info-simple">
                {
                    link ?
                    <p className="work-title">
                        <a href={link} target="blank">{title}</a>
                    </p> : 

                    images ?
                    <p className="work-title">
                        <a onClick={() => setShowOverlay(true)}>{title}</a>
                    </p> : ""
                }
                    
                <p className="work-desc">{desc}</p> 
                
            </div>

            {
                showOverlay ? 
                <div className="work-overlay" ref={overlay} onClick={handleOverlayClick}>
                    <ImgGallery
                        images={images}
                    />
                </div> : ""
            }
            
        </section>  
    );
}

export default SimpleWorkTemplate;


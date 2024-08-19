import React, { useState, useRef, useEffect } from "react";
import Tilt from 'react-parallax-tilt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ImgGallery } from "../ImgGallery";

const TiledWorkTemplate = (props) => {
    const { work, idx } = props;
    const { title, desc, images, link } = work || {};

    const [ showOverlay, setShowOverlay ] = useState(false);
    const overlay = useRef(null);

    const handleOverlayClick = (e) => {
        e.preventDefault();
        if(e.target == overlay?.current)
            setShowOverlay(false);
    }

    useEffect(() => {}, [work]);

    return (
        <section className="work-tiles" >
            
            <Tilt
                key={`work-info-${idx}`}
                tiltReverse tiltMaxAngleX={15} tiltMaxAngleY={15}
            >
                <div className="work-info">
                    <header> 
                        <span></span> 
                        <span></span>
                        <span></span>
                    </header>
                    <img src={images[0]} alt="" />
                    <div>
                        <h4>{title}</h4>
                        <p className="work-desc">{desc}</p>
                    </div>
                    
                </div>

            
                <div className="tile-overlay" onClick={() => {setShowOverlay(true)} }>
                    <VisibilityIcon className="preview-ico" />
                </div>

            </Tilt>

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

export default TiledWorkTemplate;


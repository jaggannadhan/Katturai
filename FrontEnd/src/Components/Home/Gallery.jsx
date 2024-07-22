import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';

import '../../Styles/Home/Gallery.scss';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CameraIcon from '@mui/icons-material/Camera';
import HikingIcon from '@mui/icons-material/Hiking';

import bg1 from "../../../public/images/bg1.jpg";
import bg2 from "../../../public/images/bg2.jpg";
import bg3 from "../../../public/images/bg3.jpg";
import bg4 from "../../../public/images/bg4.jpg";
import bg5 from "../../../public/images/bg5.jpg";

import { uuid } from '../../Helper/Helper';


const galleryNav = {
    gallery : { name: "Gallery", icon: CameraIcon },
    fitness: { name: "Fitness", icon: FitnessCenterIcon },
    travel: { name: "Travel", icon: HikingIcon }
}

const unselectedStyles = {
    color: "black",
    background: "white",
    boxShadow: "unset",
}

const Gallery = (props) => {

    const [ selected, setSelected] = useState(galleryNav.gallery);

    function handleSelect(newSelect) {
        setSelected(newSelect);
    }

    return (
        <Grid container alignItems="center" className='gallery'>
            <Grid item className="gallery-nav">
                {
                    Object.values(galleryNav).map((icon) => {
                        let isSelected = icon.name == selected.name;
                        return(
                            <Button variant="contained" color="secondary" 
                                sx={isSelected ? {} : unselectedStyles }
                                className={`gallery-nav-items ${isSelected ? "" : "unselected"}`} key={uuid()} 
                                onClick={() => handleSelect(icon)}
                            >
                                <icon.icon className='svg_icons' />
                                <p>{icon.name}</p>
                            </Button>
                        );
                    })
                }
            </Grid>
            <Grid container justifyContent="center" alignItems="center" className='gallery-img jss108'>
                {/* {[bg1, bg2, bg3, bg4].map((_img) => ( */}
                    <Grid item className='jss109' key={uuid()} xs={12} sm={12} md={4} >
                        <img src={bg1} alt={`bg<x>`} className="jss6 jss9" />
                        <img src={bg2} alt={`bg<x>`} className="jss6 jss9" />
                        <img src={bg3} alt={`bg<x>`} className="jss6 jss9" />
                    </Grid>
                    <Grid item className='jss109' key={uuid()} xs={12} sm={12} md={4} >
                        <img src={bg4} alt={`bg<x>`} className="jss6 jss9 jss10" />
                        <img src={bg5} alt={`bg<x>`} className="jss6 jss9 jss10" />
                    </Grid>
                {/* ))} */}
            </Grid>
            
        </Grid>
    );
};

export default Gallery;

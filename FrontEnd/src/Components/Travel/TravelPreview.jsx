import React from 'react';
import { Typography } from '@material-ui/core';

import myImg from "../../../public/images/preview/campingManali.jpeg";

import '../../Styles/Travel/TravelPreview.scss';

const Preview = () => {
  return (
    <div className="travel-preview-img-container">
      <img
        className="travel-preview-img"
        src={myImg}
        alt="landing background"
      />

      <div className="travel-overlay">
        <div className="travel-overlay-content">
          <Typography className="travel-overlay-text">Where the stars take me</Typography>
          <Typography className="travel-overlay-text-small">Away from the concrete jungle </Typography>
        </div>
      </div>
    </div>
  );
};

export default Preview;
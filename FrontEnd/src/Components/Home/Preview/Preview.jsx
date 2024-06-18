import React from 'react';
import { Typography } from '@material-ui/core';
import bg6 from "../../../../public/images/bg6.jpeg";


import '../../../Styles/Home/Preview/Preview.scss';

const Preview = () => {
  return (
    <div className="preview-img-container">
      <img
        className="preview-img"
        src={bg6}
        alt="landing background"
      />
      <div className="overlay">
        <div className="overlay-content">
          <Typography className="overlay-text">戦い</Typography>
          <Typography className="overlay-text-small">Tatakai</Typography>
        </div>
      </div>
    </div>
  );
};

export default Preview;

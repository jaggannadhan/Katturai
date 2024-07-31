import React from 'react';
import { Typography } from '@material-ui/core';
import bg6 from "../../../public/images/preview/bg6.jpeg";


import '../../Styles/Home/Preview.scss';

const Preview = (props) => {
  const { tagline, subtext } = props;

  return (
    <div className="preview-img-container">
      <img
        className="preview-img"
        src={bg6}
        alt="landing background"
      />
      <div className="overlay">
        <div className="overlay-content">
          <Typography className="overlay-text">{tagline}</Typography>
          <Typography className="overlay-text-small">{subtext}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Preview;

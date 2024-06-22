import React from 'react';
import { Typography } from '@material-ui/core';

import myImg from "../../../public/images/fallFoilage.jpeg";
import readingBook from "../../../public/images/readingBook.png";

import '../../Styles/Diary/DiaryPreview.scss';

const Preview = () => {
  return (
    <div className="diary-preview-img-container">
      <img
        className="diary-preview-img"
        src={myImg}
        alt="landing background"
      />

      <img src={readingBook} className='diary-reading'></img>
      <div className="diary-overlay">
        <div className="diary-overlay-content">
          <Typography className="diary-overlay-text">Where the stars take me</Typography>
          <Typography className="diary-overlay-text-small">in bliss...</Typography>
        </div>
      </div>
    </div>
  );
};

export default Preview;

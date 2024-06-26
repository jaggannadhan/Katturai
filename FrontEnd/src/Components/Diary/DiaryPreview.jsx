import React from 'react';
import { Typography } from '@material-ui/core';

import myImg from "../../../public/images/preview/fallFoilage.jpeg";
import readingBook from "../../../public/images/diary/readingBook.png";

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
          <Typography className="diary-overlay-text">Organize your thoughts</Typography>
          <Typography className="diary-overlay-text-small">when they flow deep...</Typography>
        </div>
      </div>
    </div>
  );
};

export default Preview;

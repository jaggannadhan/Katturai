import React, { useState, useEffect, Fragment } from "react";
import Preview from "./DiaryPreview";
import DiaryCard from "./DiaryCard";

import { 
    Container,
    Pagination,
    Stack
} from "@mui/material";

import "../../Styles/Diary/Diary.scss";
import { uuid } from "../../Helper/Helper";

import cardImg1 from "../../../public/images/diary/fireWatchParallax.gif";
import cardImg2 from "../../../public/images/diary/studyWithRain.gif";
import cardImg3 from "../../../public/images/diary/spideyComics.gif";
import cardImg4 from "../../../public/images/diary/guysDiaryLofi.gif";
import cardImg5 from "../../../public/images/diary/harrysDiary.gif";
import cardImg6 from "../../../public/svgs/spaceTravel.svg";
import cardImg7 from "../../../public/images/diary/movingClouds.gif";

import addNote from "../../../public/images/diary/addNote.png";



const Diary = (props) => {
    return (
        <Fragment>
            <Preview />
            <img src={addNote} className="diary-add-note" />

            <Container className="diary-card-cont">
                {[cardImg1, cardImg2, cardImg3, cardImg4, cardImg5, cardImg6, cardImg7].map((elm, index) => {
                    return(
                        <DiaryCard 
                            key={uuid()}
                            cardImg={elm}
                            flipIndex={index+1}
                        />
                    )
                })}
            </Container>

            <Stack spacing={2} className="diary-pagination">
                <Pagination count={10} variant="outlined" shape="rounded" />
            </Stack>
            
        </Fragment>
    );
}

export default Diary;


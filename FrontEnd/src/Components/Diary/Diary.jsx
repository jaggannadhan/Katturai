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

import cardImg1 from "../../../public/images/fireWatchParallax.gif";
import cardImg2 from "../../../public/images/studyWithRain.gif";
import cardImg3 from "../../../public/images/spideyComics.gif";
import cardImg4 from "../../../public/images/guysDiaryLofi.gif";
import cardImg5 from "../../../public/images/harrysDiary.gif";
import cardImg6 from "../../../public/svgs/spaceTravel.svg";
import cardImg7 from "../../../public/images/movingClouds.gif";

import addNote from "../../../public/images/addNote.png";
import buzzBee from "../../../public/images/buzzBee.gif";



const Diary = (props) => {
    return (
        <Fragment>
            <Preview />
            <img src={addNote} className="diary-add-note" />
            <img src={buzzBee} className="diary-buzz-bee" />

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


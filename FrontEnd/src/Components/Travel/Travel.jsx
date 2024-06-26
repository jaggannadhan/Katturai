import React, { useState, useEffect, Fragment } from "react";
import { Chrono } from "react-chrono";

import { 
    Container,
    Pagination,
    Stack
} from "@mui/material";

import Preview from "./TravelPreview";

import "../../Styles/Travel/Travel.scss";
import newYork from "../../../public/images/travel/newYork.jpg";
import providence from "../../../public/images/travel/providence.jpg";
import salem from "../../../public/images/travel/salem.jpg";
import coimbatore from "../../../public/images/travel/coimbatore.jpg";
import munnar from "../../../public/images/travel/munnar.jpg";
import goa from "../../../public/images/travel/goa.jpg";
import batal from "../../../public/images/travel/batal.jpg";

import mapPin from "../../../public/images/travel/mapPin.webp";

const Travel = (props) => {

    useEffect(() => {

        function removeItemsFromControlPanel() {
            try {
                const controlPanel = document.getElementsByClassName("ExtraControlChild-sc-cif21b-8");
                controlPanel.length ? controlPanel[0].style.display = "none" : "";
            } catch(e) {
                console.log("travel component: ", e);
            }
        }
        removeItemsFromControlPanel();

    }, [])
    

    const items = [
        {
            title: "June 2024",
            cardTitle: "New York",
            // url: "http://www.history.com",
            cardSubtitle:"New York City had always been on the top of my bucket list and I knew I would love NYC before I even visited it.",
            cardDetailedText: `Day 1
            Our trip to New York City started in Queens as we landed on a nice and sunny afternoon at LaGuardia Airport. We hopped into the iconic yellow cab that took us to our hotel - The Hampton Inn. The drive from the airport to our hotel gave us a good feel of the city and it was exactly how we'd imagined it to be.
            The Hampton Inn is conveniently located in the heart of Midtown Manhattan and is just a two-minute walk from Times Square. After checking in to our hotel, we had the entire evening to start experiencing all the great things NYC has to offer. We walked around Times Square, which is the most touristy and frenetic part of the city. Even after dark, the lights from all the billboards trick you into believing it is still daytime.`,
            media: {
                type: "IMAGE",
                source: {
                    url: newYork
                }
            }
        },
        {
            title: "Dec 2023",
            cardTitle: "Salem",
            // url: "http://www.history.com",
            cardSubtitle:"Haunted Happenings",
            cardDetailedText: `While Salem is home to a slew of spooktacular events, attractions, and festivities all year long, the Haunted Happenings festival, which takes place every October, truly takes the cake.
            The annual Haunted Happenings Grand Parade kicks off the festivities for Halloween in Salem in early October with music, pageantry, and floats.  The event, all performances, floats, vehicles, and displays 
            will be stationary while attendees parade around the route, which includes the streets surrounding Salem Common and along Hawthorne Boulevard and Essex, Central, and Charter Streets.`,
            media: {
                type: "IMAGE",
                source: {
                    url: salem
                }
            }
        },
        {
            title: "Nov 2023",
            cardTitle: "Providence",
            // url: "http://www.history.com",
            cardSubtitle:"Jack O' Lantern @ Roger Willams Park Zoo",
            cardDetailedText: `A jack-o'-lantern is a lantern made from a hollowed-out pumpkin with a carved face and candle inside, often used as a Halloween decoration.
            Although millions of Americans carve pumpkins every autumn, not many know why or how this tradition got started. As it turns out, we can thank an Irish myth about a man named Jack.`,
            media: {
                type: "IMAGE",
                source: {
                    url: providence
                }
            }
        },
        {
            title: "June 2022",
            cardTitle: "Spiti Valley",
            // url: "http://www.history.com",
            cardSubtitle:"A pit stop in BAATAL",
            cardDetailedText: `Like any other young traveller, I had a few must do’s in my list, and without much surprise, my list also included the vast, intimidating Spiti Valley of Himachal Pradesh with its naked treeless mountains and rubble for roads. And so, after seven months and nine destinations of travelling frequently, I finally decided to push myself further up (pun intended!) 
            How this decision of going to Spiti came about, is a whole different story.`,
            media: {
                type: "IMAGE",
                source: {
                    url: batal
                }
            }
        },
        {
            id: "May2022",
            title: "May 2022",
            cardTitle: "Coimbatore",
            url: "#May2022",
            cardSubtitle:"On our way to the SILENT VALLEY!",
            cardDetailedText: `Silent Valley National Park (40 km northwest of Mannarkkad) The 89.52 sq.km national park is believed to be the sole surviving bit of evergreen forest in the Sahya Ranges. The peculiarity of the Silent Valley Forest is that it is even devoid of the chirping of cicadas’. Vehicular transport is possible only up to Mukkali, nearly 24 km from the park.
            The rest of the way has to be covered by foot, up to the source of Kunthipuzha, which flows through the valley before merging into the Bharathapuzha River. The closest to a virgin forest in the entire Western Ghats, the Silent Valley National Park is home to India’s last substantial stretch of tropical evergreen forests. `,
            media: {
                type: "IMAGE",
                source: {
                    url: coimbatore
                }
            }
        },
        {
            title: "May 2022",
            cardTitle: "Munnar",
            // url: "http://www.history.com",
            cardSubtitle:"A workation deep in Konnathady  (കൊന്നത്തടി) and Ponmudi near Idukki!",
            cardDetailedText: `Munnar is beautiful beyond words. There is much more to Munnar which meets the eye. People visiting Munnar stick to hotspots or often follow the guide’s instructions. 
            The journey is more enjoyable due to vivid sceneries, lush green forest and it does get cold on the way to the top. Travelling for almost 4 hours, I finally reached Munnar at 4.00 in the evening; I could actually notice tea selling shops. They serve tea in a huge glass almost like a milkshake, price may differ from one shop to another i.e. (10-15 rupees) but the quantity is almost the same. 
            The town is crowded and obviously commercial, filled with hotels, motels, shopping districts. However Munnar is also special for home stays which cuts you off from the regular routine and takes you deep into the jungle and Tea estates which have been hardly explored.`,
            media: {
                type: "IMAGE",
                source: {
                    url: munnar
                }
            }
        },
        {
            title: "May 2022",
            cardTitle: "Goa",
            // url: "http://www.history.com",
            cardSubtitle:"New year bash in GOA!",
            cardDetailedText: `As the year draws to a close, there's no better place to bid farewell to the old and welcome the new than the vibrant beaches and lively streets of Goa. Renowned for its pulsating nightlife, Goa transforms into a dazzling playground for revellers during New Year's Eve.
            The whole of Goa is lit up as New year approaches, all the churches, the beaches looking beautiful as ever. During the New Year, the day can be over, the sun can be set but the party never ends.
            Candolim Beach: Candolim Beach is a quieter spot to celebrate New Year's Eve in Goa. Many beachside resorts offer New Year's Eve parties with music and dancing, and you can also enjoy a midnight beach walk. Morjim Beach: Morjim Beach is another great option to celebrate New Year's Eve in Goa.`,
            media: {
                type: "IMAGE",
                source: {
                    url: goa
                }
            }
        },
    ];

    return (
        <Fragment>
            <Preview />
            {/* <img className="mapPin" src={mapPin} ></img> */}
            <Container className="travel-timeline-cont">
                <div className="travel-timeline">
                    <Chrono items={items} mode="VERTICAL_ALTERNATING" 
                        slideItemDuration={1400} 
                        slideShow 
                        enableLayoutSwitch 
                    />
                </div>
            </Container>
            
        </Fragment>
    );
}

export default Travel;
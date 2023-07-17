import React, { createRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../administrator/sevices/fetchNodeServices";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ArrowForwardIos } from "@mui/icons-material";
//use for MediaQueary----------->>>>>> 
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from "@mui/styles";
import { useStyle } from "./userinterfaceCss";


export default function DealSlider() {

    var sliderRef = createRef()

    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs')); //sm= 450
    const sm = useMediaQuery(theme.breakpoints.down('sm')); //sm= 450
    const md = useMediaQuery(theme.breakpoints.down('md')); //md size=600
    const lg = useMediaQuery(theme.breakpoints.up('lg'));   //1000px 

    const classes = useStyle()


    var Settings = {
        dots: false,
        infinte: true,
        speed: 1000,
        slidesToShow: xs ? 1 : sm ? 2 : md ? 3 : 4,
        SliderToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    }

    var images = [
        { id: 1, images: 's1.webp' },
        { id: 2, images: 's2.webp' },
        { id: 3, images: 's3.webp' },
        { id: 4, images: 's4.webp' },
        { id: 5, images: 's5.webp' },
        { id: 6, images: 's6.webp' },
        { id: 7, images: 's7.webp' },
        { id: 8, images: 's8.webp' }
    ]

    const showImages = () => {
        return images.map((item) => {
            return (
                <div data-aos="flip-right"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                    data-aos-delay="1000" >
                    <div style={{ marginLeft: "8%",  marginTop: "3%",justifyContent:'center',display:'flex',alignItems:'center'}} className={classes.hoverProductComponant} >
                        <img src={`${serverURL}/images/${item.images}`} style={{ height: xs ? 10 : sm ? '17vh' : md ? '20vh' : '26vh', width: sm ? '40vw' : md ? '30vw' : '28vw', }} />
                    </div>
                </div>
            )
        })
    }


    return (
        <div>
            <Slider {...Settings} ref={sliderRef} >
                {showImages()}
            </Slider>
        </div>

    )
}
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

export default function Bannercomponents(props) {

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
   
    var sliderRef = createRef()

    var Settings = {
        dots: false,
        infinte: true,
        speed: 1000,
        SlidesToShow: 3,
        SlideToScroll: 1,  
        autoplay: true,
        autoplaySpeed: 5000
    };

    const showImages = () => {
        return props.images.map((item) => {
            return (
                <div data-aos="flip-down"data-aos-duration="500" >
                    <img src={`${serverURL}/images/${item}`} style={{ width: "99.9%", height: sm ? "21vh" : md ? '26vh' : '42vh', marginTop: sm ? "3%" : md ? "3%" : "0%" }} width="100%" />
                </div>
            )
        })
    }

    const handleBackClick = () => { 
        sliderRef.current.slickNext()
    }

    const handleForwardClick = () => {
        sliderRef.current.slickPrev()
    }

    return (<>
        <div style={{ position: 'relative' }}>

            <div style={{overflow: "hidden", borderRadius: 20, margin: '2%' }}>
                {!lg ? <>   <div style={{ position: 'absolute', top: 130, left: 80, zIndex: 2, width: "2.3%", height: "12%", borderRadius: "50%", display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5, background: '#fff', cursor: 'pointer' }} >
                    <ArrowBackIosIcon style={{ color: '#000',display:'flex',alignSelf:'center',marginLeft:5 }} onClick={handleBackClick} />
                </div> </> : <></>}
                <Slider {...Settings} ref={sliderRef} >
                    {showImages()}
                </Slider>
                {!lg ? <> <div style={{ position: 'absolute', top: 130, right: 80, zIndex: 2, width: "2.3%", height: "12%", borderRadius: "50%", display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5, background: '#fff', cursor: 'pointer' }}>
                    <ArrowForwardIos style={{ color: '#000' }} onClick={handleForwardClick} />
                </div></> : <></>}
            </div>   

        </div>
    </>
    )
}
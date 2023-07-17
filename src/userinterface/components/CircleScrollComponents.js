import React, { createRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../administrator/sevices/fetchNodeServices";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ArrowForwardIos } from "@mui/icons-material";

//use for MediaQueary----------->>>>>> 
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useStyle } from "./userinterfaceCss";
import Aos from "aos";
import 'aos/dist/aos.css'


import Skeleton from '@mui/material/Skeleton';


Aos.init()

export default function CircleScrollComponents(props) {

    const { loading = false } = props;
    // var color = ['#FF6969', '#FFEEB3', , '#F97B22', '#9BA4B5', '#05BFDB', '#98D8AA', '#C9EEFF']
    // var color=["#FF6969 #FFEEB3","red blue"]                   

    var colorArr = ["radial - gradient(circle, rgba(238, 174, 202, 1) 0 %, rgba(148, 187, 233, 1) 100 %)",
        "linear - gradient(0deg, rgba(34, 193, 195, 1) 0 %, rgba(253, 187, 45, 1) 100 %)",
        "linear-gradient(0deg, rgba(214,218,208,1) 0%, rgba(253,45,45,1) 100%)",
        "linear-gradient(90deg, rgba(23,12,207,1) 0%, rgba(199,233,234,1) 0%, rgba(9,88,104,1) 100%)",
        "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(232,164,178,1) 100%)",
        "linear-gradient(0deg, rgba(221,161,161,1) 0%, rgba(32,136,67,1) 100%)",
        "linear-gradient(0deg, rgba(209,255,107,1) 0%, rgba(32,38,136,1) 100%)"];

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm')); //sm= 450
    const md = useMediaQuery(theme.breakpoints.down('md')); //md size=600
    const lg = useMediaQuery(theme.breakpoints.up('lg'));   //1000px 
    const classes = useStyle()

    const navigate = useNavigate()

    var sliderRef = createRef()

    var settings = {
        dots: false,
        infinte: true,
        speed: 1000,
        slidesToShow: sm ? 2 : md ? 3 : 5, //!lg?3:!md?4:6
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    };

    // var images = [
    //     { id: 1, images: 'detergent.png', name: 'Detergent' },
    //     { id: 2, images: 'rice.png', name: 'Rice' },
    //     { id: 3, images: 'oil.png', name: 'Edible Oils' },
    //     { id: 4, images: 'milk.png', name: 'Dairy & Bakery' },
    //     { id: 5, images: 'salt.png', name: 'Salt & Sugar' },
    //     { id: 6, images: 'indianmasale.png', name: 'Indian Masala' },    
    //     { id: 7, images: 'wheat.png', name: 'Wheat' },
    // ]   


    const handleClick = (item) => {
        navigate("/productviewwithcategory", { state: { categoryid: item.categoryid } })
    }

    const showImages = () => {
        return props.category.map((item) => {
            return (
                <div onClick={() => handleClick(item)} style={{ alignItems: 'center' }}  >
                    {loading ? (
                        <Skeleton sx={{ height: 150 }} animation="wave" variant='circular' />
                    ) :
                        (<>
                            <div data-aos="zoom-in"
                                data-aos-duration="1000"
                                data-aos-delay="500"
                                data-aos-easing="ease-out-cubic"
                                style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ width: sm ? "25vw" : md ? '21vw' : '10vw', height: sm ? '16vh' : md ? '17vh' : '18vh', borderRadius: "50%", background: 'red', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', display: 'flex', padding: 10, background: colorArr[Math.floor(Math.random() * colorArr.length)] }}
                                >
                                    <img src={`${serverURL}/images/${item.icon}`} width="100%" height="80%" className={classes.hoverCircleScrollComponent} />
                                </div>
                                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 13 }} >
                                    {item.categoryname}
                                    {/* {`${md}`}----->>>> to print trueScreen OR false */}
                                </div>
                            </div>
                        </>)}
                </div >
            )
        })
    }

    const handleBackClick = () => {

        sliderRef.current.slickPrev()
    }

    const handleForwardClick = () => {
        sliderRef.current.slickNext()

    }


    return (
        <div>
            <div style={{ flexDirection: 'row', display: 'flex', paddingLeft: 40, justifyContent: 'space-between' }}>
                <div style={{ marginBottom: 25, fontFamily: 'Poppins', fontSize: sm ? 17 : md ? 19 : 20, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', padding: 5, alignItems: 'center', }} >
                    {/* Popular Categories */}
                    {props.tittle}
                </div>
                {lg ? <>
                    <div style={{ marginRight: 90, marginTop: 12 }} >
                        <ArrowBackIosIcon style={{ color: '#000', cursor: 'pointer' }} onClick={handleBackClick} />
                        <ArrowForwardIos style={{ color: '#000', cursor: 'pointer' }} onClick={handleForwardClick} />
                    </div>
                </> : <></>}
            </div>
            <div  >
                <Slider {...settings} ref={sliderRef} >
                    {showImages()}
                </Slider>
            </div>
        </div>
    )
}
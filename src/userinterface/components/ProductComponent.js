import React, { createRef } from "react"
import { serverURL } from "../../administrator/sevices/fetchNodeServices"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Paper } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ArrowForwardIos } from "@mui/icons-material";
import { useStyle } from "./userinterfaceCss";

//use for MediaQuery------------>>>>
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function ProductComponent(props) {

    const classes = useStyle();

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm')); //sm= 450
    const md = useMediaQuery(theme.breakpoints.down('md')); //md size=600
    const lg = useMediaQuery(theme.breakpoints.up('lg'));   //1000px 

    var sliderRef = createRef()

    var settings = {
        dots: false,
        infinte: true,
        speed: 1000,
        slidesToShow: sm ? 2 : md ? 3 : 5,
        slideToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrow: false
    }

    // var images = [
    //     { id: 1, name: 'jursey Curd', image: 's1.avif', price: '300', offer: '190', weight: '500 ml' },
    //     { id: 1, name: 'Amul Cheese', image: 's2.avif', price: '300', offer: '190', weight: '500 ml' },
    //     { id: 1, name: 'Daily Milk', image: 's3.avif', price: '300', offer: '190', weight: '500 ml' },
    //     { id: 1, name: 'Nestle Milkmaid', image: 's4.avif', price: '300', offer: '190', weight: '500 ml' },
    //     { id: 1, name: 'Amul Butter', image: 's5.avif', price: '300', offer: '190', weight: '500 ml' },
    //     { id: 1, name: 'Amul Bread', image: 's6.avif', price: '300', offer: '190', weight: '500 ml' },
    //     { id: 1, name: 'Amul Cheese Slice', image: 's7.avif', price: '300', offer: '190', weight: '500 ml' },
    // ]

    const showImages = () => {
        return props.products.map((item) => {
            return (
                <div data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                    data-aos-delay="1000">
                    <Paper className={classes.hoverProductComponant} style={{
                        width: 180, marginTop: 15, height: 220, display: 'flex', flexDirection: 'column', marginBottom: 20, background: "#fff", alignItems: 'center', padding: 10,
                    }} variant="outlined" >
                        <img src={`${serverURL}/images/${item.picture}`} style={{ alignItems: 'center', width: "70%", height: '40%', margin: 15 }} />

                        <span style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: 550 }}>{item.productlistname}</span>
                        <div style={{ marginRight: 150 }} > {item.perpieceweight}{item.weight} </div>
                        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", width: "100%", marginTop: 10 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', fontWeight: 500 }}>
                                <div> {item.offer == 0 ? <>&#8377; {item.rate}</> : <s> &#8377;{item.rate} </s>}</div>
                                <div> {item.offer == 0 ? <></> : <>&#8377;{item.offer}</>}</div>
                            </div>
                            <div>
                                <Button variant="outlined" color='error' >Add</Button>
                            </div>
                        </div>
                    </Paper>
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

    return (
        <div>
            <div style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row', width: '100%' }} >

                <div style={{ width: '100%', marginLeft: 55, marginTop: 30, fontFamily: 'Poppins', fontWeight: 1000, fontSize: sm ? 17 : md ? 20 : 22, alignItems: 'center' }} >
                    {props.tittle}
                </div>
                {lg ? <>
                    <div style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row', padding: 30, marginRight: 50, marginTop: 20 }} >
                        <ArrowBackIosIcon style={{ color: '#000', cursor: 'pointer' }} onClick={handleBackClick} />
                        <ArrowForwardIos style={{ color: '#000', cursor: 'pointer' }} onClick={handleForwardClick} />
                    </div>
                </> : <></>}
            </div>

            <div style={{ marginLeft: 50,  height: '40vh', justifyContent: "center", alignItems: "center" }} >
                <Slider {...settings} ref={sliderRef}>
                    {showImages()}
                </Slider>
            </div>

        </div>
    )
}


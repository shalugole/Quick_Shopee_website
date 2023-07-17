import React, { createRef, useEffect, useState } from "react";
import { postData, serverURL } from "../../../administrator/sevices/fetchNodeServices";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ArrowForwardIos } from "@mui/icons-material";
import { Paper } from "@mui/material";

export default function SelectProductShowImages({ product }) {
    console.log(product)

    var sliderRef = createRef()
    const [image, setImage] = useState('')

    const [getImages, setImages] = useState([])

    const fetchAllPictures = async () => {

        var result = await postData('userinterface/fetch_all_multipleimages_by_productId', { productlistid: product.productlistid })
        // console.log("pictures", result.data[0].pictures)
        var pic = result.data[0].pictures
        // console.log("shaluu",pic)

        setImages(pic.substring(0, pic.length - 1).split(","))
        // console.log("shalu",bann) 
        // setImages(result.data[0].pictures.split(",")) 
        // setImage(bann)

        var chirag = pic.substring(0, pic.length - 1).split(",")
        // console.log("Chirag",chirag[0]) 
        setImage(`${serverURL}/images/${chirag[0]}`)

    }
    useEffect(function () {
        fetchAllPictures()
    }, [])

    var settings = {
        dots: false,
        infinte: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    }

    const handleBackClick = () => {
        sliderRef.current.slickPrev()
    }
    const handleForwardClick = () => {
        sliderRef.current.slickNext()
    }

    const handleChangeImage = (item) => {
        setImage(`${serverURL}/images/${item}`)
    }

    const showImages = () => {
        return getImages.map((item) => {
            return (
                <div onClick={() => { handleChangeImage(item) }} style={{ margin: 20 }} >
                    <Paper variant="outlined" elevation={5} onClick={showImages} style={{ margin: 10 }}  >
                        <img src={`${serverURL}/images/${item}`} width={"100%"} />
                    </Paper>
                </div>
            )
        })
    }
    return (
        <div style={{ width: 300, height: 400 }} >

            <div style={{ width: "30vw", height: '30vh', marginLeft: '50%', marginTop: 55, position: 'relative' }} onClick={showImages()} >
                <img src={image} width={"100%"} />
            </div>
            <div style={{ width: '30vw', height: '30vh', marginLeft: '50%', marginTop: 250, }} >
                <div style={{ boxShadow: '0 4px 7px', position: 'absolute', top: 567, left: 130, zIndex: 2, width: "1.9%", height: "4%", borderRadius: "50%", display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 2, background: '#fff', cursor: 'pointer' }} >
                    <ArrowBackIosIcon style={{ color: '#000000', fontSize: 15 }} onClick={handleBackClick} />
                </div>
                <div style={{ width: '100%' }}>
                    <Slider {...settings} ref={sliderRef}>
                        {showImages()}
                    </Slider>
                </div>
                <div style={{ boxShadow: '0 4px 7px', position: 'absolute', top: 567, right: 870, zIndex: 2, width: "1.9%", height: "4%", borderRadius: "50%", display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 2, background: '#fff', cursor: 'pointer' }}>
                    <ArrowForwardIos style={{ color: '#000000', fontSize: 15 }} onClick={handleForwardClick} />
                </div>

            </div>
        </div>
    )
}
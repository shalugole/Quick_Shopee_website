import React, { createRef, useEffect } from "react";
import { serverURL } from "../../administrator/sevices/fetchNodeServices";
import { useTheme } from "@emotion/react";
import { useStyle } from "./userinterfaceCss";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function SingleProductDetails(props) {
    const theme = useTheme();
    const navigate = useNavigate()
    const classes = useStyle()
    // console.log("PROPS",props)
    var item = props.item
    // console.log("PROPS ITEM :",props.item)
    // console.log("shaluuu", item)
    // var sliderRef = createRef()
    const handleClick = (item) => {
        navigate(props.url, { state: { product: item } })
        // console.log("HANDLE ITEM :",item)
    }


    const showImages = () => {
        return (
            <div
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1700" >
                <Paper style={{
                    width: 180, cursor: 'pointer', marginTop: 15, height: 220, marginLeft: 8, display: 'flex', flexDirection: 'column', background: "#fff", alignItems: 'center', padding: 10,
                }} onClick={() => handleClick(item)} variant="outlined" className={classes.hoverProductComponant}  >
                    <img src={`${serverURL}/images/${item.picture}`} style={{ alignItems: 'center', width: "70%", height: '40%', margin: 15 }} />

                    <span style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: 550 }}>{item.productlistname}</span>
                    <div style={{ marginRight: 150 }} > {item.perpieceweight}{item.weight} </div>
                    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", width: "100%", marginTop: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', fontWeight: 500 }}>
                            <div> {item.offer == 0 ? <>&#8377; {item.rate}</> : <s> &#8377;{item.rate} </s>}</div>
                            <div> {item.offer == 0 ? <></> : <>&#8377;{item.offer}</>}</div>
                        </div>
                        <div>
                            <Button variant="outlined" color='error'>Add</Button>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }

    return (

        <div >
            {showImages()}
        </div>

    )
}
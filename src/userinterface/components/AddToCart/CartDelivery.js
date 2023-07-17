import React, { useState } from "react";
import { useStyle } from "./CartCss";
import { Paper } from "@mui/material";
import { serverURL } from "../../../administrator/sevices/fetchNodeServices";

export default function CartDelivery() {

    const Tip = [
        { id: 1, tip: 10, image: "coins.avif" },
        { id: 2, tip: 20, image: "coin20.avif" },
        { id: 3, tip: 35, image: "coin30.png" },
        { id: 4, tip: 40, image: "coin50.avif" },
    ]

    const classes = useStyle()
    const [select, setSelect] = useState(false)

    const handleClick = (item) => {
        setSelect(item)
    }

    const ShowTip = () => {
        return Tip.map((item, index) => {
            return (<>
                <div onClick={() => handleClick(item, index)} style={{ borderRadius: 20, display: 'flex', justifyContent: 'center', flexDirection: 'row', border: item.id == select.id? '3px solid #F72464' : '1px solid #ccc', width: '6vw', alignItems: 'center', height: '4.5vh', cursor: 'pointer' }}>
                    <img src={`${serverURL}/images/${item.image}`} />
                    <span style={{ color: '#000000' }} >
                        &#8377;{item.tip}  
                    </span>
                </div>
            </>
            )
        })
    }

    return (
        <Paper elevation={1} className={classes.CartDeliveryStyle} >
            <div style={{ fontWeight: 600 }} >
                Delivery Partner Tip
            </div>
            <div style={{ fontWeight: 500, fontSize: 13 }} >
                The entire amount will be sent to your delivery partner
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', fontSize: 14, marginTop: 11 }}>
                {ShowTip()}
            </div>
        </Paper>
    )
}


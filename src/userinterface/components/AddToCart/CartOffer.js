import React from "react"
import { useStyle } from "./CartCss"
import { serverURL } from "../../../administrator/sevices/fetchNodeServices"
import { Paper } from "@mui/material"
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

export default function CartOffer() {

    const classes = useStyle()

    return (
        <Paper elevation={1} className={classes.CartOfferStyle} >
            <div style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-evenly',width:'55%'}} >
                <img src={`${serverURL}/images/offergreen.png`} width={"13%"} height={"30%"} />
                Avail Offers/Coupons
            </div>
            <div style={{width:50,height:50,display:'flex',justifyContent:'center',alignItems:'center'}} >

                <PlayArrowRoundedIcon style={{color:'#FF0060',cursor:'pointer'}} />
            </div>

        </Paper>
    )
}
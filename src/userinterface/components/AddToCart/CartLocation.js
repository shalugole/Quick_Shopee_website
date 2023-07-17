import React, { useState } from "react";
import { serverURL } from "../../../administrator/sevices/fetchNodeServices";
import { useStyle } from "./CartCss";
import { Paper } from "@mui/material";
import UserAddress from "../AllDialogs/UserAddress";
import { useNavigate } from "react-router-dom";
import UserPhoneNumberVerification from "../AllDialogs/UserPhoneNumberVerification";
import { useDispatch } from "react-redux";



export default function CartLocation(props) {

    const classes = useStyle()
    const navigate = useNavigate()
    
    const [openPhoneno, setOpenPhoneno] = useState(false)
    const [addressOne, setAddressOne] = useState([])
    const [addressTwo, setAddressTwo] = useState('')
    const [open, setOpen] = useState()


    console.log("TIOITLE", addressOne.addressone)

    const handleClick = () => {
        if(props.btnTitle=="ADD ADDRESS TO PROCEED")
             
        setOpenPhoneno(true)
        else{
           navigate('/makepayment')
        }
    }

   

    const showAddress = () => {


        return (<div style={{ flexDirection: 'column', display: 'flex',fontSize:12 }}>
            <div>{addressOne.emailid}</div>
            <div>{addressOne.addressone}  {addressOne.addresstwo}</div>
            <div>{addressOne.city} {addressOne.state} {addressOne.pincode}</div>

        </div>)


    }

    return (
        <Paper elevation={1} className={classes.CartLocationStyle} >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                <img src={`${serverURL}/images/location.svg`} />
                <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: 16, marginLeft: 10 }} >
                    Your Address
                    {showAddress()}
                    
                </span>
            </div>
            <div onClick={handleClick} style={{ borderRadius: 8, marginBottom: 15, marginTop: 10, display: 'flex', justifyContent: 'center', flexDirection: 'row', border: 'solid 1px', width: '22vw', alignItems: 'center', height: '6vh', color: '#fff', background: '#F72464', cursor: 'pointer' }}>
                {/* ADD ADDRESS TO PROCEED */}
                {props.btnTitle}
                <UserPhoneNumberVerification openPhoneno={openPhoneno} setOpenPhoneno={setOpenPhoneno} setBtnTitle={props.setBtnTitle} setAddress={setAddressOne} />
            </div>
        </Paper>
    )
}
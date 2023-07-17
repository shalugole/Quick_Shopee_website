import React, { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Divider, Input } from "@mui/material";
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import Slide from '@mui/material/Slide';
import UserOTPVerification from "./UserOTPVerification";
import { useStyle } from "./UserLoginCss";
import { postData } from "../../../administrator/sevices/fetchNodeServices";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function UserPhoneNumberVerification(props) {
    const classes = useStyle()

    // PhoneNumber Open ==================>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const [open, setOpen] = useState(false)
    // OTP Open ==================>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const [otpOpen, setOtpOpen] = useState(false)

    const [getDOpen, setGetDOpen] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otpValue, setOtpValue] = useState('')

    useEffect(function () {
        setOpen(props.openPhoneno)
    }, [props.openPhoneno])

    const handleGenerateOtp =async () => {
        var GenerateOtp = parseInt(Math.random() * 8999) + 1000

        // var result=await postData('sms/sendotp',{otp:otp,mobileno:mobileno})
        alert(GenerateOtp)
        setOtpValue(GenerateOtp)
        
    }


    const handleSubmit = () => {
        handleGenerateOtp()
        setOtpOpen(true)
        props.setOpenPhoneno(false)
        setOpen(false)
    }
    const handleClose = () => {
        props.setOpenPhoneno(false)
        setOpen(false)
    }

    return (
        <div>
            <Dialog open={open} TransitionComponent={Transition} style={{ backdropFilter: "blur(5px)" }} maxWidth="md" PaperProps={{ sx: { borderRadius: 5, height: '40vh' } }} >
                <div className={classes.PhoneStyle} >
                    Phone Number Verification
                    <CancelRoundedIcon style={{ color: '#ccc', cursor: 'pointer', marginLeft: 60 }} onClick={handleClose} />
                </div>
                <Divider style={{ width: '35vw' }} />
                <div className={classes.PhoneStyle0} >
                    <div className={classes.PhoneLoginStyle} >
                        Enter your Phone number to Login/SignUp
                    </div>
                    <div className={classes.Phone1Style}>
                        <div className={classes.Phone2Style} >
                            <div className={classes.Phone3Style} >
                                <MobileScreenShareIcon style={{ fontSize: 30, }} />+91-
                            </div>
                            <Divider orientation="vertical" />
                            <Input label="Phone Number" type="number"
                                style={{ width: '40vw', fontSize: 18, fontWeight: "bold" }}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                            />
                        </div>

                    </div>
                    <Button variant="contained" disabled={phoneNumber.length !== 10} onClick={handleSubmit} color="success" style={{ width: '22vw', marginLeft: 110, marginTop: 30 }}>
                        Next
                    </Button>
                    <div className={classes.PhonInfo} >
                        By continuing. you agree to our
                    </div>
                </div>
            </Dialog>
            <UserOTPVerification otpOpen={otpOpen} setOtpOpen={setOtpOpen} phoneNumber={phoneNumber} otpValue={otpValue} getDOpen={getDOpen} setGetDOpen={setGetDOpen} setBtnTitle={props.setBtnTitle} btnTitle={props.btnTitle} setAddress={props.setAddress} />
        </div>

    )
}

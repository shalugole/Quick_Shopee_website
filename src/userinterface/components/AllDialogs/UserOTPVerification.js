import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Divider, Slide } from "@mui/material";
import { MuiOtpInput } from 'mui-one-time-password-input';
import UserAddress from './UserAddress';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useStyle } from './UserLoginCss';
import { postData } from '../../../administrator/sevices/fetchNodeServices';
import { useDispatch } from 'react-redux';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function UserOTPVerification(props) {

    var dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [receiverName, setReceiverName] = useState('')
    const [addressOne, setAddressOne] = useState('')
    const [addressTwo, setAddressTwo] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pinCode, setPinCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userid, setUserid] = useState('')
    const [emailid, setEmailid] = useState('')

    const [status, setStatus] = useState(false)
    const [getDOpen, setGetDOpen] = useState(false)

    const classes = useStyle()
    const [OTP, setOTP] = useState('')
    const [openAddress, setOpenAddress] = useState(false)

    const handleChange = (event) => {
        setOTP(event)
    }

    const handleSubmitOtp = async () => {
        if (props.otpValue == OTP) {

            var phonenumberstatus = await postData('userinterface/check_phone_number', { mobileno: props.phoneNumber })
            // alert(JSON.stringify(phonenumberstatus))
            if (phonenumberstatus.status) {
                var addressstatus = await postData('userinterface/check_address_by_phone_number', { mobileno: props.phoneNumber })
                alert(JSON.stringify(addressstatus.data))
                setAddressOne(addressstatus.data)
                props.setAddress(addressstatus.data)
                props.setBtnTitle('Proceed For Payment')

                //to make dispatch userAddress====>>>
                dispatch({ type: 'ADD_USER', payload: [JSON.stringify(addressstatus.data)] })



                // if (addressstatus.status) {
                //     // setGetDOpen(false)
                //     // setState(false)
                //     props.setBtnTitle('proceed For Payment')

                //     // alert("Proceed to Payment") }
                // }
                // else { setOpenAddress(true) }
                // // setOpenAddress(true)
            }
            else { setOpenAddress(true) }
            props.setOtpOpen(false)
            // setOpenAddress(true)
        }
        else {
            alert("☹️Invalid_OTP")
            props.setOtpOpen(false)
        }
    }

    const handleBack = () => {
        props.setOtpOpen(false)
        props.setGetDOpen(true)
    }

    useEffect(function () {
        if (props.btnTitle != 'proceed For Payment') {
            setGetDOpen(props.status)
        }
    }, [props])


    return (
        <div>
            <Dialog open={props.otpOpen} TransitionComponent={Transition} style={{ backdropFilter: "blur(5px)" }} maxWidth="md" PaperProps={{ sx: { borderRadius: 5, height: '50vh' } }}>

                <div className={classes.OtpStyle1}>
                    <span onClick={handleBack} className={classes.OtpStyle2} >
                        <ArrowBackRoundedIcon /> Back
                    </span>
                    <span style={{ marginLeft: '25%' }} > OTP Verification</span>
                </div>
                <Divider style={{ width: '35vw' }} />
                <div className={classes.OtpStyle3} >
                    <div className={classes.OptStyle4} >
                        Enter 4 digit code sent to your phone
                    </div>
                    <div className={classes.OptStyle5} >
                        {`+91XXXXXX${props.phoneNumber.substring(6)}`}
                        {/* +91- {props.phoneNumber} */}
                    </div>
                    <div className={classes.OptStyle6} >
                        <MuiOtpInput value={OTP} onChange={handleChange} />
                    </div>
                    <Button variant="contained" color="success" style={{ width: '22vw', marginLeft: 110, marginTop: 30 }} onClick={handleSubmitOtp} >
                        Next
                    </Button>
                    <div className={classes.OptStyle7} >
                        Resend Code(in 30 secs.)
                    </div>
                </div>
            </Dialog>
            <UserAddress phoneNumber={props.phoneNumber} openAddress={openAddress} setOpenAddress={setOpenAddress} />

        </div>
    )
}

export default UserOTPVerification
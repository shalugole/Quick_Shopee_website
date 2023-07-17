import React, { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Grid, InputLabel, MenuItem, Select, Slide } from "@mui/material";
import { postData, serverURL } from "../../../administrator/sevices/fetchNodeServices";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useStyle } from "./UserLoginCss";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserAddress(props) {
    const classes = useStyle()

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

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    // useEffect(function () {
    //     setAddressOne(props.address.data[0].addressone)
    // }, [])


    const handleSubmit = async () => {

        var body = {

            emailid: emailid,
            mobileno: props.phoneNumber,
            addressone: addressOne,
            addresstwo: addressTwo,
            city: city,
            state: state,
            pincode: pinCode,
            username: title,
            addressstatus: 'default'
        }

        var result = await postData('userinterface/add_address', body)

    }

    const [getDOpen, setGetDOpen] = useState(props.openAddress)

    useEffect(function () {
        setGetDOpen(props.openAddress)
    }, [props])

    const handleClose = () => {
        setGetDOpen(false)
        props.setOpenAddress(false)
    }

    return (
        <div>
            <Dialog open={getDOpen} TransitionComponent={Transition} style={{ backdropFilter: "blur(5px)" }} maxWidth="md" PaperProps={{ sx: { borderRadius: 5 } }} >
                <Grid container spacing={0} >
                    <Grid item xs={6}>
                        <img src={`${serverURL}/images/googlemap.jpeg`} width={'100%'} height={425} />
                    </Grid>

                    <Grid item xs={6} background={"white"} >
                        <DialogTitle className={classes.UserAddressTitle} >
                            Enter Complete Address
                            <CancelRoundedIcon style={{ color: '#ccc', cursor: 'pointer' }} onClick={handleClose} />
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText style={{ fontFamily: 'Poppins', fontSize: 12, marginBottom: 6 }} >
                                This allow us to find you easily and give you timely delivery experience
                            </DialogContentText>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"  >Title</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="title" label="Title" value={title} onChange={(event) => handleTitle(event)} >
                                            <MenuItem>-Select Title-</MenuItem>
                                            <MenuItem value="Miss" >Miss</MenuItem>
                                            <MenuItem value="Mrs" >Mrs</MenuItem>
                                            <MenuItem value="Mr" >Mr</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField label="Receiver's Name" fullWidth variant="outlined" onChange={(event) => setReceiverName(event.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Email-Id" fullWidth variant="outlined" onChange={(event) => setEmailid(event.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Address-1" fullWidth variant="outlined" onChange={(event) => setAddressOne(event.target.value)} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField label="Address-2" fullWidth variant="outlined" onChange={(event) => setAddressTwo(event.target.value)} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label="City" fullWidth variant="outlined" onChange={(event) => setCity(event.target.value)} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label="State" fullWidth variant="outlined" onChange={(event) => setState(event.target.value)} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label="PinCode" fullWidth variant="outlined" onChange={(event) => setPinCode(event.target.value)} />
                                </Grid>
                                <Grid item xs={12} marginTop={4}>
                                    <Button variant="contained" onClick={handleSubmit} style={{ height: '7vh' }} color="success" fullWidth >Save Address</Button>
                                </Grid>
                            </Grid>
                        </DialogContent>

                    </Grid>

                </Grid>

            </Dialog>
        </div>
    )
}
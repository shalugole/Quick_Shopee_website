import { useEffect, useState } from "react"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Grid, Avatar, Select, Button, TextField, IconButton, collapseClasses, MenuItem, useStepContext } from "@mui/material"
import Swal from "sweetalert2";
import { postData } from "../sevices/fetchNodeServices";
import { useStyle } from "./bannerCss";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


//install material dropzone------->>>>
import { DropzoneArea, DropzoneAreaBase } from "material-ui-dropzone";
import { useNavigate } from "react-router-dom";

export default function BannersInterface() {
    const navigate=useNavigate()
    const classes = useStyle()
    const [status, setStatus] = useState('')
    const [banners, setBanners] = useState('')

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('status', status)
        banners.map((item, index) => {
            formData.append('picture' + index, item)
        })   
        var result = await postData('banners/banners_image_submit', formData)
        if (result.status) { 
            Swal.fire({
                icon: 'success',
                title: result.message,
                showConfirmButton: true,
                // timer: 1500
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: result.message,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    return (
        <div className={classes.displaycontainer}>
            <div className={classes.displaybox}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={classes.headingStyle}>
                            Banner Images
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <DropzoneAreaBase
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => console.log('Files:', files)}
                        /> */}
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) =>
                                // console.log('Files:', files)
                                setBanners(files)
                            }
                            filesLimit={3}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Banner Status</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="Show" control={<Radio onChange={(event) => setStatus(event.target.value)} />} label="Show" />
                                <FormControlLabel value="Hide" control={<Radio onChange={(event) => setStatus(event.target.value)} />} label="Hide" />

                                {/* <FormControlLabel
                                    value="disabled"
                                    disabled
                                    control={<Radio />}
                                    label="other"
                                /> */}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleSubmit} variant='contained' fullWidth>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant='contained' fullWidth>Reset</Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}

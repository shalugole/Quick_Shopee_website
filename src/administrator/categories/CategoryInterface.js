import { useState } from 'react'

import { Avatar, Grid, TextField, Button, FormControl, InputLabel, IconButton, Select, MenuItem } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { postData } from '../sevices/fetchNodeServices';
import Swal from 'sweetalert2'; 
import { useStyle } from './CategoryCss';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from 'react-router-dom'; 

export default function CategoryInterface() {
   
    const classes = useStyle()
    const navigate=useNavigate()

    // Getter And Setter State For Categories Data ---->>>>>>>>>>>>>>>>>>>>
    const [status, setStatus] = useState('')
    const [icon, setIcon] = useState({ file: '/assets/cart.png', bytes: '' })
    const [categoryName, setCategoryName] = useState('')
    const [error, setError] = useState({})

    // setError({...error,['k']:70})

    // handle For Picture -------->>>>>>>>>>>>>>>>>>>>>>>>>
    const handlePicture = (event) => {
        // alert("hello")
        setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        handleError('icon', null)
    }

    // handle For Errorr -------->>>>>>>>>>>>>>>>>>>>>>>>>
    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
        console.log(error)
    }

    // handle For Reset----------->>>>>>>>>>>>>>>>>>>>>
    const handleReset=()=>{
        setCategoryName('')
        setStatus('')
        setIcon({ file: '/assets/cart.png', bytes: '' })
    }
    // For Validation ---------------->>>>>>>>>>>>>>>>>>>>>>>>>
    const validation = () => {

        var isValid = true

        if (!categoryName) {
            // error.categoryName='plz input category name...'
            handleError('categoryName', 'plz input category name...')
            isValid = false
        }
        if (!status) {
            handleError('status', 'plz input status...')
            isValid = false
        }
        if (!icon.bytes) {
            handleError('icon', 'plz select icon for category...')
            isValid = false
        }
        return isValid
    }

    //  Handle For Data Submit ---------------->>>>>>>>>>>>>>>>>>>>>>>>>
    const handleClick = async () => {

        //    var v=validation()
        //    alert("v")
        if (validation()) {
            var formData = new FormData()
            formData.append('categoryname', categoryName)
            formData.append('status', status)
            formData.append('icon', icon.bytes)

            var result = await postData('category/categorysubmit', formData)
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
            //  alert(result.status) 
            //  alert(result.message) 
           handleReset()
        }
    }


    return (
    <div className={classes.displaycontainer}>
        <div className={classes.displaybox}> 
            <Grid container spacing={2}>
                <Grid item xs={12} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
                    <div className={classes.headingStyle} >
                        Add New Category 
                    </div>
                    <div>
                        <FormatListBulletedIcon  onClick={()=>navigate("/dashboard/displayallcategory")} />

                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!error.categoryName ? false : true}
                        helperText={error.categoryName}
                        onFocus={() => handleError('categoryName', null)}
                        onChange={(event) => { setCategoryName(event.target.value) }}
                        value={categoryName}
                        label="Category Name" variant="outlined"
                        fullWidth />
                </Grid> 
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" error={!error.status ? false : true} >Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label="Status"
                            onChange={(event) => { setStatus(event.target.value) }}
                            onFocus={() => handleError('status', null)}
                            value={status}
                            // error={!error.status?false:true} 
                            helperText={error.status}
                        >
                            <MenuItem value='-Select Status-'>-Select Status-</MenuItem>
                            <MenuItem value='continue'>Continue</MenuItem>
                            <MenuItem value='Discontinue'>Discontinue</MenuItem>
                            <MenuItem value='Popular'>Popular</MenuItem>
                            <MenuItem value='Trending'>Trending</MenuItem>
                        </Select>
                    </FormControl>
                    <div
                        // error={!error.status?false:true} 
                        className={classes.errorText}
                    >
                        {error.status}
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input onChange={handlePicture} hidden accept="image/*" type="file" />
                        <CameraAltIcon />
                    </IconButton>
                    <div className={classes.errorText}>
                        {error.icon}
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Avatar
                        alt="Icon"
                        // src="/assets/cart.png"
                        src={icon.file}
                        style={{ width: 56, height: 56 }}
                        variant="circle"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleClick} variant='contained' fullWidth >Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleReset} variant='contained' fullWidth>Reset</Button>
                </Grid>
            </Grid>
        </div>
    </div>)
}

// export default function Category(){
//     return(
//         <div>
//             <h1>Category</h1>
//         </div>
//     )
// }

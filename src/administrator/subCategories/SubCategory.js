import { useEffect, useState } from "react"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import { TextField, IconButton, Button, FormControl, Avatar,InputLabel, Select, MenuItem, Grid } from "@mui/material"
import { useStyle } from "../categories/CategoryCss"
import Swal from "sweetalert2"
import { getData, postData } from "../sevices/fetchNodeServices"
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom"



export default function SubCategory() {
    const navigate=useNavigate()
    const classes = useStyle('')
    const [icon, setIcon] = useState({ file: '/assets/cart.png', bytes: '' })
    const [categoryid, setCategoryid] = useState('')
    const [subcategoryname, setSubcategoryname] = useState('')
    const [status, setStatus] = useState('')
    const [error, setError] = useState({})
    
    const [categoryList,setCategoryList]=useState([])
    useEffect(function(){
        fetchAllCategory() 
    },[])
    const fetchAllCategory=async()=>{
        var result=await getData('category/category_list')
        setCategoryList(result.data)
    }
    const fillCategory=()=>{
        return categoryList.map((item)=>{

        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>    

        })
    }

    const handlePicture = (event) => {
        setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        handleError('icon', null)
    }
    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
    }
    const handlestatus = (event) => {
        setStatus(event.target.value)
    }
    const validation = () => {
        var isValid = true

        if (!categoryid) {
            handleError('categoryid', 'plzz input C.id...')
            isValid = false
        }

        if (!subcategoryname) {
            handleError('subcategoryname', 'plzz input SubC.Name...')
            isValid = false
        }
        if (!status) {
            handleError('status', 'plzz input status...')
            isValid = false
        }
        if (!icon.bytes) {
            handleError('icon', 'plzz select icon...')
            isValid = false
        }
        return isValid
    }

    const handleReset=()=>{
        setCategoryid('')
        setSubcategoryname('')
        setStatus('')
        setIcon({ file: '/assets/cart.png', bytes: '' })
    }


    const handleClick = async () => {
        if (validation()) {
            var formData = new FormData()
            formData.append('categoryid', categoryid)
            formData.append('subcategoryname', subcategoryname)
            formData.append('status', status)
            formData.append('icon', icon.bytes)
            console.log(formData)
           var result=await postData("subcategory/subcategorysubmit",formData)
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
        handleReset()
    }

    return (
        <div className={classes.displaycontainer}>
            <div className={classes.displaybox}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{display:'flex' ,flexDirection:'row', justifyContent:'space-between'}} >
                        <div className={classes.headingStyle}>
                            Add Sub-Category
                        </div>
                        <div>
                            <ViewListIcon onClick={()=>navigate('/dashboard/displayallsubcategory')} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <TextField
                            error={!error.categoryid ? false : true}
                            helperText={error.categoryid}
                            onFocus={() => handleError('categoryid', null)}
                            onChange={(event) => setCategoryid(event.target.value)}
                            label="categoryid" variant="outlined"
                            fullWidth
                        /> */} 
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"  >Category Name </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-label"
                                label="Category Name"
                                value={categoryid}
                                onFocus={() => handleError('categoryid', null)}
                                onChange={(event)=>{setCategoryid(event.target.value)}}
                                error={error.categoryid?true:false}
                                helperText={error.categoryid}
                            > 
                              <MenuItem>Select Category</MenuItem>
                              {fillCategory()} 
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={!error.subcategoryname ? false : true}
                            helperText={error.subcategoryname}
                            onFocus={() => handleError('subcategoryname', null)}
                            onChange={(event) => setSubcategoryname(event.target.value)}
                            label="sub-category Name" variant="outlined"
                            value={subcategoryname}
                            fullWidth
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <FormControl error={!error.status?false:true } >
                            <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onFocus={() => handleError('status', null)}
                                onClick={handlestatus}
                            >
                                <FormControlLabel value="available" control={<Radio />} label="Available" />
                                <FormControlLabel value="not available" control={<Radio />} label="Not Available" />
                            </RadioGroup>
                            <div className={classes.errorText} style={{ color: "red", fontSize: 12 }}>
                                {error.status}
                            </div>
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" error={!error.status ? false : true} >Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-label"
                                label="Status"
                                // onChange={(event) => { setStatus(event.target.value) }}_______'use only textField'____
                                onFocus={() => handleError('status', null)}
                                onChange={handlestatus}
                                // error={!error.status?false:true} 
                                helperText={error.status}
                                value={status}
                            >
                                <MenuItem value='-Select Status-'>-Select Status-</MenuItem>
                                <MenuItem value='continue'>Continue</MenuItem>
                                <MenuItem value='Discontinue'>Discontinue</MenuItem>
                                <MenuItem value='Popular'>Popular</MenuItem>
                                <MenuItem value='Trending'>Trending</MenuItem>
                            </Select>
                            <div className={classes.errorText}> 
                                {error.status}
                            </div>
                        </FormControl>
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
                            src={icon.file}
                            style={{ width: 56, height: 56 }}
                            variant="circle"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleClick} variant="contained" fullWidth>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleReset} variant="contained" fullWidth>Reset</Button>
                    </Grid>

                </Grid>
            </div>
        </div>

    )
}
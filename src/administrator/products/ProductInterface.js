import { useEffect, useState } from "react"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { FormControl, Grid, InputLabel, Avatar, Select, Button, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, IconButton, collapseClasses, MenuItem, useStepContext } from "@mui/material"
import { useStyle } from "../categories/CategoryCss";
import Swal from "sweetalert2";
import { getData, postData } from "../sevices/fetchNodeServices";
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";


export default function ProductInterface() {
    const navigate = useNavigate()

    const classes = useStyle()
    const [status, setStatus] = useState('')
    const [icon, setIcon] = useState({ file: '/assets/cart.png', bytes: '' })
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState({})
    const [categoryid, setCategoryid] = useState('')
    const [subcategoryid, setSubCategoryid] = useState('')


    const handlestatus = (event) => {
        setStatus(event.target.value)
    }
    // use to make FillDropdown - fetch allvalue in categoryList___----->>>>>
    // Create an API for fetch all the date of CategoryList----->>>>
    const [categoryList, setCategoryList] = useState([])
    useEffect(function () {
        fetchAllCategory()
    }, [])
    const fetchAllCategory = async () => {
        var result = await getData('category/category_list')
        setCategoryList(result.data)
    }
    const fillCategory = () => {
        return categoryList.map((item) => {

            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

        })
    }
    // Create an API for fetch all the date of subCategoryList----->>>>
    const [subcategoryList, setSubCategoryList] = useState([])
    useEffect(function () {
        fetchAllSubCategory()
    }, [])
    const fetchAllSubCategory = async (cid) => {
        var result = await postData('subCategory/subCategory_list_by_categoryid', { categoryid: cid })
        setSubCategoryList(result.data)
    }
    const fillSubCategory = () => {
        return subcategoryList.map((item) => {

            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>

        })
    }

    const handleCategoryChange = (event) => {
        setCategoryid(event.target.value)
        fetchAllSubCategory(event.target.value)
    }

    //handle for picture------------------------->>>>>>>>>>
    const handlePicture = (event) => {
        // alert("hello")
        setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        handleError('icon', null)
    }
    //handle for Error --------------------->>>>>>>>>>>>>>
    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))

    }
    const handleReset = () => {
        setCategoryid('')
        setSubCategoryid('')
        setProductName('')
        setDescription('')
        setStatus('')
        setIcon({ file: '/assets/cart.png', bytes: '' })  
    }
    const validation = () => {
        var isValid = true

        if (!productName) {
            handleError('productName', 'plz input product name...')
            isValid = false
        }
        if (!description) {
            handleError('description', 'plzz input description...')
            isValid = false
        }
        if (!status) {
            handleError('status', 'plzz select status...')
            isValid = false
        }
        if (!icon.bytes) {
            handleError('icon', 'plzz select icon...')
            isValid = false
        }
        return isValid
    }

    const handleClick = async () => {
        // var result=await postData('product/productsubmit',formData)
        if (validation()) {
            var formData = new FormData()
            formData.append('categoryid', categoryid)
            formData.append('subcategoryid', subcategoryid)
            formData.append('productname', productName)
            formData.append('description', description)
            formData.append('status', status)
            formData.append('icon', icon.bytes)

            var result = await postData('product/productSubmit', formData)
            if (result.status) {
                Swal.fire({
                    icon: 'success',
                    title: result.message,
                    showConfirmButton: true,
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
    return (<div className={classes.displaycontainer}>
        <div className={classes.displaybox}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <div className={classes.headingStyle}>
                        Add new Product
                    </div>
                    <div>
                        <ViewListIcon onClick={() => navigate('/dashboard/displayallproducts')} />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"  >Category Name </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label="Category Name"
                            value={categoryid}
                            onFocus={() => handleError('categoryid', null)}
                            onChange={handleCategoryChange}
                            error={error.categoryid ? true : false}
                            helperText={error.categoryid}
                        >
                            <MenuItem>Select Category</MenuItem>
                            {fillCategory()}
                        </Select>
                    </FormControl>
                    <div className={classes.errorText}>{error.categoryid}</div>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"  >Sub-Category Name </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label="Sub-Category Name"
                            value={subcategoryid}
                            onFocus={() => handleError('subcategoryid', null)}
                            onChange={(event) => { setSubCategoryid(event.target.value) }}
                            error={error.subcategoryid ? true : false}
                            helperText={error.subcategoryid}
                        >
                            <MenuItem>Select Category</MenuItem>
                            {fillSubCategory()}
                        </Select>
                    </FormControl>
                    <div className={classes.errorText}>{error.subcategoryid}</div>

                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!error.productName ? false : true}
                        helperText={error.productName}
                        onFocus={() => handleError('productName', null)}
                        onChange={(event) => setProductName(event.target.value)}
                        label="Product Name" variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!error.description ? false : true}
                        helperText={error.description}
                        onFocus={() => handleError('description', null)}
                        onChange={(event) => setDescription(event.target.value)}
                        label="Description" variant="outlined"
                        fullWidth
                    />
                </Grid>
                {/* <Grid item xs={12}>
                    <FormControl error={!error.status ? false : true}>
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
                            // onChange={(event) => { setStatus(event.target.value) }}______'use only Textfield'___
                            onFocus={() => handleError('status', null)}
                            onChange={handlestatus}
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
                        //  src="/assets/cart.png"                                
                        src={icon.file}
                        style={{ width: 56, height: 56 }}
                        variant="circle"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleClick} variant="contained" fullWidth>Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" fullWidth>Reset</Button>
                </Grid>
            </Grid>
        </div>
    </div>
    )
}

// export default function Category(){
//     return(
//         <div>
//             <h1>Category</h1>
//         </div>
//     )
// }

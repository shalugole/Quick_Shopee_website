import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import { useStyle } from "../categories/CategoryCss";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { getData, postData, serverURL } from "../sevices/fetchNodeServices";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Slide, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function DisplayAllProducts() {
    const navigate=useNavigate()
    const classes = useStyle()
    const [open, setOpen] = useState(false)

    const [status, setStatus] = useState('')
    const [icon, setIcon] = useState({ file: '/assets/cart.png', bytes: '' })
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState({})
    const [categoryid, setCategoryid] = useState('')
    const [subcategoryid, setSubCategoryid] = useState('')
    const [productid, setProductid] = useState('')

    const [btnStatus, setButtonStatus] = useState(false)
    const [oldIcon, setOldIcon] = useState('')


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
    const handleSubCategoryChange = (event) => {
        setSubCategoryid(event.target.value)

    }

    //handle for picture------------------------->>>>>>>>>>
    const handlePicture = (event) => {
        // alert("hello")
        setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setButtonStatus(true)
    }

    const handleCancel = () => {
        setIcon({ file: `${serverURL}/images/${oldIcon}`, bytes: '' })
        setButtonStatus(false)
    }

    const handleEditIcon = async () => {
        setButtonStatus(false)
        setOpen(false)
        var formData = new FormData()
        formData.append('productid', productid)
        formData.append('picture', icon.bytes)

        var result = await postData('product/product_edit_icon', formData)


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
                tittle: result.message,
                showCanfirmButton: false,
                timer: 1500
            })

        }
        fetchAllProducts()
    }


    const handleClose = () => {
        setOpen(false)
    }

    const handleEditData = async () => {
       
        setOpen(false)
        var formData = {
            'productid': productid,
            'categoryid': categoryid,
            'subcategoryid': subcategoryid,
            'productname': productName,
            'description': description,
            'status': status
        }

        var result = await postData('product/product_edit_data', formData)
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
        handleClose()
        fetchAllProducts()
    }

    const handleClick = (rowData) => {

        setOpen(true)
        setProductid(rowData.productid)
        fetchAllSubCategory(rowData.categoryid)
        setCategoryid(rowData.categoryid)
        setSubCategoryid(rowData.subcategoryid)
        setProductName(rowData.productname)
        setDescription(rowData.description)
        setStatus(rowData.status)
        setIcon({ file: `${serverURL}/images/${rowData.picture}`, bytes: '' })

    }

    const handleDelete = async (rowData) => {
        var result = await postData('product/product_delete_data', { productid: rowData.productid })
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
        handleClose()
        fetchAllProducts()
    }

    const showProductForm = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.headingStyle}>
                        Add New-Products...
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
                            onChange={handleCategoryChange}
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
                            onChange={handleSubCategoryChange}
                        >
                            <MenuItem>Select Sub-Category</MenuItem>
                            {fillSubCategory()}
                        </Select>
                    </FormControl>
                    <div className={classes.errorText}>{error.subcategoryid}</div>

                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}

                        label="Product Name" variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        // error={!error.description ? false : true}
                        // helperText={error.description}
                        // onFocus={() => handleError('description', null)}
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                        label="Description" variant="outlined"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" error={!error.status ? false : true} >Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label="Status"
                            onChange={handlestatus}
                            value={status}
                        >
                            <MenuItem value='-Select Status-'>-Select Status-</MenuItem>
                            <MenuItem value='continue'>Continue</MenuItem>
                            <MenuItem value='Discontinue'>Discontinue</MenuItem>
                            <MenuItem value='Popular'>Popular</MenuItem>
                            <MenuItem value='Trending'>Trending</MenuItem>
                        </Select>
                    </FormControl>
                    <div className={classes.errorText} >{error.status}</div>
                </Grid>
                <Grid item xs={4}>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input onChange={handlePicture} hidden accept="image/*" type="file" />
                        <CameraAltIcon />
                    </IconButton>
                    <div className={classes.errorText}>
                        {error.icon}
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <Avatar
                        alt="Icon"
                        //  src="/assets/cart.png"                                
                        src={icon.file}
                        style={{ width: 56, height: 56 }}
                        variant="circle"
                    />
                </Grid>
                <Grid item xs={4}>
                    {btnStatus ? <>
                        <Button onClick={handleEditIcon} >Save</Button>
                        <Button onClick={handleCancel} >Cencel</Button>
                    </> : <></>}
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleEditData} variant="contained" fullWidth>Edit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleDelete} variant="contained" fullWidth>Delete</Button>
                </Grid>

            </Grid>

        )
    }

    function DisplayProductDialog() {
        return (
            <>
                <Dialog open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description">

                    <DialogTitle>Edit/Delete Products</DialogTitle>
                    <DialogContent>
                        {showProductForm()}
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handleEditData} variant="contained" fullWidth>Edit</Button> */}
                        <Button onClick={handleClose} variant="contained" >close</Button>
                    </DialogActions>

                </Dialog>
            </>
        )
    }

    // DisplayAllProduct---------->>>>>>>>
    const [productList, setProductList] = useState([])

    const fetchAllProducts = async () => {
        var result = await getData('product/product_list_by_subcategoryid')
        // alert(JSON.stringify(result.data))
        setProductList(result.data)
    }

    useEffect(
        function () {
            fetchAllProducts()
        }, []
    )

    function showProduct() {
        return (
            <>
                {/*  <>  Reactfregment */}
                <MaterialTable
                    title="ProductList"
                    columns={[
                        { title: 'ProductId', field: 'productid' },
                        { title: 'Category Name', field: 'categoryname' },
                        { title: 'sub-category name', field: 'subcategoryname' },
                        { title: 'Product Name', field: 'productname' },
                        { title: 'Description', field: 'description' },
                        { title: 'status', field: 'status' },
                        {
                            title: 'icon', field: 'icon',
                            render: rowData =>
                                <Avatar src={`${serverURL}/images/${rowData.picture}`}
                                    style={{ width: 75 }}
                                    variant='rounded' />
                        }
                    ]}
                    data={productList}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Sub-Category',
                            onClick: (event, rowData) => handleClick(rowData)
                        },
                        {
                            icon: 'add',
                            tooltip: 'Add New Product',
                            isFreeAction: true,
                            onClick: (event) => navigate("/dashboard/product")
                          },
                        {
                            icon: "delete",
                            tooltip: "Delete subCategory",
                            onClick: (event, rowData) => handleDelete(rowData)
                        }
                    ]}
                />
            </>
        )
    }




    return (
        <div className={classes.displaycontainer}>
            <div className={classes.displaybox}>
                {showProduct()}
            </div>
            {DisplayProductDialog()}


        </div>
    )


}

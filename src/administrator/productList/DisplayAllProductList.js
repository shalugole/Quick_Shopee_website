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

export default function DisplayAllProductList() {
    const navigate = useNavigate()
    const classes = useStyle()
    const [open, setOpen] = useState(false)

    const [stock, setStock] = useState('')
    const [weight, setWeight] = useState('')
    const [offer, setOffer] = useState('')
    const [rate, setRate] = useState('')
    const [status, setStatus] = useState('')
    const [icon, setIcon] = useState({ file: '/assets/cart.png', bytes: '' })
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState({})
    const [categoryid, setCategoryid] = useState('')
    const [subcategoryid, setSubCategoryid] = useState('')
    const [productid, setProductid] = useState('')
    const [productListId, setProductListId] = useState('')
    const [productListName, setProductListName] = useState('')


    const handleWeight = (event) => {
        setWeight(event.target.value)
    }

    const handlestatus = (event) => {
        setStatus(event.target.value)
    }

    const handleClose = () => {
        setOpen(false)
    }


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
    //__________________________________________

    // Create an API for fetch all the date of subCategoryList----->>>>
    const [subcategoryList, setSubCategoryList] = useState([])


    const fetchAllSubCategory = async (cid) => {
        var result = await postData('subCategory/subCategory_list_by_categoryid', { categoryid: cid })
        setSubCategoryList(result.data)
    }

    const fillSubCategory = () => {
        return subcategoryList.map((item) => {

            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>

        })
    }

    const [product, setProduct] = useState([])

    const fetchAllProduct = async (sid) => {
        var result = await postData('product/product_list_by_subcategoryid', { subcategoryid: sid })
        setProduct(result.data)
        // alert(JSON.stringify(result.data))
    }

    const fillProduct = () => {
        return product.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }


    const handleCategoryChange = (event) => {
        setCategoryid(event.target.value)
        fetchAllSubCategory(event.target.value)
    }
    const handleSubCategoryChange = (event) => {
        setSubCategoryid(event.target.value)
        fetchAllProduct(event.target.value)
    }
    const handleProductChange = (event) => {
        setProductName(event.target.value)
    }

    //DisplayAllProductList-------->>>>>>>>
    const [productList, setProductList] = useState([])

    const fetchAllProductList = async () => {
        var result = await getData('productList/product_list')
        // alert(JSON.stringify(result.data))
        setProductList(result.data)
        // console.log(result.data)
    }

    useEffect(
        function () {
            fetchAllProductList()
        }, []
    )
    //__________________________________________________________________

    const handleEditData = async () => {
        var formData = {
            'productlistid': productListId,
            'productid': productid,
            'categoryid': categoryid,
            'subcategoryid': subcategoryid,
            'productlistname': productListName,
            'description': description,
            'rate': rate,
            'offer': offer,
            'weight': weight,
            'stock': stock,
            'status': status
        }
        var result = await postData('productList/productList_edit_data', formData)
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
        fetchAllProductList()
    }

    const handleClick = (rowData) => {
        setOpen(true)
        setCategoryid(rowData.categoryid)
        setProductListId(rowData.productlistid)
        setSubCategoryid(rowData.subcategoryid)
        fetchAllSubCategory(rowData.categoryid)
        fetchAllProduct(rowData.subcategoryid)
        setProductid(rowData.productid)
        setProductName(rowData.productid)
        setDescription(rowData.description)
        setProductListName(rowData.productlistname)
        setRate(rowData.rate)
        setOffer(rowData.offer)
        setWeight(rowData.weight)
        setStock(rowData.stock)
        setStatus(rowData.status)
        setIcon({ file: `${serverURL}/images/${rowData.picture}`, bytes: '' })
    }

    const handleDelete = async (rowData) => {
        var result = await postData('productList/productList_delete_data', { productlistid: rowData.productlistid })
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
        fetchAllProductList()
    }

    function DisplayAllProductList() {
        return (
            <>
                <Dialog open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description">

                    <DialogTitle>Edit/Delete Product_List</DialogTitle>
                    <DialogContent>
                        {/* hello */}
                        {showProductListForm()}
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handleEditData} variant="contained" fullWidth>Edit</Button> */}
                        <Button onClick={handleClose} variant="contained" >close</Button>
                    </DialogActions>

                </Dialog>
            </>
        )
    }

    const showProductListForm = () => {
        return (
            <Grid container spacing={0.5}>
                <Grid item xs={12}>
                    <div className={classes.headingStyle}>
                        ProductList Interface:
                    </div>
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"  >Sub-Category Name </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label="Sub-Category Name"
                            value={subcategoryid}
                            onChange={handleSubCategoryChange}
                        >
                            <MenuItem>Select Category</MenuItem>
                            {fillSubCategory()}
                        </Select>
                    </FormControl>
                    <div className={classes.errorText}>{error.subcategoryid}</div>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"  >Product Name </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label="Product Name"
                            value={productName}
                            onChange={handleProductChange}
                        >
                            <MenuItem>Select Category</MenuItem>
                            {fillProduct()}
                        </Select>
                    </FormControl>
                    <div className={classes.errorText}>{error.produ}</div>

                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        label="Description" variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={productListName}
                        onChange={(event) => setProductListName(event.target.value)}
                        label="ProductList Name" variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={rate}
                        onChange={(event) => setRate(event.target.value)}
                        label="Rate" variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={offer}
                        onChange={(event) => setOffer(event.target.value)}
                        label="Offer" variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" error={!error.status ? false : true}>Weight</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label="Status"
                            // onChange={(event) => { setStatus(event.target.value) }}______'use only Textfield'___
                            onChange={handleWeight}
                            value={weight}
                        >
                            <MenuItem value='-Select Status-'>-Select Weight-</MenuItem>
                            <MenuItem value='ltr'>leters</MenuItem>
                            <MenuItem value='g'>g</MenuItem>
                            <MenuItem value='ml'>ml</MenuItem>
                            <MenuItem value='kgs'>kgs</MenuItem>
                            <MenuItem value='peice'>peice</MenuItem>
                        </Select>
                    </FormControl>
                    <div className={classes.errorText} > {error.weight}</div>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={stock}
                        onChange={(event) => setStock(event.target.value)}
                        label="Stock" variant="outlined"
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
                    <div className={classes.errorText} >  {error.status} </div>
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


    function showProductList() {
        return (
            <>
                {/*  <>  Reactfregment<<<----use like div */}
                <MaterialTable
                    title="Display-ProductList"
                    columns={[
                        { title: 'ProductId', field: 'productid' },
                        { title: 'Category Name', field: 'categoryname' },
                        { title: 'sub-category name', field: 'subcategoryname' },
                        {
                            title: 'Product Name/productList Name', field: 'productname',
                            render: rowData => <div>
                                <div>{rowData.productname}</div>
                                <div>{rowData.productlistname}</div>
                            </div>
                        },
                        { title: 'Description', field: 'description' },
                        // { title: 'ProductListName', field: 'productlistname' },
                        { title: 'Rate', field: 'rate' },
                        { title: 'Offer', field: 'offer' },
                        { title: 'Weight', field: 'weight' },
                        { title: 'Stock', field: 'stock' },
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
                            tooltip: 'Add Extra Product',
                            isFreeAction: true,
                            onClick: (event) => navigate('/dashboard/productlistinterface')

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
                {showProductList()}
            </div>
            {/* {EditProduct()} */}
            {DisplayAllProductList()}
        </div>
    )


}
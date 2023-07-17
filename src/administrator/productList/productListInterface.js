import { useEffect, useState } from "react"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { FormControl, Grid, InputLabel, Avatar, Select, Button, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, IconButton, collapseClasses, MenuItem, useStepContext } from "@mui/material"
import { useStyle } from "../categories/CategoryCss";
import Swal from "sweetalert2";
import { getData, postData } from "../sevices/fetchNodeServices";

import { DropzoneArea } from "material-ui-dropzone";
import { useNavigate } from "react-router-dom";
import ViewListIcon from '@mui/icons-material/ViewList';

export default function ProductListInterface() {
    const navigate = useNavigate()

    const classes = useStyle()
    const [status, setStatus] = useState('')
    const [icon, setIcon] = useState({ file: '/assets/cart.png', bytes: '' })
    const [productname, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState('')
    const [perpieceweight, setPerpieceweight] = useState('')
    const [weight, setWeight] = useState('')
    const [offer, setOffer] = useState('')
    const [rate, setRate] = useState('')
    // const [productList, setProductList] = useState('')
    const [productlistname, setProductListName] = useState('')
    const [error, setError] = useState({})
    const [categoryid, setCategoryid] = useState('')
    const [subcategoryid, setSubCategoryid] = useState('')


    const handlestatus = (event) => {
        setStatus(event.target.value)
    }
    const handleWeight = (event) => {
        setWeight(event.target.value)
    }
    const handlePicture = (event) => {
        setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        // handleError('icon', null)
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
    //____________________________________________________________________________

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
    //____________________________________________________________________________

    //create API ProductID--------->>>>>>
    const [productList, setProductList] = useState([])
    useEffect(function () {
        fetchAllProduct()
    }, [])

    const fetchAllProduct = async (sid) => {
        var result = await postData('productList/productList_by_subcategoryid', { subcategoryid: sid })
        setProductList(result.data)
    }

    const fillProduct = () => {
        return productList.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }
    //______________________________________________________________________________

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



    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
    }

    const validation = () => {
        var isValid = true

        if (!categoryid) {
            handleError('categoryid', 'plzz input C.id...')
            isValid = false
        }
        if (!productlistname) {
            handleError('productlistname', 'plzz input name of product...')
            isValid = false
        }
        if (!description) {
            handleError('description', 'plzz input description...')
            isValid = false
        }
        if (!rate) {
            handleError('rate', 'plzz input rate...')
            isValid = false
        }
        if (!offer) {
            handleError('offer', 'plzz input offer...')
            isValid = false
        }
        if (!weight) {
            handleError('weight', 'plzz input weight...')
            isValid = false
        }
        if (!stock) {
            handleError('stock', 'plzz input stock...')
            isValid = false
        }

        if (!status) {
            handleError('status', 'plzz input status...')
            isValid = false
        }
        if (!icon.bytes) {
            handleError('icon', 'plzz input icon...')
            isValid = false
        }


        return isValid
    }

    const handleReset = () => {

        setCategoryid('')
        setSubCategoryid('')
        setProductName('')
        setDescription('')
        setProductListName('')
        setRate('')
        setOffer('')
        setPerpieceweight('')
        setWeight('')
        setStock('')
        setStatus('')
        setIcon({ file: '/assets/cart.png', bytes: '' })
    }

    const handleClick = async () => {

        // var body = {
        //     'categoryid': categoryid,
        //     'subcategoryid': subcategoryid,
        //     'productid': productname,
        //     'description': description,
        //     'productlistname': productlistname,
        //     'rate': rate,
        //     'offer': offer,
        //     'perpieceweight': perpieceweight,
        //     'weight': weight,
        //     'stock': stock,
        //     'status': status,
        //     'icon': icon.bytes,
        // }

        // if (validation()) {
        var formData = new FormData()
        formData.append('categoryid', categoryid)
        formData.append('subcategoryid', subcategoryid)
        formData.append('productid', productname)
        formData.append('description', description)
        formData.append('productlistname', productlistname)
        formData.append('rate', rate)
        formData.append('offer', offer)
        formData.append('perpieceweight', perpieceweight)
        formData.append('weight', weight)
        formData.append('stock', stock)
        formData.append('status', status)
        formData.append('icon', icon.bytes)

        // icon.map((item, index) => {
        //     formData.append('picture' + index, item)
        // })

        // console.log("BODYYYY",body)
        var result = await postData("productList/productList_Submit", formData)

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
        // }
    }


    return (
        <div className={classes.displaycontainer}>
            <div className={classes.displaybox}>
                <Grid container spacing={0.5}>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                        <div className={classes.headingStyle}>
                            ProductList Interface:
                        </div>
                        <div>
                            <ViewListIcon onClick={() => navigate('/dashboard/displayallproductlist')} />
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
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"  >Sub-Category Name </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-label"
                                label="Sub-Category Name"
                                value={subcategoryid}
                                onFocus={() => handleError('subcategoryid', null)}
                                onChange={handleSubCategoryChange}
                                error={error.subcategoryid ? true : false}
                                helperText={error.subcategoryid}
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
                                value={productname}
                                onFocus={() => handleError('productname', null)}
                                onChange={handleProductChange}
                                error={error.productlistname ? true : false}
                                helperText={error.productlistname}
                            >
                                <MenuItem>Select Category</MenuItem>
                                {fillProduct()}
                            </Select>
                        </FormControl>
                        <div className={classes.errorText}>{error.produ}</div>

                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            error={!error.description ? false : true}
                            helperText={error.description}
                            value={description}
                            onFocus={() => handleError('description', null)}
                            onChange={(event) => setDescription(event.target.value)}
                            label="Description" variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            error={!error.description ? false : true}
                            helperText={error.productlistname}
                            value={productlistname}
                            onFocus={() => handleError('productlistname', null)}
                            onChange={(event) => setProductListName(event.target.value)}
                            label="ProductList Name" variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            error={!error.rate ? false : true}
                            helperText={error.rate}
                            value={rate}
                            onFocus={() => handleError('rate', null)}
                            onChange={(event) => setRate(event.target.value)}
                            label="Rate" variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            error={!error.offer ? false : true}
                            helperText={error.offer}
                            value={offer}
                            onFocus={() => handleError('offer', null)}
                            onChange={(event) => setOffer(event.target.value)}
                            label="Offer" variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            error={!error.offer ? false : true}
                            helperText={error.offer}
                            value={perpieceweight}
                            onFocus={() => handleError('perpieceweight', null)}
                            onChange={(event) => setPerpieceweight(event.target.value)}
                            label="per-pices-weight" variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" error={!error.status ? false : true}>Weight</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-label"
                                label="Status"
                                // onChange={(event) => { setStatus(event.target.value) }}______'use only Textfield'___
                                onFocus={() => handleError('weight', null)}
                                onChange={handleWeight}
                                value={weight}
                                error={!error.weight ? false : true}
                                helperText={error.weight}
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
                    <Grid item xs={4}>
                        <TextField
                            error={!error.stock ? false : true}
                            helperText={error.stock}
                            onFocus={() => handleError('stock', null)}
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
                                // onChange={(event) => { setStatus(event.target.value) }}______'use only Textfield'___
                                onFocus={() => handleError('status', null)}
                                onChange={handlestatus}
                                value={status}
                                // error={!error.status ? false : true}
                                helperText={error.status}
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
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input onChange={handlePicture} hidden accept="image/*" type="file" />
                            <CameraAltIcon />
                        </IconButton>
                        <div className={classes.errorText}>{error.icon}</div>
                        {/* <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={'Drag and drop an image here or click'}
                            onChange={(files)=>
                                handlePicture(files) 
                            }
                            filesLimit={2}
                        /> */}
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
                        <Button onClick={handleReset} variant="contained" fullWidth>Reset</Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}
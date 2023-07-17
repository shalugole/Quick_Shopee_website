import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import { useStyle } from "../categories/CategoryCss";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { getData, postData, serverURL } from "../sevices/fetchNodeServices";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Slide, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { DropzoneArea } from "material-ui-dropzone";
import { AutoStories } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function DisplayProductPictures() {
    const navigate = useNavigate()
    const classes = useStyle()

    const [categoryid, setCategoryid] = useState('')
    const [subcategoryid, setSubCategoryid] = useState('')
    const [productid, setProductid] = useState('')
    const [productName, setProductName] = useState('')
    const [productlistid, setProductlistid] = useState('')
    const [banners, setBanners] = useState('')
    const [picture, setPicture] = useState('')
    // const[productList,setProductList]=useState([])  
    const [error, setError] = useState([])

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))  
    }  

    //Create Api to fetch CategoryListId----->>>>>
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

    //--------------------------------------------------------

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
    const [product, setProduct] = useState([])

    useEffect(function () {
        fetchAllProduct()
    }, [])

    const fetchAllProduct = async (sid) => {
        var result = await postData('productList/productList_by_subcategoryid', { subcategoryid: sid })
        setProduct(result.data)
    }

    const fillProduct = () => {
        return product.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    //______________________________________________________________________________

    //fetch productList dropdown-------------->>>>>
    const [productList, setProductList] = useState([])

    useEffect(function () {
        fetchAllProductList()
    }, [])

    const fetchAllProductList = async (pid) => {
        var result = await postData('productList/productList_by_productid', { productid: pid })
        setProductList(result.data)
        // console.log(result.data)
    }
    const fillProductList = () => {
        return productList.map((item) => {
            return <MenuItem value={item.productlistid}>{item.productlistname} {item.perpieceweight} {item.weight} </MenuItem>
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
        fetchAllProductList(event.target.value)
        setProductName(event.target.value)
    }
    const handleProductListChange = (event) => {
        setProductid(event.target.value)

    }
    const validation = () => {
        var isValid = true


        return isValid
    }

    const handleImages=(files)=>{
        setBanners(files)
    }

    const handleSubmit = async () => {
        alert("chirag")
        // if(validation()){
        var formData = new FormData()
        formData.append('categoryid', categoryid)
        formData.append('subcategoryid', subcategoryid)
        formData.append('productid', productName)
        formData.append('productlistid', productid)
        banners.map((item,i)=>{
            formData.append('picture'+i,item)
        })

        // banners.map((item, i) => {
        //     formData.append('picture' + i, item)
        // })
        // var body = {
        //     'categoryid': categoryid,
        //     'subcategoryid': subcategoryid,
        //     'productname': productName,
        //     'productid': productid,
        //     'picture': formData
        // }


        // alert(JSON.stringify(formData))
        console.log('VBYY', formData)

        var result = await postData('productpicture/productPicture_Submit', formData)
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

    return (

        <div className={classes.displaycontainer}>
            <div className={classes.displaybox}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={classes.headingStyle}>
                            Display Product-Pictures:
                        </div>
                    </Grid>
                    <Grid item xs={3}>
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
                    <Grid item xs={3}>
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
                                <MenuItem>Select Sub-Category</MenuItem>
                                {fillSubCategory()}
                            </Select>
                        </FormControl>
                        <div className={classes.errorText}>{error.subcategoryid}</div>

                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product Name </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-label"
                                label="Product Name"
                                value={productName}
                                onChange={handleProductChange}
                            >
                                <MenuItem>Select-Product</MenuItem>
                                {fillProduct()}
                            </Select>
                        </FormControl>
                        <div className={classes.errorText}>{error.produ}</div>

                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"  >ProductList Name </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-label"
                                label="ProductList Name"
                                value={productid}
                                onFocus={() => handleError('productname', null)}
                                onChange={handleProductListChange}
                            >
                                <MenuItem>Select ProductList</MenuItem>
                                {fillProductList()}
                            </Select>
                        </FormControl>
                        <div className={classes.errorText}>{error.produ}</div>

                    </Grid>
                    <Grid item xs={12}>

                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={'Drag and drop an image here or click'}
                            onChange={(files) =>
                                handleImages(files)
                            }
                            filesLimit={8}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleSubmit} variant="contained" fullWidth>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth>Reset</Button>
                    </Grid>

                </Grid>

            </div>

        </div>

    )

}
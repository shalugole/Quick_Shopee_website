import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Avatar, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { getData, postData, serverURL } from "../sevices/fetchNodeServices";
import { useStyle } from "../categories/CategoryCss";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function DisplayAllSubCategory() {
  const navigate=useNavigate()

  const classes = useStyle()
  const [open, setOpen] = useState(false)
  const [subcategoryList, setSubCategoryList] = useState([])

  const [status, setStatus] = useState('')
  const [icon, setIcon] = useState({ file: '/assets/cart.png', bytes: '' })
  const [subcategoryid, setSubCategoryid] = useState([])
  const [subcategoryname, setSubCategoryName] = useState()
  const [categoryid, setCategoryid] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [error, setError] = useState({})

  const [btnStatus, setButtonStatus] = useState(false)
  const [oldIcon, setOldIcon] = useState('')

  const [categoryList, setCategoryList] = useState([])

  //fill category_________
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
  //_________________________________________________\\

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }))
    console.log(error)
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
    // if (!icon.bytes) {
    //     handleError('icon', 'plzz select icon...')
    //     isValid = false
    // }
    return isValid
  }

  const handleEditData = async () => {
    setOpen(false)

    if (validation()) {
      var body = { subcategoryid: subcategoryid, categoryid: categoryid, subcategoryname: subcategoryname, status: status }

      var result = await postData('subCategory/subCategory_edit_data', body)
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
    fetchSubCategoryList()
  }

  const fetchSubCategoryList = async () => {
    var result = await getData('subcategory/subcategory_list')
    setSubCategoryList(result.data)
  }

  function ShowSubCategory() {
    return (
      <MaterialTable
        title="SubCategoryList"
        columns={[
          { title: 'sub-categoryid', field: 'subcategoryid' },
          { title: 'Category-name ', field: 'categoryname' },
          { title: 'sub-category name', field: 'subcategoryname' },
          { title: 'status', field: 'status' },
          {
            title: 'icon', field: 'icon',
            render: rowData =>
              <Avatar src={`${serverURL}/images/${rowData.icon}`}
                style={{ width: 75 }}
                variant='rounded' />
          }
        ]}
        data={subcategoryList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Sub-Category',
            onClick: (event, rowData) => handleOpen(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Sub-Category',
            isFreeAction: true,
            onClick: (event) => navigate("/dashboard/subcategory")
          },
          {
            icon: "delete",
            tooltip: "Delete subCategory",
            onClick: (event, rowData) => handleDelete(rowData)
          }
        ]}
      />
    )
  }

  const handlePicture = (event) => {
    setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    handleError('icon', null)
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
    formData.append('subcategoryid', subcategoryid)
    formData.append('icon', icon.bytes)

    var result = await postData('subCategory/subCategory_edit_icon', formData)

    if (result.status) {
      Swal.fire({
        icon: 'success',
        // position: 'top-end',
        title: result.message,
        showConfirmButton: true,
        // timer: 1500
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        // position: 'top-end',
        title: result.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
    fetchSubCategoryList()
  }

  const handleDelete = async () => {
    setOpen(false)
    if (validation()) {
      var body = { subcategoryid: subcategoryid }

      var result = await postData("subCategory/subCategory_delete_data", body)
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
    fetchSubCategoryList()
  }

  const showSubCategoryForm = () => {
    return (
      <div className={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#dfe6e9',
        width: '70vw',
        height: '70vh'
      }}>
        <div className={{
          width: '50%',
          height: 'auto',
          padding: 15,
          backgroundColor: '#fff',
          borderRadius: 10
        }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={classes.headingStyle}>
                Add Sub-Category
              </div>
            </Grid>
            <Grid item xs={12}>
              {/* <TextField value={categoryid} error={!error.categoryid ? false : true} helperText={error.categoryid} onFocus={() => handleError('categoryid', null)} onChange={(event) => { setCategoryid(event.target.value) }} label="categoryid" variant="outlined" fullWidth /> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"  >Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-label"
                  label="Category"
                  value={categoryid}
                  onFocus={() => handleError('categoryid', null)}
                  onChange={(event) => { categoryid(event.target.value) }}
                  error={error.categoryid ? true : false}
                  helperText={error.categoryid}
                >
                  <MenuItem>Select Category</MenuItem>
                  {fillCategory()}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={subcategoryname}
                error={!error.subcategoryname ? false : true}
                helperText={error.subcategoryname}
                onFocus={() => handleError('subcategoryname', null)}
                onChange={(event) => setSubCategoryName(event.target.value)}
                label="sub-category Name" variant="outlined"
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
                  value={status}
                  // onChange={(event) => { setStatus(event.target.value) }}
                  onFocus={() => handleError('status', null)}
                  onChange={(event) => { setStatus(event.target.value) }}
                  // error={!error.status?false:true} 
                  helperText={error.status}
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
        </div>
      </div>

    )
  }

  useEffect(function () {
    fetchSubCategoryList()

  }, [])

  const handleClose = (rowData) => {
    setOpen(false)
  }

  const handleOpen = (rowData) => {
    // alert(JSON.stringify(rowData)) 
    setSubCategoryid(rowData.subcategoryid)
    setCategoryid(rowData.categoryid)
    setSubCategoryName(rowData.subcategoryname)
    setStatus(rowData.status)
    setIcon({ file: `${serverURL}/images/${rowData.icon}`, bytes: '' })

    setOldIcon(rowData.icon)
    setOpen(true)
  }

  const displaySubCategoryDialog = () => {
    return (
      <Dialog open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">

        <DialogTitle>Edit/Delete Sub-Category</DialogTitle>
        <DialogContent>
          {/* hello.. */}
          {showSubCategoryForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>

      </Dialog>
    )
  }

  return (
    <div className={classes.displaycontainer}>

      <div className={classes.displaybox}>
        {ShowSubCategory()}
      </div>
      {displaySubCategoryDialog()}
    </div>
  )
}
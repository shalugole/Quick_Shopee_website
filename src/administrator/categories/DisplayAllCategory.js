//**_________Liabraries_________**\\\ 
import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { getData, postData, serverURL } from "../sevices/fetchNodeServices";
import { Avatar, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useStyle } from "./CategoryCss";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function DisplayAllCategory() {

  const navigate=useNavigate()
  const classes = useStyle()
  const [open, setOpen] = useState(false)
  const [categoryList, setCategoryList] = useState([])

  const [status, setStatus] = useState('')
  const [icon, setIcon] = useState({ file: '/assets/cart.png', bytes: '' })
  const [categoryName, setCategoryName] = useState('')
  const [categoryid, setCategoryid] = useState('')
  const [error, setError] = useState({})

  const [btnStatus, setButtonStatus] = useState(false)
  const [oldIcon, setOldIcon] = useState('')

  // handle For Errorr -------->>>>>>>>>>>>>>>>>>>>>>>>>
  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }))
    console.log(error)
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
    // if (!icon.bytes) {
    //   handleError('icon', 'plz select icon for category...')
    //   isValid = false
    // }
    return isValid
  }
  //  Handle For Data Submit ---------------->>>>>>>>>>>>>>>>>>>>>>>>>
  const handleEditData = async () => {
    setOpen(false) //for close the dialogbox

    //    var v=validation()
    //    alert("v")
    if (validation()) {
      //<<<<<<------formdata only use when MODIFIED THE PICTURE--------->>>> */
      // var formData = new FormData()
      // formData.append('categoryname', categoryName)
      // formData.append('status', status)
      // formData.append('icon', icon.bytes)  

      //_____>>>>>body use only show simple page -------->>
      var body = { categoryid: categoryid, categoryname: categoryName, status: status }

      var result = await postData('category/category_edit_data', body)
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
      //  handleClose()
    }
    fetchCategoryList()

  }
  const fetchCategoryList = async () => {
    var result = await getData('category/category_list')
    setCategoryList(result.data)
  }

  function ShowCategory() {
    return (
      <MaterialTable
        title="CategoryList"
        columns={[
          { title: 'category id', field: 'categoryid' },
          { title: 'category name', field: 'categoryname' },
          { title: 'status', field: 'status' },
          {
            title: 'icon', field: 'icon',
            render: rowData =>
              <Avatar src={`${serverURL}/images/${rowData.icon}`}
                style={{ width: 75 }}
                variant='rounded' />
          }
        ]}
        data={categoryList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category',
            onClick: (event, rowData) => handleOpen(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: (event) => navigate("/dashboard/categoryinterface")
          },
          {
            icon: "delete",
            tooltip: "Delete Category",
            onClick: (event, rowData) => handleDelete(rowData)
          }
        ]}
      />
    )
  }

  const handlePicture = (event) => {

    // alert("hello")
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
    formData.append('categoryid', categoryid)
    formData.append('icon', icon.bytes)

    var result = await postData('category/category_edit_icon', formData)

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

    fetchCategoryList()
  }

  const handleDelete = async () => {
    setOpen(false) //for close the dialogbox
    if (validation()) {
      //_____>>>>>body use only show simple page -------->>
      var body = { categoryid: categoryid }

      var result = await postData('category/category_delete_data', body)
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
    fetchCategoryList()
  }

  const showCategoryForm = () => {
    return (
      <div className={classes.container}>
        <div className={classes.box}>
          <Grid container spacing={2}>
            <Grid item xs={12}  >
              <div className={classes.headingStyle} >
                Add New Category
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={categoryName}
                error={!error.categoryName ? false : true}
                helperText={error.categoryName}
                onFocus={() => handleError('categoryName', null)}
                onChange={(event) => { setCategoryName(event.target.value) }}
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
                  value={status}
                  onChange={(event) => { setStatus(event.target.value) }}
                  onFocus={() => handleError('status', null)}
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
                // src="/assets/cart.png"
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
              <Button onClick={handleEditData} variant='contained' fullWidth >Edit</Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleDelete} variant='contained' fullWidth>Delet</Button>
            </Grid>
          </Grid>
        </div>
      </div>)
  }

  //rendering se phele data lene ke liye=>useEffect
  useEffect(function () {
    fetchCategoryList()
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = (rowData) => {
    //  alert(JSON.stringify(rowData))
    setCategoryid(rowData.categoryid)
    setCategoryName(rowData.categoryname)
    setStatus(rowData.status)
    setIcon({ file: `${serverURL}/images/${rowData.icon}`, bytes: '' })

    setOldIcon(rowData.icon)

    setOpen(true)
  }

  const displayCategoryDialog = () => {
    return (
      <Dialog open={open}
      // onChange={handleClose} 
      >

        <DialogTitle>Edit/Delete Category</DialogTitle>
        <DialogContent>
          {/* Hello... */}
          {showCategoryForm()}
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
        {ShowCategory()}
      </div>
      {displayCategoryDialog()}
    </div>
  )
}
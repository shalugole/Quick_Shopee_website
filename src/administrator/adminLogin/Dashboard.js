// import { Dashboard } from "@mui/icons-material";
import { AppBar, Avatar, Grid, Paper, makeStyles } from "@mui/material";
import { useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import { serverURL } from "../sevices/fetchNodeServices";
import { DriveEtaRounded } from "@mui/icons-material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Route, Routes, useNavigate } from "react-router-dom";

import DisplayAllCategory from "../categories/DisplayAllCategory";
import DisplayProductPictures from "../banners/DisplayProductPictures";
import BannersInterface from "../banners/BannersInterface";
import DisplayAllProductList from "../productList/DisplayAllProductList";
import DisplayAllProducts from "../products/DisplayAllProducts";
import DisplayAllSubCategory from "../subCategories/DisplayAllSubCategory";
import CategoryInterface from "../categories/CategoryInterface";
import SubCategory from "../subCategories/SubCategory";
import Product from "../products/ProductInterface";
import ProductListInterface from "../productList/productListInterface";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import VignetteIcon from '@mui/icons-material/Vignette';
import GrainIcon from '@mui/icons-material/Grain';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';


export default function Dashboard() {
    var admin = JSON.parse(localStorage.getItem("ADMIN"))
    // console.log("ADDDDMMMIINNN", admin) 
    const navigate = useNavigate()


    return (
        <div>
            <AppBar
                position="static"
                style={{
                    background: "rgb(238,174,202)",
                    background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                }}
            >
                <Toolbar>
                    <div style={{ color: '#000', fontFamily: 'Poppins', letterSpacing: 1, fontWeight: 500, fontSize: 25, }}>
                        QuikShopee
                    </div>
                </Toolbar>
            </AppBar>

            <div elevation={6}>
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <Paper
                            style={{
                                width: 251, display: 'flex', flexDirection: 'column', marginBottom: 10, background: "#FDF4F5"
                                // background: "rgb(238,174,202)",background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                            }}
                        >
                            <div style={{
                                background: "#F2E3DB", padding: '10px 10px 10px 20px', color: '#000000',cursor:'pointer',

                                // paddingLeft: 10, paddingTop: 10, paddingBottom: 10, paddingRight: 20, 
                                fontFamily: 'Poppins', marginBottom: 10, display: 'flex', justifyContent: 'space-evenly'
                            }} src={`${serverURL}/images/cart.gif`}
                                onClick={() => navigate('/dashboard')}
                            >
                                Dashboard
                                <AssignmentIcon />
                            </div>


                            <Paper elevation={11} style={{ background: '#F0EEED', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', display: 'flex' }} >

                                <Avatar src={`${serverURL}/images/girl.jpeg`} style={{ width: 70, height: 70, paddingBottom: 5 }} />
                                <div style={{ fontFamily: 'Poppins' }} >
                                    {/* Shaluuu... */}
                                    {admin.edminname}
                                </div>

                                <div style={{ fontSize: 12 }}>
                                    {admin.emailid}
                                </div>

                            </Paper>


                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => navigate('/dashboard/displayallcategory')} >
                                        <ListItemIcon >
                                            <AddShoppingCartIcon style={{ color: "#000000" }} />
                                            {/* <InboxIcon /> */}
                                        </ListItemIcon>
                                        <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '100' }}>Category</span>} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => navigate('/dashboard/displayallsubcategory')}>
                                        <ListItemIcon>
                                            <ShoppingCartCheckoutIcon style={{ color: "#000000" }} />
                                            {/* <InboxIcon /> */}
                                        </ListItemIcon>
                                        <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '100' }}>Sub-Category</span>} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => navigate('/dashboard/displayallproducts')}>
                                        <ListItemIcon>
                                            <ShoppingCartIcon style={{ color: "#000000" }} />
                                            {/* <InboxIcon /> */}
                                        </ListItemIcon>
                                        <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '100' }}>Product</span>} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => navigate('/dashboard/displayallproductlist')}>
                                        <ListItemIcon>
                                            <ViewStreamIcon style={{ color: "#000000" }} />
                                            {/* <InboxIcon /> */}
                                        </ListItemIcon>
                                        <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '100' }}>Product List</span>} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => navigate('/dashboard/bannersinterface')} >
                                        <ListItemIcon>
                                            <VignetteIcon style={{ color: "#000000" }} />
                                            {/* <InboxIcon /> */}
                                        </ListItemIcon>
                                        <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '100' }}>Banner</span>} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => navigate('/dashboard/displayproductpictures')} >
                                        <ListItemIcon>
                                            <GrainIcon style={{ color: "#000000" }} />
                                            {/* <InboxIcon /> */}
                                        </ListItemIcon>
                                        <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '100' }}>Product Picture Banner</span>} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => navigate('/adminlogininterface')}>
                                        <ListItemIcon>
                                            <LogoutIcon style={{ color: "#000000" }} />
                                            {/* <InboxIcon /> */}
                                        </ListItemIcon>
                                        <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '100' }}>LogOut</span>} />
                                    </ListItemButton>
                                </ListItem>
                            </List>

                        </Paper>
                    </Grid>
                    <Grid item xs={10} style={{background:"url('/assets/cart.gif')", backgroundSize:"cover"}}>
                        {/* <div>
                            <img src="/assets/cart.gif" style={{ width: "90vw", zIndex: -1, display: "flex" }} />
                        </div> */}
                        {/*-------->>>>___DashBoard Routes_____<<<<----------- */}
                        <div style={{ zIndex: 2, display: "flex" }}>

                            <Routes>

                                <Route element={<CategoryInterface />} path="/categoryinterface" />
                                <Route element={<DisplayAllCategory />} path="/displayallcategory" />
                                <Route element={<SubCategory />} path="/subcategory" />
                                <Route element={<DisplayAllSubCategory />} path="/displayallsubcategory" />
                                <Route element={<Product />} path="/product" />
                                <Route element={<DisplayAllProducts />} path="/displayallproducts" />
                                <Route element={<ProductListInterface />} path="/productlistinterface" />
                                <Route element={<DisplayAllProductList />} path="/displayallproductlist" />
                                <Route element={<BannersInterface />} path="/bannersinterface" />
                                <Route element={<DisplayProductPictures />} path="/displayproductpictures" />

                            </Routes>
                        </div>

                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

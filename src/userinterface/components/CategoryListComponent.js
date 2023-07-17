import React from "react";
import { useStyle } from "./userinterfaceCss";
import { AppBar, Avatar, FormControl, Grid, Paper, Toolbar, Tooltip } from "@mui/material";
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Route, Routes, useNavigate } from "react-router-dom";
import { serverURL } from "../../administrator/sevices/fetchNodeServices";
import AddvertishmentBaar from "./AddvertishmentBaar";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function CategoryListComponent({ data,getSubCategoryId }) {  //<<<----props will not use 

    const classes = useStyle();
    const navigate = useNavigate()

    const theme=useTheme();
    const sm=useMediaQuery(theme.breakpoints.down('sm'));
    const md=useMediaQuery(theme.breakpoints.down('md'));
    const lg=useMediaQuery(theme.breakpoints.up('lg'));

    
    const handleClick=(item)=>{
        getSubCategoryId(item.subcategoryid,item.subcategoryname)  
    }


    const listView = () => {
        return data.map((item) => {
            return (
                <ListItem disablePadding  className={classes.hoverCategoryListComponent}>  
                    <ListItemButton onClick={()=>handleClick(item)}  >
                        <ListItemIcon >
                            <Avatar src={`${serverURL}/images/${item.icon}`} style={{ alignItems: 'center', background: '#ECC9EE' }} />
                        </ListItemIcon>
                        <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: 700 }} >{item.subcategoryname}</span>} />
                    </ListItemButton>
                </ListItem>
            )
        })
    }

    return (
        <div data-aos-duration="1500" data-aos="flip-right">

            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <Paper style={{width: sm?'12vw':md?'10vw':'14vw', display: 'flex', flexDirection: 'column', marginBottom: 10, background: "#FDF4F5", marginLeft: 90, alignItems: 'center', marginTop: 10}}>
                     
                        <div style={{fontFamily:'Poppins',fontWeight:1000,fontSize:20,alignItems:'center',justifyContent:'center',display:'flex'}} >
                            <Avatar src={`${serverURL}/images/cart.gif`} style={{width:"22%",height:'8vh'}} />
                            Top Categories
                        </div>
                      
                        <List style={{width: 200,height:'auto', display: 'flex', flexDirection: 'column', marginBottom: 10, background: "#fff", }} >
                            {listView() }
                        </List>
                      
                    </Paper>
                </Grid>

            </Grid>

        </div>
    )
}
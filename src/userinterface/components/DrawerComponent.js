import React, { useEffect, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import ArchiveIcon from '@mui/icons-material/Archive';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AppsOutageIcon from '@mui/icons-material/AppsOutage';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import GroupsIcon from '@mui/icons-material/Groups';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';

import { Button, Menu } from "@mui/material";
import { useStyle } from "./userinterfaceCss";
import { serverURL } from "../../administrator/sevices/fetchNodeServices";
import Home from "../Screens/Home";


const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function DrawerComponent(props) {

  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const classes = useStyle()

  useEffect(function(){
    
    setOpen(props.open)
   
  },[props.open])

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
    props.setOpen(false)
  }


  return (
    // <Box style={{ width: '1vw' }} lg={{ display: 'flex' }} >
    //   <CssBaseline />
    //   <IconButton color="inherit"
    //     aria-label="open drawer"
    //     onClick={handleDrawerOpen}
    //     edge="start"
    //     sx={{ mr: 2, ...(open && { display: 'none' }) }} >

    //     {/* <MenuIcon style={{ color: '#000000', borderRadius: 30 }} className={classes.hoverCategoryListComponent} /> */}
    //   </IconButton>
      <Drawer
        lg={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',

          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
       

      >
        <DrawerHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', background: '#F72464' }} >

          <IconButton style={{ width: '2vw', height: '4vh', boxShadow: '0 4px 7px', }} className={classes.hoverCategoryListComponent} >
            <ChevronLeftIcon onClick={handleDrawerClose} style={{ justifyContent: 'center', alignItems: 'center',color:'#fff' }} />
          </IconButton>

          <div style={{ fontSize: 18, fontWeight: 600, fontFamily: 'Poppins', marginRight: 150, width: 8,color:"#fff" }} >Hello!</div>
          <Button variant="outlined" className={classes.hoverCategoryListComponent}
            style={{
              borderRadius: 15, borderColor: '#ffff', fontSize: 12, fontWeight: 600, fontFamily: 'Poppins', display: 'flex', justifyContent: 'center', width: '5vw', height: '4vh', marginRight: 5, color: '#ffff'
            }} >
            SignIn</Button>
        </DrawerHeader>
        <Divider style={{ width: '20vw', marginLeft: 14 }} />
        <List style={{ background: '#FCF1F1' }} >

          <ListItem disablePadding style={{ height: '8vh' }}  >
            <ListItemButton style={{ height: '6vh' }} >
              <ListItemIcon style={{ marginLeft: 15 }} >
                <HomeIcon style={{ color: "#1B262C" }} />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>Home</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />

          <ListItem disablePadding style={{ height: '7vh' }} >
            <ListItemButton style={{ height: '4vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <CategoryIcon style={{ color: "#1B262C" }} />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>Shop by category</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />
          <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'Poppins', marginLeft: 15, marginTop: 5 }} >
            My Account
          </div>

          <ListItem disablePadding style={{ height: '7vh' }}>
            <ListItemButton style={{ height: '6vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <AppsOutageIcon style={{ color: "#1B262C" }} />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>My Order</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />

          <ListItem disablePadding style={{ height: '7vh' }} >
            <ListItemButton style={{ height: '4vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <PlaylistAddCheckIcon style={{ color: "#1B262C" }} />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>My List</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />

          <ListItem disablePadding style={{ height: '7vh' }} >
            <ListItemButton style={{ height: '4vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <FavoriteBorderIcon style={{ color: "#1B262C" }} />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>My Wish</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />

          <ListItem disablePadding style={{ height: '7vh' }} >
            <ListItemButton style={{ height: '4vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <AccountBalanceWalletIcon style={{ color: "#1B262C" }} />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>QuickShoee Wallet</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />
          <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'Poppins', marginLeft: 15, marginTop: 5 }} >
            Order & More
          </div>

          <ListItem disablePadding style={{ height: '7vh' }}>
            <ListItemButton style={{ height: '4vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <img src={`${serverURL}/images/offericon3.png`} style={{ width: '2vw', height: '3vh' }} />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>Offer Store</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />

          <ListItem disablePadding style={{ height: '7vh' }} >
            <ListItemButton style={{ height: '4vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <img src={`${serverURL}/images/offericon2.png`} style={{ width: '2vw', height: '4vh' }} />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>Coupon Store</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />

          <ListItem disablePadding style={{ height: '7vh' }}>
            <ListItemButton style={{ height: '4vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <CardGiftcardIcon style={{ color: "#1B262C" }} />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>Gift Store</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />

          <ListItem disablePadding style={{ height: '7vh' }} >
            <ListItemButton style={{ height: '4vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <img src={`${serverURL}/images/giftcart.com.png`} style={{ width: '2vw', height: '4vh' }} />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>QuickShopee Gift Cart</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />
          <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'Poppins', marginLeft: 15, marginTop: 5 }} >
            Help & Support
          </div>

          <ListItem disablePadding style={{ height: '7vh' }}>
            <ListItemButton style={{ height: '6vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <ContactSupportIcon style={{ color: "#1B262C" }} />

              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>FAQs/Need Help</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />

          <ListItem disablePadding style={{ height: '7vh' }} >
            <ListItemButton style={{ height: '4vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <GroupsIcon style={{ color: "#1B262C" }} />

              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>About Us</span>} />
            </ListItemButton>
          </ListItem>

          <Divider style={{ width: '18vw', marginLeft: 14 }} />

          <ListItem disablePadding style={{ height: '7vh' }} >
            <ListItemButton style={{ height: '4vh' }}>
              <ListItemIcon style={{ marginLeft: 15 }}>
                <PhoneForwardedIcon style={{ color: "#1B262C" }} />

              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: 'Poppins', fontWeight: '400', color: '#686D76' }}>Contact Us</span>} />
            </ListItemButton>
          </ListItem>
        <Divider style={{ width: '18vw', marginLeft: 14, }} />
          <div style={{marginBottom:30}} ></div>


        </List>
        
        <Divider style={{ width: '18vw', marginLeft: 14, marginBottom: 10 }} />
{/* 
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', background: '#ccc' }}  >

          <img src={`${serverURL}/images/cart (2).gif`} width={60} height={60} />
          <span style={{
            backgroundImage: "conic-gradient(from 95deg, rgba(227, 98, 107, 1.0), rgba(197, 164, 201, 1.0))",
            // backgroundImage: "linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% )",
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', fontSize: 20

          }}
          >
            Quick
          </span>
          <span style={{
            backgroundImage: "conic-gradient(from 95deg,  rgba(4,60,63,1), rgba(66,15,15,1))",
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', fontSize: 20
          }}
          >
            Shopee
          </span>
         

        </div> */}
        {/* <Divider style={{ width: '18vw', marginLeft: 14, marginBottom: 20 }} /> */}
        



      </Drawer>


    // </Box>
  )
}
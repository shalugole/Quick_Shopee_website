import { AppBar, Badge, Toolbar, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import { useStyle } from "./userinterfaceCss";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuIcon from '@mui/icons-material/Menu';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
//use for MediaQueary----------->>>>>>
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { serverURL } from "../../administrator/sevices/fetchNodeServices";
import { useSelector } from "react-redux";

import DrawerComponent from "./DrawerComponent";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

import UserAddress from "./AllDialogs/UserAddress";
import UserPhoneNumberVerification from "./AllDialogs/UserPhoneNumberVerification";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
    //   right: -3,
    //   top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      background:"#F72464",
      padding: '0 4px',
    },
  }));


export default function Header(props) {

    const classes = useStyle()
    const navigate = useNavigate()
    const theme = useTheme();
    // const matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm')); //sm= 450
    const md = useMediaQuery(theme.breakpoints.down('md')); //md size=600
    const lg = useMediaQuery(theme.breakpoints.up('lg'));   //1000px 

    var products = useSelector((state) => state.products)
    var totalproducts = Object.keys(products)

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(false)
    }

    const handleDrawerClose = () => {
        setOpen(true)
    }

    return (
        <div style={{ width: '91%' }} >

            <AppBar position="fixed" style={{ height: sm ? "11%" : md ? "10%" : "9.8%", background: 'transparent', backdropFilter: "blur(20px)" }}>
                <Toolbar style={{ width: '100%' }}>
                    <div className={classes.toolbarStyle} >
                        <div className={classes.setHeadingStyle} style={{ fontSize: lg ? '2.5rem' : md ? "2rem" : 1, }} >
                            {/* QuickShopee {`${matches}`}   */}

                            <MenuIcon onClick={handleDrawerClose} style={{ color: '#000000', borderRadius: 30 }} className={classes.hoverCategoryListComponent} />

                            {lg ? <>
                                <img onClick={handleOpen} src={`${serverURL}/images/cart (2).gif`} width={80} height={80} data-aos="zoom-out-right" data-aos-duration="2000" />
                                <span style={{
                                    backgroundImage: "conic-gradient(from 95deg, rgba(227, 98, 107, 1.0), rgba(197, 164, 201, 1.0))",
                                    // backgroundImage: "linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% )",
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                                    data-aos="zoom-out-right"
                                    data-aos-duration="2000">
                                    Quick
                                </span>
                                <span style={{
                                    backgroundImage: "conic-gradient(from 95deg,  rgba(4,60,63,1), rgba(66,15,15,1))",
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                                    data-aos="zoom-out-left"
                                    data-aos-duration="2000">
                                    Shopee
                                </span>
                            </>
                                : <>
                                    <span style={{
                                        backgroundImage: "linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% )",

                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'

                                    }}>
                                        Q
                                    </span>
                                    <span style={{
                                        backgroundImage: "linear-gradient( 179deg,  rgba(0,0,0,1) 9.2%, rgba(127,16,16,1) 103.9% )",
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        S
                                    </span>

                                </>}
                            {/* {!matches ? `QuickShopee` : `QS`} */}

                        </div>
                        <div style={{ borderRadius: 30, overflow: "hidden", paddingRight: 3, width: '50%', display: 'flex', alignSelf: "center", marginLeft: "2%" }}>

                            <FormControl sx={{ m: 1, width: sm ? "50%" : !md ? "100%" : "90%" }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position='start'><SearchOutlinedIcon /></InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    sx={{ height: "5vh", borderRadius: 10 }}
                                />
                            </FormControl>

                        </div>
                        <div className={classes.setIconStyle} style={{ marginLeft: sm ? "-10%" : md ? "20%" : 2 }}>
                            <Tooltip title="Cart" arrow >
                                {/* <Badge badgeContent={totalproducts.length} color="action"  > */}
                                <StyledBadge badgeContent={totalproducts.length} color="secondary">
                                    <ShoppingCartIcon onClick={() => navigate("/cart")} />
                                    </StyledBadge>
                                {/* </Badge> */}
                            </Tooltip>
                            <Tooltip title="Login" arrow>
                                <PersonIcon onClick={()=>navigate("/userponenumberverification")} />
                            </Tooltip>
                        </div>

                    </div>
                </Toolbar>
            </AppBar>
            <DrawerComponent open={open} setOpen={setOpen} />
        </div>
    )
}

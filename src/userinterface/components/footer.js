import { ClassNames } from "@emotion/react"
import { Box, Divider, Grid, Paper, TextField, Tooltip, Typography, useScrollTrigger } from "@mui/material"
import React, { useEffect, useState } from "react"



import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { getData, postData, serverURL } from "../../administrator/sevices/fetchNodeServices";
import { useStyle } from "./userinterfaceCss";



export default function Footer(props) {
    console.log("props", props)

    const classes = useStyle()

    const [category, setCategory] = useState([])

    const fetchAllCategory = async () => {
        var result = await getData('userinterface/fetch_footer_by_categoryid')
        setCategory(result.data)

        // alert(JSON.stringify(result.data))
    }

    function showCategoryName() {
        console.log("category", category)
        return category.map((item) => {
            return (
                <div style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: 13, marginRight: "15%", marginTop: "2%" }} >
                    {item.categoryname}

                </div>
            )
        })
    }


    useEffect(function () {
        fetchAllCategory()
    }, [])

    return (
        <>

            <Divider style={{ width: '85%', height: 100, display: 'flex', marginLeft: '6%' }} />
            <div>
                <div style={{ fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', padding: 5, alignItems: 'center', marginLeft: '7%' }} >
                    {/* Popular Categories */}
                    {props.tittle}

                </div>
                <div style={{ width: '80%', marginTop: 40, marginLeft: "8%", marginRight: "10%", display: 'flex', flexWrap: "wrap", justifyContent: 'space-between' }} >
                    {showCategoryName()}
                </div>

            </div>


            <Divider style={{ width: '85%', height: 100, display: 'flex', marginLeft: '6%' }} />
            <div>
                <div style={{ fontFamily: 'Poppins', marginLeft: '8%', marginTop: '2%' }} >
                    <h2>Categories</h2>
                </div>
                <div style={{ marginLeft: '6%', fontSize: 14 }} >
                    <Grid container spacing={0.9}>
                        <Grid item xs={2.4}>
                            <ul style={{}} >
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: '0.625rem' }} >Fruits& Vegitables</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: '0.625rem' }} >Baby Foods</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: '0.625rem' }} >BreakFast & Sauces</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: '0.625rem' }}>Cleaning Essentials</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: '0.625rem' }} >Homegrown Brands</li>
                            </ul>
                        </Grid>
                        <Grid item xs={2.4}>
                            <ul>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: '0.625rem' }} >Atta,Rice,Oil & Dal</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: '0.625rem' }} >Dairy,Bread & Eggs</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: '0.625rem' }} >Tea,Coffee & More</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: '0.625rem' }} >Home Needs</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: '0.625rem' }} >Paan Conner</li>
                            </ul>
                        </Grid>
                        <Grid item xs={2.4}>
                            <ul>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Masala & DryFruits</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Coldring & Juices</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Biscuits</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Electrical & Accessories</li>
                            </ul>
                        </Grid>
                        <Grid item xs={2.4}>
                            <ul>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Sweet Cravings</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Munchies</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Makeup & Beauty</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Hygienes & Grooming</li>

                            </ul>
                        </Grid>
                        <Grid item xs={2.4}>
                            <ul>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Frozen Food & IceCream</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Meat,Fish & Egg</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Bath & Body</li>
                                <li style={{ listStyleType: 'none', marginTop: '0.625rem', marginBottom: 'o.625rem' }}>Health & Baby Care</li>
                            </ul>
                        </Grid>
                    </Grid>
                </div>
            </div >

            <Divider style={{ width: '85%', display: 'flex', marginLeft: '8%', marginTop: '2%' }} />


            <div style={{ width: '80%', marginLeft: '8%', marginTop: '2%' }}>
                <Grid container spacing={15}>

                    <Grid item xs={3}>
                        <div style={{ display: 'flex', fontSize: 35, fontWeight: 700 }}>
                            <span style={{
                                backgroundImage: "linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% )",
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'

                            }}>
                                Quick
                            </span>
                            <span style={{
                                backgroundImage: "linear-gradient( 179deg,  rgba(0,0,0,1) 9.2%, rgba(127,16,16,1) 103.9% )",
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Shopee
                            </span>
                        </div>
                        <div style={{ marginTop: '2%', flexDirection: 'row', display: 'flex', marginRight: 50, width: '20vw' }} >
                            <ul>
                                <li style={{ listStyleType: 'none', marginLeft: 0 }}>
                                    <Tooltip title="insta">
                                        <a href="https://instagram.com">
                                            <InstagramIcon style={{ color: 'gray', }} />
                                        </a>
                                    </Tooltip>
                                </li>
                            </ul>
                            <ul>
                                <li style={{ listStyleType: 'none' }} >
                                    <Tooltip title="twitter">
                                        <a href="https://twitter.com">
                                            <TwitterIcon style={{ color: 'gray', }} />
                                        </a>
                                    </Tooltip>
                                </li>
                            </ul>
                            <ul>
                                <li style={{ listStyleType: 'none' }} >
                                    <Tooltip title="facebook">
                                        <a href="https://facebook.com">
                                            <FacebookIcon style={{ color: 'gray', }} />
                                        </a>
                                    </Tooltip>
                                </li>
                            </ul>
                            <ul>
                                <li style={{cursor:'pointer', listStyleType: 'none' }}>
                                    <Tooltip title="linkedin">
                                        <a href="https://linkedin.com">
                                            <LinkedInIcon style={{ color: 'gray', }} />
                                        </a>
                                    </Tooltip>
                                </li>
                            </ul>
                        </div>

                    </Grid>
                    <Grid item xs={3}>
                        <div>
                            <ul>
                                <li style={{ listStyleType: 'none' }} >Home</li>
                            </ul>
                            <ul>
                                <li style={{ listStyleType: 'none' }} >Delivery Areas</li>
                            </ul>
                            <ul>
                                <li style={{ listStyleType: 'none' }} >Carries</li>
                            </ul>
                            <ul>
                                <li style={{ listStyleType: 'none' }} >Customer Support</li>
                            </ul>
                            <ul>
                                <li style={{ listStyleType: 'none' }} >Press</li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>
                            <ul>
                                <li style={{ listStyleType: 'none' }} >Privacy Policy</li>
                            </ul>
                            <ul>
                                <li style={{ listStyleType: 'none' }} >Terms of Use</li>
                            </ul>
                            <ul>
                                <li style={{ listStyleType: 'none' }} >Responsible Disclosure Policy</li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>
                            <div style={{ margin: 15 }}>
                                Download App
                            </div>

                            <Grid item xs={12}>
                                <div style={{ cursor: 'pointer', display: "flex", height: 45, justifyContent: "center", alignItems: "center", border: "solid 1px #ccc", borderRadius: 5 }}>
                                    <Tooltip title="PlayStore">
                                        <a href="https://play.google.com" style={{ textDecoration: 'none', color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                            <img src={`/assets/ps.png`} width="15" style={{ margin: 5 }} />
                                            Get it on Play Store
                                        </a>
                                    </Tooltip>
                                </div>
                                <div style={{ cursor: 'pointer', display: "flex", height: 45, justifyContent: "center", alignItems: "center", marginTop: 15, border: "solid 1px #ccc", borderRadius: 5 }}>
                                    <Tooltip title="AppStore">
                                        <a href="https://apps.apple.com" style={{ textDecoration: 'none', color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                            <img src={`/assets/applelogo.png`} width="15" style={{ margin: 5 }} />
                                            Get it on App Store
                                        </a>
                                    </Tooltip>

                                </div>
                            </Grid>

                        </div>
                    </Grid>




                </Grid>
            </div>
            {/* <Divider style={{ width: '80%', height: 100, display: 'flex', marginLeft: '8%' }} /> */}

        </>
    )
}
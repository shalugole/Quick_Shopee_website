import { Divider, Grid } from "@mui/material";
import CartBill from "../components/AddToCart/CartBill";
import CartDelivery from "../components/AddToCart/CartDelivery";
import CartDetails from "../components/AddToCart/CartDetails";
import CartLocation from "../components/AddToCart/CartLocation";
import CartOffer from "../components/AddToCart/CartOffer";
import CartProduct from "../components/AddToCart/CartProduct";
import AddvertishmentBaar from "../components/AddvertishmentBaar";
import Header from "../components/Header";
import Footer from "../components/footer";
import { useSelector } from "react-redux";

//use for MediaQueary----------->>>>>> 
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'; 
import { useState } from "react";


export default function Cart() {

    
    const[refresh,setRefresh]=useState(false)
    
    const[userAddress,setUserAddress]=useState([])
    const[btnTitle,setBtnTitle]=useState("ADD ADDRESS TO PROCEED") 
    const theme = useTheme();
    const sm=useMediaQuery(theme.breakpoints.down('md'));
    const cart = useSelector((state) => state.products)
    const cartData=Object.values(cart)
        
 
    

    return (
        <div style={{ background: '#FCE9F1' }} >
            <div>
                <Header />
                <AddvertishmentBaar />
            </div>

            <Grid container maxWidth={1300} spacing={2} mx="auto"  >

                <Grid item xs={12} marginTop={6} flexDirection={'row'} display={'flex'} >
                    <span style={{ fontSize: 20, fontFamily: 'Poppins', fontWeight: 600, marginLeft: '4%', width: '10vw', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        Cart ({cartData.length} Item)
                    </span>
                    <span style={{ marginTop: 3, background: '#DDF7E3', borderRadius: 5, width: '15vw', height: '4vh', display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
                        <span style={{ fontSize: 16, fontFamily: 'Poppins', fontWeight: 600, }}>
                            &#8377;39
                        </span>
                        <span style={{ fontSize: 12, fontFamily: 'Poppins', fontWeight: 500, marginLeft: 7 }} >
                            saved on this pack
                        </span>
                    </span>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '7vw', height: '4.5vh', borderRadius: 5, color: '#DB005B', marginLeft: '43%', border: 'solid 1px #DB005B', cursor: 'pointer', background: '#fff' }} >
                        Empty cart
                    </span>
                </Grid>

                <Grid item xs={6} display="flex" flexDirection="column">
                    <CartProduct cartData={cartData} />
                   
                    <div style={{ marginTop: 10 }} >
                        <CartDelivery  />
                    </div>          
                    <div style={{ marginTop: 10 }} >
                        <CartDetails />
                    </div>
                </Grid>

                <Grid item xs={4} md={5} marginLeft={5} >
                    <CartOffer />
                    <div style={{ marginTop: 10 }}  >
                        <CartBill />
                    </div>
                    <div style={{ marginTop: 10 }} >
                        <CartLocation btnTitle={btnTitle} setBtnTitle={setBtnTitle} setUserAddress={setUserAddress} userAddress={userAddress}  />
                    </div>
                </Grid>

            </Grid>

            <div>
                <Footer />
            </div>
        </div>
    )
}
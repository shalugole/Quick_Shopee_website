import { Divider, Paper } from "@mui/material";
import React from "react";
import { useStyle } from "./CartCss";
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from "react-redux";
//use for MediaQueary----------->>>>>> 
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function CartBill() {
    const theme = useTheme()
    const sm = useMediaQuery(theme.breakpoints.down('md'));
    const cart = useSelector((state) => state.products)
    console.log("chiragggg", cart)
    const cartData = Object.values(cart)

    var totalOffer = cartData.reduce((p1, p2) => {
        return p1 + (p2.offer * p2.qty)
    }, 0)
    var totalAmount = cartData.reduce((p1, p2) => {
        return p1 + (p2.rate * p2.qty)
    }, 0)
    var totalSavings = totalAmount - totalOffer

    const classes = useStyle()

    return (
        <Paper elevation={1} className={classes.CartBillStyle} >
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', height: 'auto', padding: 10 }} >

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        Item Total
                        <span>&#8377;{totalOffer}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <span style={{ display: 'flex', color: '#9DB2BF', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }} >
                            <span> Small Cart Fee</span>
                            <InfoIcon style={{ color: '#9DB2BF', width: '10%' }} />

                        </span>
                        <span>&#8377;25</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <span style={{ display: 'flex', color: '#9DB2BF', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }} >
                            <span>Handling Charge</span>
                            <span style={{ color: 'green' }} >
                                (&#8377;10 saved)
                            </span>
                            <InfoIcon style={{ color: '#9DB2BF', width: '6%' }} />
                        </span>
                        <span>&#8377;25</span>   
                    </div> 

                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} >
                        <span style={{ display: 'flex', color: '#9DB2BF', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }} >
                            <span>Delivery Fee</span>
                            <InfoIcon style={{ color: '#9DB2BF', width: '12%' }} />
                        </span>
                        <span style={{ marginLeft: 220 }} >&#8377;5</span>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: 'green' }} >
                        Add products worth &#8377;114 to get Free delivery
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: 'green' }} >
                        <span style={{ display: 'flex', color: '#000', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }} >
                            <span>To Pay</span>

                        </span>
                        <span style={{ marginLeft: 220, color: '#000000', marginLeft: 280 }} >&#8377;{totalOffer+5}</span>
                    </div>

                </div>

            </div>
            <Divider style={{ width: '23vw', color: '#ccc', marginBottom: 30, marginTop: 7 }} />
        </Paper>
    )
}
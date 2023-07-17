import { AppBar, Toolbar} from "@mui/material"
import React from "react"
import { serverURL } from "../../administrator/sevices/fetchNodeServices"

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DrawerComponent from "./DrawerComponent";



export default function AddvertishmentBaar() {

    const theme=useTheme();
    const sm=useMediaQuery(theme.breakpoints.down('sm'));
    const md=useMediaQuery(theme.breakpoints.down('md'));
    const lg=useMediaQuery(theme.breakpoints.up('lg'));



    return (
        <div style={{ width: '99.9%', marginTop:sm?78:md?70: 70, }}>
            <div style={{ display: 'flex', width: '99.9%', height:sm?'10vh':md?'11vh':'11vh', justifyContent: 'center', alignItems: 'center', background:"conic-gradient(from 100deg, rgba(227, 98, 107, 1.0), rgba(197, 164, 201, 1.0))", fontWeight: 700, flexDirection: 'row' }} >
                <DrawerComponent/>
                <div data-aos="fade-right" data-aos-duration="1700">
                    <img src={`${serverURL}/images/delivery.gif`} width={'100%'} height={'90vh'} />
                </div>
                <div data-aos="flip-left" data-aos-duration="1000" style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', }} >

                    <div style={{ marginLeft: 50, fontSize: 22,color:'#fff', fontFamily: 'Poppins',}} >
                        Delivery In
                    </div>
                    <div style={{ marginLeft: 65, fontSize: 24, fontFamily: 'Poppins', color:'#fff',}} >
                        10 MIN
                    </div>

                </div>
                <div data-aos="fade-left" data-aos-duration="1700" style={{ marginLeft: 80,marginTop:20 }} >
                    <img src={`${serverURL}/images/cart3.gif`} width={'100%'} height={'60vh'} />
                </div>
            </div>

        </div>
    )
}
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Button, Divider } from '@mui/material';
import SelectProductUnit from './SelectProductUnit';
import TimerIcon from '@mui/icons-material/Timer';


export default function SelectProductName({ product, refreshPage, setProduct }) {  //<--functioniAddress

    const handleClick = () => {

    }

    return (
        <div style={{ width: 700, marginTop: 90, padding: 10, marginLeft: 40 }}>
            {/* <Divider style={{width:200,height:100}}  orientation='vertical'/> */}
            <div role="presentation" onClick={handleClick}>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/home" style={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: 'bold' }}>
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/home" style={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: 'bold' }}>
                        Condensed Milk
                    </Link>
                </Breadcrumbs>
            </div>
            <div style={{ fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold' }}>
                {product.productlistname}
            </div>
            <div style={{background:'#DDE6ED',width:'4vw',height:'2vh',fontSize:12,fontWeight:700,borderRadius:10,padding:5,display:'flex',alignItems:'center',justifyContent:'row',marginTop:3}} >
                <TimerIcon style={{fontSize:15}} />   
                10MIN.
            </div>
            <div style={{ fontFamily: 'Poppins', fontSize: 20, fontWeight: 400, color: 'green',marginTop:10,color:'#F72464' }} >
                View all by {product.productlistname}
            </div>
            <Divider style={{ marginTop: 12 }} />  
            <SelectProductUnit product={product} setProduct={setProduct} refreshPage={refreshPage} />  

        </div>
    )
}
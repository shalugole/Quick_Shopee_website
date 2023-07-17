import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import SelectProductDetails from "../components/ProductInfo/SelectProductDetails";
import SelectProductShowImages from "../components/ProductInfo/SelectProductShowImages";
import WhyShopeQuickShopee from "../components/ProductInfo/WhyShopeQuickShopee";
import SelectProductName from "../components/ProductInfo/SelectProductName";
import { Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SelectProductUnit from "../components/ProductInfo/SelectProductUnit";
import AddvertishmentBaar from "../components/AddvertishmentBaar";

                    

export default function SelectProduct(props) {

    const [refresh, setRefresh] = useState(false)

    const refreshPage = () => {
        setRefresh(!refresh)                 
    }

    const location = useLocation()
    console.log("location", location)
    const navigate = useNavigate()

    const [product, setProduct] = useState(location.state.product)

    return (
        <div>
            <div>
                <Header />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10, fontFamily: 'Poppins', }}>

                <Grid container spacing={2}>
                    <Grid item xs={6} lg={6} style={{ marginTop: 10, borderRight: "solid", borderRightColor: "#ccc", borderRightWidth: "1px" }} >
                        <SelectProductShowImages product={product} />  
                    </Grid>
                    <Grid item xs={6}>
                        <SelectProductName product={product} setProduct={setProduct} refreshPage={refreshPage} />
                        <div>
                            <WhyShopeQuickShopee />
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <SelectProductDetails />
                    </Grid>

                </Grid>

            </div>
            <div>
                <Footer />
            </div>
            {/* <div><SelectProductUnit/></div> */}
        </div>


    )
}
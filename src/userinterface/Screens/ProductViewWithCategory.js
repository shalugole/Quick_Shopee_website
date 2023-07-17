import React, { useEffect, useState } from "react";
//______myComponents--->>>   
import Header from "../components/Header";
import Footer from "../components/footer";
import { getData, postData } from "../../administrator/sevices/fetchNodeServices";
import { Grid, Paper, selectClasses } from "@mui/material";
import CategoryListComponent from "../components/CategoryListComponent";
import { useLocation, useNavigate } from "react-router-dom";
import SingleProductDetails from "../components/SingleProductDetails";
import AddvertishmentBaar from "../components/AddvertishmentBaar";
import { useStyle } from "../components/userinterfaceCss";

export default function ProductViewWithCategory(props) {

    const classes=useStyle() 
    const [subcategory, setSubCategory] = useState([])
    const [subCategoryId, setSubCategoryId] = useState('')
    const [subCategoryName,setSubCategoryName]=useState('')
    const [productList, setProductList] = useState([]) 
    var items = props.item 

    const location = useLocation()
    var categoryid = location.state.categoryid
    const navigate = useNavigate()
    console.log("location", location)

    const fetchAllSubCategory = async () => {
        var result = await postData('userinterface/fetch_all_subcategory_by_categoryid', { categoryid: categoryid })
        setSubCategory(result.data)
        // alert(JSON.stringify(result))   
    }  

    const fetchAllProductsSubcategory = async (scid) => {
        var result = await postData('userinterface/fetch_all_Products_by_subCategory', { subcategoryid: scid })
        // console.log(result.data)
        setProductList(result.data)  
        // alert(JSON.stringify(result.data))  
    }
    const fetchAllProductsByCategory=async()=>{
        var result =await postData('userinterface/fetch_all_product_by_categoryid',{categoryid:location.state.categoryid})
        console.log(result.data) 
        setProductList(result.data)  

    }

    const getSubCategoryId = (scid,sname) => {  //<<--this function called to child
        // alert(scid)
        setSubCategoryName(sname) 
        setSubCategoryId(scid) 
        fetchAllProductsSubcategory(scid)
    }

    useEffect(function () {

        fetchAllSubCategory() //<<---this category called according to location
        fetchAllProductsByCategory()
    }, []) 

    const listofProducts = () => {
        // alert("bby")
        return productList.map((item) => {
            console.log("PP", item)
            return (<SingleProductDetails item={item}  url="/selectproduct" />)
        })
    }   
   
    
    return (  
        <div>
            <Header />
            <AddvertishmentBaar />
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <CategoryListComponent data={subcategory} getSubCategoryId={getSubCategoryId} />
                    </Grid>
                    <Grid item xs={10}> 
                        <div style={{marginLeft:74,fontFamily:'Poppins',fontSize:20,fontWeight:1000,marginTop:25}} >{subCategoryName} ({productList.length}) Items</div>
                        <div style={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'row',marginLeft:70 }}>
                            {listofProducts()}
                        </div>

                    </Grid>
                </Grid>
            </div>
            <div>
                <Footer tittle="Categories" />
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react";

//______myComponents--->>>
import Header from "../components/Header";
import Bannercomponents from "../components/bannerComponents";
import CircleScrollComponents from "../components/CircleScrollComponents";
import ProductComponent from "../components/ProductComponent";
import Footer from "../components/footer";
import DealSlider from "../components/DealSlider";
import { getData, postData } from "../../administrator/sevices/fetchNodeServices";
import Spacer from "../components/Spacer";
import AddvertishmentBaar from "../components/AddvertishmentBaar";



export default function Home(props) {


    const [banners, setBanners] = useState([])
    const [category, setCategory] = useState([])
    const [productsMilk, setProductsMilk] = useState([])
    const [trending, setTrending] = useState([])

    const fetchAllBanners = async () => {
        var result = await getData('userinterface/fetch_all_banners')
        // console.log("RESULT :", result)
        var images = result.data.banners
        // console.log("BANNER :", images)
        var im = images.substring(0, images.length - 1).split(",")
        // console.log(im)
        setBanners(im)
    }
    //_______________________called Smart-Component "bcoz 1-component use twice a time" ____________
    const fetchAllCategories = async (status) => {
        var result = await postData('userinterface/fetch_all_category', { status: status })
        if (status == 'Continue')
            setCategory(result.data)
        else if (status == 'Trending')
            setTrending(result.data)

        // setCategory(result.data)    

    }
    const fetchProducts = async (subcategoryname) => {
        var result = await postData('userinterface/fetch_product_by_subcategory', { subcategoryname: subcategoryname })

        setProductsMilk(result.data)
    }
    useEffect(function () {
        fetchAllBanners()
        fetchAllCategories('Continue')
        fetchAllCategories('Trending')
        fetchProducts('Milk, Bread& Butter')

    }, [])


    return (
        <div>
           
                    <Header />   
                    <AddvertishmentBaar />
               
            <div>

                <div>
                    <Bannercomponents images={banners} />
                </div>
                {/* <Spacer/> */}
                <div>   
                    <DealSlider/>
                </div>
                {/* <Spacer/>  */}

                <div style={{ marginTop: 2, marginLeft: 10, width: '100%' }} >
                    <CircleScrollComponents category={category}  tittle="Popular Categories" />
                </div>
                <div style={{ marginTop: 2, marginLeft: 10, width: '100%' }}>
                    <ProductComponent tittle="Milk, Bread& Butter" products={productsMilk} />
                </div>
                <div style={{ marginTop: 2, marginLeft: 10, width: '100%' }} >
                    <CircleScrollComponents category={trending}  tittle="Trending Products" />
                </div>


                {/*____________Dummy-div__________________*/}
                <div style={{ width: '100%', marginBottom: 50 }} ></div>

                <div>
                    <Footer tittle="Categories" />
                </div>

                <div style={{ width: '100%', marginBottom: 50 }}></div>


            </div>
           
               
        </div>

    )
}
import CategoryInterface from "./administrator/categories/CategoryInterface";
import DisplayAllCategory from "./administrator/categories/DisplayAllCategory";
import SubCategory from "./administrator/subCategories/SubCategory";
import Category from "./administrator/categories/CategoryInterface";
import Product from "./administrator/products/ProductInterface";
import DisplayAllSubCategory from "./administrator/subCategories/DisplayAllSubCategory";
import { getByAltText } from "@testing-library/react";
import DisplayAllProducts from "./administrator/products/DisplayAllProducts";
import ProductListInterface from "./administrator/productList/productListInterface";
import DisplayAllProductList from "./administrator/productList/DisplayAllProductList";
import BannersInterface from "./administrator/banners/BannersInterface";
import DisplayProductPictures from "./administrator/banners/DisplayProductPictures";

import AdminLoginInterface from "./administrator/adminLogin/AdminLoginInterface";
import Dashboard from "./administrator/adminLogin/Dashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/userinterface/components/Header";
import Home from "./userinterface/Screens/Home";

import ProductViewWithCategory from "./userinterface/Screens/ProductViewWithCategory";
import CategoryListComponent from "./userinterface/components/CategoryListComponent";
import SelectProduct from "./userinterface/Screens/SelectProduct";
import Cart from "./userinterface/Screens/Cart";
import UserAddress from "./userinterface/components/AllDialogs/UserAddress";
import UserPhoneNumberVerification from "./userinterface/components/AllDialogs/UserPhoneNumberVerification";
import MakePayment from "./userinterface/Screens/MakePayment";


//import DisplayAllProductList from "./administrator/productList/DisplayAllProductList";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route>
            <Route element={<Header />} path="/header" />
            <Route element={<Home />} path="/home" />
            <Route element={<CategoryListComponent />} path="/categorylistcomponent" />
            <Route element={<ProductViewWithCategory />} path="/productviewwithcategory" />
            <Route element={<SelectProduct/>} path="/selectproduct" />
            <Route element={<Cart />} path="/cart"/>
            <Route element={<UserPhoneNumberVerification/>} path="/userponenumberverification"/>
            <Route element={<MakePayment/>} path="/makepayment"/>

            {/* <Route element={<CategoryInterface/>} path="/categoryinterface" />
          <Route element={<DisplayAllCategory/>} path="/displayallcategory" />
          <Route element={<SubCategory/>} path="/subcategory" />
          <Route element={<DisplayAllSubCategory/>} path="/displayallsubcategory" />
          <Route element={<Product/>} path="/product"/>   
          <Route element={<DisplayAllProducts/>} path="/displayallproducts"/>
          <Route element={<DisplayAllProductList/>} path="/displayallproductlist" />
          <Route element={<BannersInterface/>} path="/bannersinterface" />
          <Route element={<DisplayProductPictures/>} path="/displayproductpictures" />
          <Route element={<ProductListInterface/>} path="/productlistinterface"/> */}
            <Route element={<AdminLoginInterface />} path="/adminlogininterface" />

            <Route element={<Dashboard />} path="/dashboard/*" /> {/* ____/*<<---___to show multiple routes in it*/}


          </Route>
        </Routes>
      </Router>
    </div>
    // <div>
    //     <CategoryInterface/> 
    //     <DisplayAllCategory/> 
    //     <SubCategory />
    //     <DisplayAllSubCategory/>
    //     <Category /> 
    //     <Product />
    // </div>
  );
}

export default App;


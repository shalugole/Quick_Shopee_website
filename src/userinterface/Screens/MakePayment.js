import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import { serverURL } from "../../administrator/sevices/fetchNodeServices";
import { useCallback, useEffect } from "react";




export default function MakePayment() {
  const Razorpay = useRazorpay();
  const navigate=useNavigate()
  const dispatch=useDispatch()
    var user=useSelector((state)=>state.user)
    var userdata=Object.values(user)
    console.log("USERDATAAA",userdata)
    const products = useSelector((state) => state.products);
    const productList=Object.values(products)
    let total= productList.reduce((a,b) => {
        return  a+b.offer*b.qty;
      },0);
     
  const handlePayment=()=> {   

       const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: total*1000,
      currency: "INR",
      name: "Quick Shopee",
      description: "Test Transaction",
      image: `/assets/cart.png`,
    //   image: `http://${serverURL}/assets/cart.png`,
    
      handler: (res) => {
        console.log(res);
       
        dispatch({type:'CLEAR_CART',payload:[]})
        navigate("/home")
        

      },
      prefill: {
        // name: userdata[0].username,
        email: "youremail@example.com",
        // contact: userdata[0].mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }
useEffect(function(){
var timeout=setTimeout(handlePayment,1000)
// handlePayment()

},[])

  return (
    <div className="App">
     
    </div>
  );
}
import { Divider, Paper } from "@mui/material"
import { useStyle } from "./CartCss"
import { serverURL } from "../../../administrator/sevices/fetchNodeServices"
import PlusMinusComponent from "../ProductInfo/PlusMinusComponent"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function CartProduct({ cartData, product,refreshPage }) {

    // const[refreshPage,setRefreshPage]=useState(false)
    var dispatch=useDispatch()

    const [refresh,setRefresh]=useState(false) 
    
    const handleQtyChange = (selectedProduct,value) => {
        var product = selectedProduct
        // alert(value)
        if (value >= 1) {
            product['qty'] = value
            dispatch({ type: 'ADD_PRODUCT', payload: [product.productlistid, product] })
        }
        else {alert(value)
            dispatch({ type: 'DELETE_PRODUCT', payload: [product.productlistid, product] })
        }
        setRefresh(!refresh)
    }

    const navigate = useNavigate()
    const classes = useStyle()

    // const cart = useSelector((state) => state.products)
    // const cartData=Object.values(cart)     
    const [selectedProduct, setSelectedProduct] = useState(product)

    return (
        <Paper elevation={1} className={classes.CartProductStyle} >
            {
                cartData.map((item) => {
                    // console.log("image_Fatched")
                    return (<>                 
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} >
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '30vw' }} >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '7vw', height: '13vh' }} >
                                    <img src={`${serverURL}/images/${item.picture}`} style={{ width: 90 }} />
                                </div>         

                                <div style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Poppins', color: '#000000', padding: 10 }} >
                                    {item.productlistname}
                                    {item.offer > 0 ?        
                                        <div style={{ fontSize: 13, fontWeight: 500, fontFamily: 'Poppins', color: '#342B38', }} >
                                            &#8377; {item.offer} / {item.perpieceweight} {item.weight}
                                        </div> :
                                        <div> {item.offer} /{item.weight}</div>}
                                    {item.offer > 0 ?
                                        <div style={{ fontSize: 14, marginTop: 15, fontWeight: 600, fontFamily: 'Poppins', color: '#000', }} >
                                            <s style={{ color: '#F72464' }} > &#8377;{item.rate * item.qty}</s> &#8377; {item.offer * item.qty}
                                        </div> :
                                        <div style={{ fontSize: 14, marginTop: 15, fontWeight: 600, fontFamily: 'Poppins', color: '#000', }} >
                                            &#8377; {item.rate * item.qty}
                                        </div>                                      
                                    }                          
                                </div>
                            </div>           
                            <PlusMinusComponent qty={item?.qty} onChange={(value)=>handleQtyChange(item,value)} />
                        </div>
                        {cartData.length > 1 ?
                            <Divider style={{ width: 620, marginTop: 7, background: '#D25380' }} /> : <></>
                        }
                    </>
                    )
                })
            }
        </Paper>
    )
}
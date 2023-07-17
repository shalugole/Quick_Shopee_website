
import { makeStyles } from "@mui/styles";

export const useStyle = makeStyles({
    CartOfferStyle: {
       
        marginLeft: '8%',
        background: '#ccc',
        width: "78%",
        height: 70,
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        flexDirection:'row',
        borderRadius: 20,
        fontFamily:'Poppins',
        fontSize:15,
        fontWeight:500,
        marginRight:100

    },
    CartBillStyle:{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        fontFamily:'Poppins',
        fontSize:13,
        fontWeight:500,
        width:'78%',
        height:'auto',
        marginLeft:'8%',
        borderRadius:20,
    },
    CartDeliveryStyle:{
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        flexDirection:'column',
        fontFamily:'Poppins',
        padding:10,
        width:'100%',
        height:'auto',
        marginLeft:'8%',
        borderRadius:20
    },
    CartLocationStyle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        fontFamily:'Poppins',
        padding:10,
        width:'75%',
        height:'auto',
        marginLeft:'8%',
        borderRadius:20,
        padding:10
    },
    CartProductStyle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        fontFamily:'Poppins',
        padding:10,
        width:'100%',
        height:'auto',
        marginLeft:'8%',
        borderRadius:20,
       
    },
    CartDetailsStyle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        fontFamily:'Poppins',
        padding:15,
        width:'99%',
        height:'10vh',
        marginLeft:'8%',
        borderRadius:20,
       
    }
})
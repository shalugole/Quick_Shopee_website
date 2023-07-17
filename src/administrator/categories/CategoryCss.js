import { makeStyles } from "@mui/styles";

// For Function Using Css And Design ------>>>>>>>>>>>>>>>>>
export const useStyle = makeStyles({  

    displaycontainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: "transparent",
        // background: '#dfe6e9',
        width: '100vw',
        height: '92vh'

        
    }, 
    displaybox: {
        width: '60%',
        height: 'auto',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius:10
        
    }, 
    headingStyle:{
        fontFamily:'Poppins',
        fontWeight:18,
        // letterSpacing:1,
        fontSize:25
    },
    errorText:{
        fontSize:12,
        color:'red',
        paddingTop:5,
        paddingLeft:'13'
        
    }
});    
  
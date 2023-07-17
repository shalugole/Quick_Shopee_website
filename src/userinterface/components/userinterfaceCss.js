
import { makeStyles } from "@mui/styles";
          
export const useStyle = makeStyles({  
    
     
    appbarstyle: {
        // background: 'linear-gradient(white,white)',
        // background:"radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(105,71,191,1) 48%)"
        // background: "linear-gradient(0deg, rgba(191,216,226,1) 0%, rgba(32,38,136,1) 100%)"
        // background:"linear-gradient(90deg, rgba(23,12,207,1) 0%, rgba(199,233,234,1) 0%, rgba(9,88,104,1) 100%)"
//        
// * Created with https://www.css-gradient.com
// * Gradient link: https://www.css-gradient.com/?c1=e3626b&c2=c5a4c9&gt=c&gd=dbr
// */
// background: rgba(227, 98, 107, 1.0);
// background: conic-gradient(from 135deg, rgba(227, 98, 107, 1.0), rgba(197, 164, 201, 1.0));
        // background: '#fff',
        
        background:'transparent',
    },
    toolbarStyle: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        width: '95%',

    },
    setHeadingStyle: {
        fontFamily: 'Poppins',

        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        width: '50vw',

        // backgroundColor: '#4158D0',
        // backgroundImage: "linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2% )",
        // WebkitBackgroundClip: 'text',
        // WebkitTextFillColor: 'transparent',

    },
    setIconStyle: {
        // background:'black',                                                                 
        // marginLeft:'auto',                                                                     
        color: "#0F4C75",
        width: '1%',
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: "1%"

    },
    hoverBanner: {
        
        "&:hover": {
            transition:'all 0.2s linear',
            transform: 'scale(1.07)',
            cursor: "pointer",   

        }
    },
    hoverCircleScrollComponent:{
        
        "&:hover":{
            transition:"all 0.3s linear",
            transform:'scale(1.111)',
            cursor:"pointer",
        }
    },
    hoverProductComponant:{
        "&:hover":{
            
            transition:"all 0.1s ease",  
            transform:'scale(1.111)',
            cursor:"pointer"
        }
    },
    hoverCategoryListComponent:{
        "&:hover":{
            background:'#F8E8EE',
            transition:"all 0.1s ease",
            transform:'scale(1.111)',
            cursor:"pointer",
        }
    }

})
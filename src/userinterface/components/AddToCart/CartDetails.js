import { Paper } from "@mui/material"
import { useStyle } from "./CartCss"
import { serverURL } from "../../../administrator/sevices/fetchNodeServices"


export default function CartDetails() {

    const classes = useStyle()

    return (
        <Paper elevation={1} className={classes.CartDetailsStyle} >
            <div style={{ fontSize: 15, fontWeight: 600, fontFamily: 'Poppins', display: 'flex', justifyContent: 'row' }} >
                <img src={`${serverURL}/images/learnmore.png`} width={'12%'} />
                <span style={{ color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center',marginLeft:6 }} >
                    See how we ensure our delivery partner’s safety
                    <span style={{ color: '#FF0060',marginLeft:5 }} >
                        Learn More
                    </span>
                </span>
            </div>

        </Paper>
    )
}
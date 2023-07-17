import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function PlusMinusComponent(props) {
    console.log("QTYYYYY", props.qty)                 
    const [value, setValue] = useState()   

    useEffect(() => {
        setValue(props.qty)
        console.log("PROPP:", props)
    }, [props])

    const handlePlusClick = () => {
        // v=value
        setValue((prev) => {
            if (prev < 5) {
                props.onChange(prev + 1)
                return prev + 1
            }
            else {
                props.onChange(prev)
                return prev
            }
        })
    }

    const handleMinusClick = () => {
        setValue((prev) => {
            if (prev >= 1) {
                props.onChange(prev - 1)
                return prev - 1
            }
        })

    }


    return (
        <div>
            <div style={{ paddingRight: 10, marginLeft: '2%', marginTop: '2%' }}>
                {value == 0 ? <Button onClick={handlePlusClick} variant='outlined' style={{ width: 100, height: 38,background:'#F72464',color:'#fff' }} color='success' >ADD</Button> :

                    <div style={{ border: '1px solid #F72464', width: 100, height: 38, display: 'flex', justifyContent: 'space-between', borderRadius: 5 }} >
                        <div onClick={handlePlusClick} style={{ cursor: 'pointer', fontSize: 20, background: '#F72464', color: '#fff', display: 'flex', justifyContent: 'center', width: 20, padding: 5, alignItems: 'center' }} >+</div>
                        <div style={{ fontWeight: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',background:'#F72464',color:'#fff',width:40 }} > {value}</div>
                        <div onClick={handleMinusClick} style={{ cursor: 'pointer', fontSize: 20, background: '#F72464', color: '#fff', display: 'flex', justifyContent: 'center', width: 20, padding: 5, alignItems: 'center' }} >-</div>
                    </div>}
            </div>

        </div>
    )
}
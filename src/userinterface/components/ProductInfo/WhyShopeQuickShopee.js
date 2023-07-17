import { serverURL } from "../../../administrator/sevices/fetchNodeServices"

export default function WhyShopeQuickShopee() {

    var features = [
        { id: 1, logo: "logo1.avif", heading: "Superfast Delivery", details: "Get your order delivered to your doorstep at the earliest from dark stores near you." },
        { id: 2, logo: "logo2.avif", heading: "Best Prices & Offers", details: "Best price destination with offers directly from the manufacturers." },
        // { id: 3, logo: "logo3.png", heading: "Wide Assortment", details: "Choose from 5000+ products across food, personal care, household & other categories." },
    ]

    const fillFeatures = () => {
        return features.map((item) => {
            return (
                <div>
                    <div style={{ display: 'flex', width: '85%', padding: 10, marginLeft: '6%', fontFamily: 'Poppins', }}>
                        <div>
                            <img src={`${serverURL}/images/${item.logo}`} width='90%' />
                        </div>

                        <div style={{ marginLeft: 15,flexDirection:'column',marginTop:15 }}>
                            <div style={{ fontSize: 15, fontWeight: 'bold' ,display:'flex',alignItems:'center',}}>
                                {item.heading}  
                            </div>

                            <div style={{ fontSize: 12, }} >
                                {item.details}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={{ width: '98%', marginTop: '3%',}}>
            <div style={{ display: 'flex', width: '90%', padding: 5, marginLeft: '6%', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 18 }} >
                Why shop from quickshopee?
            </div>
            <div>
                {fillFeatures()}
            </div>

            <div style={{ display: 'flex',alignItems:'center',width: '85%', padding: 10, marginLeft: '6%', fontFamily: 'Poppins', }}>
                <div style={{width:"15vh",height:'auto'}} >
                    <img src={`${serverURL}/images/logo3.png`} width={"80%"} />
                </div>
                <div>
                    <div style={{fontSize:15,fontWeight:'bold'}} >
                        Wide Assortment
                    </div>
                    <div style={{fontSize:12}}>
                        Choose from 5000+ products across food, personal care, household & other categories.
                    </div>
                </div>
            </div>
        </div>
    )

}
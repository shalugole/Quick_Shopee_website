import { Divider } from "@mui/material"

export default function SelectProductDetails() {

    var details = [
        { id: 1, heading: "Key Features", details: "Partly skimmed, sweetened condensed milk. A versatile dessert partner for mothers to create sweet stories with their families. Indian & western desserts with perfect consistency, texture, and taste." },
        { id: 2, heading: "Ingredients", details: " Milk Solids and Sugar." },
        { id: 3, heading: "Units", details: "380g" },
        { id: 4, heading: "Packing Type", details: "Can" },
        { id: 5, heading: "Storage Type", details: "Store in a cool, dry and hygienic place. After opening, refrigerate between 4 degree to 8 degree Celsius and use within 7 days." },
        { id: 6, heading: "Usage", details: "It is very versatile. It mixes well and can be used in a number of ways to make your favourite desserts. Helps you get better consistency and taste of desserts compared to milk. Servings should be adjusted for children of different ages." },
        { id: 7, heading: "Self Life", details: "8 Months" },
        { id: 8, heading: "Marked Price", details: "Nestlé India Limited, 100 / 101, World Trade Centre, Barakhamba Lane, New Delhi - 110 001 At: Ludhiana-Ferozepur Road, Moga-142 001, Punjab" },
        { id: 9, heading: "FSSAI License ", details: "10012011000168" },
        { id: 10, heading: "Country Of Origin", details: "India" },
        { id: 11, heading: " Customer Care Details", details: "Email: info@blinkit.com" },
        { id: 12, heading: "Expired Date", details: "Please refer to the packaging of the product for expiry date." },
        { id: 13, heading: "Description", details: "MILKMAID is rich and creamy, sweetened condensed milk - the dessert partner that helps you make a range of mouth-watering sweets at home - be it payasam, ice creams, cakes and much more. Made with high quality milk. Make and enjoy your favourite desserts after lunch, dinner or as a snack. It is very versatile. It mixes well and can be used in a number of ways to make your favourite desserts. Helps you get better consistency and taste of desserts compared to milk. Servings should be adjusted for children of different ages. Each serving of loved dessert containing approx. 45 Kcal per tablespoon." },
        { id: 14, heading: "Disclamer", details: "Every effort is made to maintain accuracy of all information. However, actual product packaging and materials may contain more and/or different information. It is recommended not to solely rely on the information presented." },
        
    ]

    const fillDetails = () => {
        return details.map((item) => {
            return (
                <div>
                    <div style={{ width: '85%', padding: 5, fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 15 }} >
                        {item.heading}
                    </div>

                    <div style={{ width: '85%', padding: 5, fontFamily: 'Poppins', fontSize: 15 }} >
                        {item.details}
                    </div>

                </div>
            )
        })
    }
    return (
        <div style={{width:'50%',padding:10,border:'solid 1px #ccc'}}>
            {/* <Divider orientation="vartical"/> */}
            <div style={{ width: '98%', padding: 5, marginTop: '5%', marginBottom: "2%", fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 25 }}>
                Product Details
            </div>

            <div>
                {fillDetails()}
            </div>
        </div>
    )
}
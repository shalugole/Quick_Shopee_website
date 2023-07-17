
//json--->>>
const initialState = {
    products: {},
    flight: {},
    user: {}
}

// payLoad---isCalled Data,action----it is json 
export function RootReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_PRODUCT":
            state.products[action.payload[0]] = action.payload[1]
            console.log("Add_REDUX", state.products)
            return { products: state.products, user: state.user }
        case "EDIT_PRODUCT":
            state.products[action.payload[0]] = action.payload[1]
            console.log(state.products)
            return { products: state.products, user: state.user }

        case "DELETE_PRODUCT":
            delete state.products[action.payload[0]]
            console.log("DELET_REDUX", state.products)
            return { products: state.products, user: state.user }


        case "ADD_USER":
            state.user[action.payload[0]]=action.payload[1]
            console.log("Shaluuuuu", state.user)
            return { products: state.products, user: state.user }
        case "CLEAR_CART":
            state.products = {}
            return { products: state.products, user: state.user }


        case "ADD_FLIGHT":
            state.flight[action.payload[0]] = action.payload[1]
            console.log("shaluuu", state.flight)
            return { flight: state.flight }

        case "EDIT_FLIGHT":
            state.flight[action.payload[0]] = action.payload[1]
            console.log(state.flight)
            return { flight: state.flight }


        default:
            return { products: state.products, user: state.user, flight: state.flight }
    }

}

export default RootReducer
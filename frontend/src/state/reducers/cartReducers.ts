import {CartModel} from "../../models/cart";
import {CartAction, CartActionTypes} from "../actionTypes/cartAction";

interface CartState {
    cartItems: CartModel[],
    loading: boolean
}

const initialState: CartState = {
    cartItems: [],
    loading: false
}

const cartReducers = (state: CartState = initialState, action: CartAction): CartState => {
    switch (action.type) {
        case CartActionTypes.CART_ADD_ITEM:
            const existedItem = state.cartItems.find(i => i.puppy._id === action.payload.puppy._id)
            if (existedItem) {
                return {...state, cartItems: state.cartItems.map(x => x.puppy._id === existedItem.puppy._id ? action.payload : x)}
            } else {
                return {...state, cartItems: [...state.cartItems, action.payload]}
            }
        case CartActionTypes.CART_REMOVE_ITEM:
            return {...state, cartItems: state.cartItems.filter(i => i.puppy._id !== action.payload)}
        default:
            return state
    }
}

export default cartReducers
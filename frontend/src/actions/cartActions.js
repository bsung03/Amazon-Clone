import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_REMOVE_SHIPPING_ADDRESS } from "../constants/cartConstants";


export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data});
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const addToCart = (productID,qty) => async(dispatch,getState) => {
    const {data} = await Axios.get(`/api/products/${productID}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty
        }
    });
    localStorage.setItem('cartitems', JSON.stringify(getState().cart.cartitems));
}


export const removeFromCart = (productID) => async(dispatch,getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productID
    });
    localStorage.setItem('cartitems', JSON.stringify(getState().cart.cartitems));
}

export const removeShippingAddress = () => (dispatch) =>{
    dispatch({
        type: CART_REMOVE_SHIPPING_ADDRESS,
    })
    localStorage.removeItem('shippingAddress');
}

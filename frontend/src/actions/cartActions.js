import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

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

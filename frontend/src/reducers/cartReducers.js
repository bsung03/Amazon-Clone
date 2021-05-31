import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = {cartitems: []},action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const exitItem = state.cartitems.find((x) => x.product === item.product);
            if(exitItem){
                return{
                    ...state,
                    cartitems : state.cartitems.map((x) => x.product === exitItem.product? item: x)
                };
            }else{
                return {...state, cartitems: [...state.cartitems, item]}
            }
        default:
            return state;
    }
}
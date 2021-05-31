import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";

const initalState = {
    cart: {
        cartitems: localStorage.getItem('cartitems') ? 
        JSON.parse(localStorage.getItem('cartitems')) :
        []
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer, 
    initalState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
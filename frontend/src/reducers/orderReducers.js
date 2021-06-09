import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, actions) => {
    switch(actions.type) {
        case ORDER_CREATE_REQUEST:
            return {loading: true};
        case ORDER_CREATE_SUCCESS:
            return {loading: false, success: true, order: actions.payload}
        case ORDER_CREATE_FAIL:
            return { loading: false, error: actions.payload}
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const orderDetailsReducer = (state= { loading: true }, action) => {
    console.log("Reducing")

    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return { loading: true};
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload};
        case ORDER_DETAILS_FAIL:
            return{loading: false, error: action.payload};
        default:
            return state;
    }
}
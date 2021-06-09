import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS } from "../constants/orderConstants";

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
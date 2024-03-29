import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import  CheckoutSteps  from '../components/CheckoutSteps.js';

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress.address){
        props.history.push('/shipping');
    }


    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }


    return (
        <div>
            <CheckoutSteps step1 step2 step3/>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id='paypal' value='PayPal' name='paymentMethod' required checked onChange={(e) => setPaymentMethod(e.target.value)}/>
                    </div>
                    <label htmlFor="paypal">PayPal</label>
                </div>

                <div>
                    <div>
                        <input type="radio" id='stripe' value='Stripe' name='paymentMethod' required onChange={(e) => setPaymentMethod(e.target.value)}/>
                    </div>
                    <label htmlFor="stripe">Stripe</label>
                </div>

                <div>
                    <button className='primary' type='submit'>
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}

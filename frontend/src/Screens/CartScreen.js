import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import {Link} from 'react-router-dom';

export default function CartScreen(props) {
    const productID = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]): 1;

    const cart = useSelector((state) => state.cart);
    const { cartitems } = cart;

    const dispatch = useDispatch();
    useEffect(() => {
        if(productID){
            dispatch(addToCart(productID,qty));
        }
    }, [dispatch, productID,qty])


    const removeFromCartHandler = (id) => {
        //delete
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    };

    return (
        <div className='row top'>
            <div className='col-2'>
                <h1>Shopping Cart</h1>
                {cartitems.length === 0 ? 
                    (<MessageBox>
                        Cart is empty <Link to="/">Go Shopping</Link>
                    </MessageBox>)
                    :
                    (
                        <ul>
                            {cartitems.map((item) => (
                                <li key={item.product}>
                                    
                                    <div className='row'>
                                        <div>
                                            <img src={item.image} alt={item.name} className='small'></img>
                                        </div>
                                        <div className='min-30'>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)) )}>
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                ))
                                            }
                                            </select>
                                        </div>
                                        <div>
                                            ${item.price}
                                        </div>
                                        <div>
                                            <button type='button' onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
            <div className='col-1'>
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartitems.reduce((a, c ) => a + c.qty, 0)} items) : ${cartitems.reduce((a,c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartitems.length ===0}>
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

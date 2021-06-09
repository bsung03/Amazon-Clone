
import './index.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './Screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';


function App() {

  const cart = useSelector((state) => state.cart);
  const {cartitems} = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const{ userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
      <div className="grid-container">



        <header className="row">
            <div>
                <Link className="brand" to='/'>Amazona</Link>
            </div>
            <div>
                <Link to="/cart">
                  Cart
                  {cartitems.length > 0 && (
                    <span className='badge'>{cartitems.length}</span>
                  )}
                </Link>

                {
                  userInfo ? (
                    <div className="dropdown">
                        <Link to='#'>{userInfo.name} <i className="fa fa-caret-down"></i> {' '}</Link>
                        <ul className="dropdown-content">
                          <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                        </ul>
                    </div>
                  ) : (
                    <Link to="/signin">Sign In</Link>
                  )
                }

            </div>
        </header>





        <main>

          

          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/product/:id" component={ProductScreen} />

          <Route path="/signin" component={SigninScreen}/>
          
          <Route path="/register" component={RegisterScreen}/>
          <Route path='/shipping' component={ShippingAddressScreen}/>
          <Route path='/payment' component={PaymentMethodScreen}/>
          <Route path='/placeorder' component={PlaceOrderScreen}/>
          <Route path='/order/:id' component={OrderScreen}/>



          
          <Route path="/" component={HomeScreen} exact/>

        </main>






        <footer className="row center">
            All Rights Reserved
        </footer>
      </div>
    </BrowserRouter>

  );
}

export default App;


import './index.css';
import Product from './components/Product';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import { useSelector } from 'react-redux';


function App() {

  const cart = useSelector((state) => state.cart);
  const {cartitems} = cart;

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
                <Link to="/signin">Sign In</Link>
            </div>
        </header>





        <main>

          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/product/:id" component={ProductScreen} />
          
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

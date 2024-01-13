import { Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Banner from './components/Banner';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Login from './components/Login';
import ProductDetail from './components/ProductDetail';
import Products from './components/Products';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
       <Header />

      <Routes>
        <Route path='/' element={<Banner />} />
      </Routes>
      <Routes>
        <Route path='/' element={<Products />} /> 
      </Routes>
      <Routes>
        <Route path='/admin' element={<Admin />} />
      </Routes>

      <Routes>
        <Route path='product/:productId' element={<ProductDetail />} /> 
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

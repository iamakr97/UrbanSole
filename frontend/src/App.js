
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Cart from './Pages/Cart';
import MyAccount from './Pages/MyAccount';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import MyOrders from './Pages/MyOrders';
import SavedAddress from './Components/SavedAddress';
import AddProduct from './Components/AddProduct';
import Product from './Pages/Product';
import Footer from './Components/Footer';
import AllProducts from './Pages/AllProducts';
import Address from './Pages/Address';
import AddAddress from './Components/AddAddress';
import PaymentPage from './Pages/PaymentSuccess';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import { jwtDecode } from "jwt-decode";
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
      } else {
        const data = {
          token,
          user: {
            role: decodedToken.role
          }
        }
        dispatch(login(data));
      }
    }
  }, [])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/myAccount' element={<MyAccount />} />
        <Route path='/myOrders' element={<MyOrders />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/savedAddress' element={<SavedAddress />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/user/address' element={<Address />} />
        <Route path='/user/addAddress' element={<AddAddress />} />
        <Route path='/user/payment' element={<PaymentPage />} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

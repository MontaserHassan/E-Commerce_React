import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { React, Fragment } from 'react';
import { useLocation } from "react-router-dom";
import Navbar from './components/layout/navbar';
import Home from './components/home/home';
// import About from './components/Information/aboutUs';
import Login from './components/client/Login/login';
import Register from './components/client/Register/register';
import Products from './components/products/products';
import Product from './components/products/product';
import Cart from './components/cart/Cart';
import WishList from './components/WishList/WishList';
import Payment from './components/payment/payment';
import Order from './components/order/order';
import UserProfile from './components/client/Profile/UserProfile'
import Footer from './components/layout/footer';
import NotFound from './NotFound/NotFound';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from './ProtectedRoute';


function App() {
  const location = useLocation();

  const isNavbarVisible = !["/register", 'login'].includes(location.pathname);

  return (
    <Fragment>
      <ToastContainer />
      <Navbar />


      <Routes>

        <Route path="/" element={<Home />} />
        {/* <Route path="/about-us" element={<About />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={< UserProfile />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Payment" element={<ProtectedRoute path="/Payment" element={<Payment />} />} />
        <Route path="/order" element={<ProtectedRoute path="/order" element={<Order />} />} />
        <Route path="/WishList" element={<WishList />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      {/* <Footer /> */}

      {isNavbarVisible && <Footer />}
    </Fragment>
  );
};

export default App;

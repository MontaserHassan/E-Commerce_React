import './App.css';
import React from 'react';
import Navbar from './components/layout/navbar';
import Home from './components/home/home';
import About from './components/about/about';
import Login from './components/client/login';
import Register from './components/client/register';
import Products from './components/products/products';
import Product from './components/products/product';
import Cart from './components/cart/cart';
import Footer from './components/layout/footer';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/about-us" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:id" element={<Product/>}/>
          <Route path="/cart" element={<Cart/>}/>

        </Routes>

      <Footer/>
    
    </>
  );
};

export default App;

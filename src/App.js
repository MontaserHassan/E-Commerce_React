import './App.css';
import React from 'react';
import Navbar from './components/navbar';
import Home from './components/home';
import Products from './components/products';
import Product from './components/product';
import Footer from './components/footer';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:id" element={<Product/>}/>

      </Routes>

      <Footer/>
    
    </>
  );
};

export default App;

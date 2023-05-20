import React from 'react'
import { Link } from "react-router-dom";
import "./style/Cart.css"

const EmptyCart = () => {

  return (
  
    <div>
      
      <div className="cart-empty">
      
        <div className="container d-flex flex-column align-items-center justify-content-center">
      
          <h5 className="mt-1" style={{ color: 'black' }}> Your cart is empty Go shopping now. </h5>
          <img src="assets/images/carty.png" height="25%"  className="d-block mx-auto" alt="cart" />

        </div>
    
          <div className="start-Shopping">
    
            <button type="button" className="btn btn-outline-primary">
      
              <Link to={`/product`} className="text-decoration-none on-hover">
      
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
      
                  <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
      
                </svg>
      
                <span> Start Shopping </span>
      
              </Link>
      
            </button>
    
          </div>
    
      </div> 
    
    </div>

  );

};

export default EmptyCart
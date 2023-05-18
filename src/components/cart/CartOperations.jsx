import "./style/Cart.css"
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import { React, Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "../../features/cartSlice";
import { FormatCurrency } from '../../features/FormatCurrency';

const CartOperations = () => {

const dispatch = useDispatch();
const cartItems = useSelector(state => state.cart.cartItems);
const [ cartItem, setCartItem] = useState([]);
const userLogin = useSelector((state) => state.userLogin);
const { userInfo, loading, error } = userLogin


useEffect(() => {
  dispatch(fetchCartItems(userInfo.user_id))
    .then((action) => {
      console.log(action.payload)
      setCartItem(action.payload); // Log the data returned by the async thunk
    });
}, [dispatch, userInfo.user_id,cartItems]);

return (
    <div>
    <div className="opeartion row">
    <div className="col-md-4 pt-5">

      <div className="Continue-Shopping col-md-12">
      <button type="button" className="btn btn-outline-primary">
      <Link to="/product/" className="text-decoration-none on-hover">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          className="bi bi-arrow-left-short"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
          />
        </svg>
        <span> Continue Shopping </span>
        </Link>
    </button>
      </div>
    </div>
    <div className="col-md-8">
      <div className="row justify-content-between">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <div className="subtotal row justify-content-center mt-3">
            <div className="col-auto  mr-3">
              <span className="text-center fw-bolder">Subtotal</span>
            </div>
            <div className="col-auto">
              <span className="amount text-center fw-bold">
                {FormatCurrency(cartItems.cartTotalAmount)}
              </span>
            </div>
          </div>
          <div className="row justify-content-center">
            <h6 className="col-md-12 text-center mt-4">
              You can now complete the purchase
            </h6>
            <NavLink
              to="/payment"
              type="button"
              className="btn btn-secondary col-md-8"
            >
              Buy Now
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default CartOperations

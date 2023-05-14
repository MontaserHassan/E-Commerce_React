import { React, Fragment,useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import "./style/Cart.css"
import {getTotal } from "../../features/cartSlice";
import CartTable from "./CartTable"
import EmptyCart from "./EmptyCart"

const Cart = () => {

const dispatch = useDispatch();
const cart = useSelector((state) => state.cart);
useEffect(()=>{dispatch(getTotal());},[cart,dispatch])

  return (
    <Fragment>
      <div className="container">
      <h2 className="my-5 
      text-center animate__animated animate__bounce
       animate__infinite" 
       style={{
        animation:
         "color-change 2s alternate , move-text 2s ease-in-out 0s "
        }}
        >
        Shopping Cart
        </h2>
        {
          cart.cartItems.length === 0 ? 
          ( <EmptyCart/> ): (<CartTable/> )}
      </div>
    </Fragment>
  );
};

export default Cart;

import { React, Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style/Cart.css"
import { fetchCartItems } from "../../features/cartSlice";
import CartTable from "./CartTable"
import EmptyCart from "./EmptyCart"
import Loader from "../layout/other/Loader";

const Cart = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartItems);
  const [cartItem, setCartItem] = useState([]);

  const [fetchStatus, setFetchStatus] = useState("idle");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  useEffect(() => {
    setFetchStatus("loading");
    if (userInfo) {
      dispatch(fetchCartItems(userInfo.user_id))
      .then((data) => {
        console.log(data.payload)
        setCartItem(`${data.payload}`)
        setFetchStatus("succeeded");
      })
    }

  }, [dispatch, cartItem]);

  return (
    <Fragment>
      <div className="container">
        <h2 className="my-5 
      text-center animate_animated animate_bounce
       animate__infinite"
          style={{
            animation:
              "color-change 2s alternate , move-text 2s ease-in-out 0s "
          }}
        >
          Shopping Cart
        </h2>
        {fetchStatus === "loading" ? (
          <Loader />
        ) : fetchStatus === "failed" ? (
          <div>Error: Failed to fetch cart items.</div>
        ) : (!cartItem || cartItem.length === 0) ?
          (<EmptyCart />) : (<CartTable />)}
      </div>
    </Fragment>
  );
};

export default Cart;
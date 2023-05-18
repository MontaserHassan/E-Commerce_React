import { React, Fragment,useEffect,useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import "./style/Cart.css"
import {fetchCartItems  }from "../../features/cartSlice";
import CartTable from "./CartTable"
import EmptyCart from "./EmptyCart"

const Cart = () => {
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
          cartItems.length === 0 ? 
          ( <EmptyCart/> ): (<CartTable/> )}
      </div>
    </Fragment>
  );
};

export default Cart;

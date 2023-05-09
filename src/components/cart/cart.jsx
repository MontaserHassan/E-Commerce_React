import { React, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const formatCurrency = (currency) => {
  return Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
  }).format(currency);
};
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <Fragment>
      <div className="container">
        <h2 className='my-5'>Shopping Cart</h2>
        <img src="../../assets/" alt="" className="img-fluid rounded-circle mr-3" style={{ maxWidth: '50px' }} />
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <div className="start-Shopping">
              <Link to="/">
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
                <span> Start Shopping </span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>

            <div className="cart-items">
              {cart.cartItems?.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img src={cartItem.image} alt={cartItem.title} />
                    <div>
                      <h3>{cartItem.title}</h3>
                      <p>${cartItem.description}</p>
                      <button>Remove</button>
                    </div>
                  </div>
                  <div className="cart product-price">
                    {formatCurrency(cartItem.price)}
                  </div>
                  <div className="cart product-quantity">
                    <button>-</button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    {formatCurrency(cartItem.price * cartItem.cartQuantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <button className="clear-cart"> Clear Cart </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">{cart.cartTotalAmount}</span>
                </div>
                <p> Taxes and shipping calcutated at checkout</p>
                <button>Check out</button>
                <div className="continue-Shopping">
                  <Link to="/">
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;

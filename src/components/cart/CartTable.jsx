import { React, Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { decreaseCartItems, removeFromCart, addToCart, getTotal } from "../../features/cartSlice";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./style/Cart.css"
import CartOperations from "./CartOperations";
import { FormatCurrency } from '../../features/FormatCurrency';

const CartTable = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [showDecreaseModal, setShowDecreaseModal] = useState(false);
  const [itemToDecrease, setItemToDecrease] = useState(null);

  const handelRemoveFromCart = (cartItem) => {
    setShowDecreaseModal(true);
    setItemToDecrease(cartItem);
  }
  const handelDecreaseCartItems = (cartItem) => {
    if (cartItem.cartQuantity === 1) {
      setShowDecreaseModal(true);
      setItemToDecrease(cartItem);
    } else {
      dispatch(decreaseCartItems(cartItem));
    }
  };
  const handelIncreaseCartItems = (cartItem) => { dispatch(addToCart(cartItem)); }

  useEffect(() => { dispatch(getTotal()); }, [cart, dispatch])


  return (
    <Fragment>
      <table className="table   w-100 m-auto  text-center text-black  mb-4 mt-4 table-spacing " >
        <thead>
          <tr >
            <th className="col-4 fw-bold ">Product</th>
            <th className="col-2 fw-bold">Price</th>
            <th className=" col-2 fw-bold">Quantity</th>
            <th className="col-3 fw-bold">Total</th>
          </tr>
        </thead>
        <tbody className="table-light " data-mdb-toggle="animation" data-mdb-animation-reset="true" data-mdb-animation="slide-out-pluse ">
          {cart.cartItems?.map((cartItem) => (
            <tr className="cart-item " key={cartItem.id}>
              <td className="cart-product col-4 pt-2">
                <div className="row">

                  <div className="col-4 col-md-3">
                    <NavLink to={`/products/${cartItem.id}`}>
                      <img
                        src={cartItem.image}
                        alt={cartItem.title}
                        className="img-fluid"
                      />
                    </NavLink>
                  </div>

                  <div className="col-9 col-md-9">
                    <div className="cart-product-details">
                      <p className="mb-0 fw-bold">{cartItem.title}</p>
                      <button
                        className="btn text-danger mt-3 fw-bold p-1"
                        onClick={() => handelRemoveFromCart(cartItem)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </td>

              <td className="cart-product-price col-3 fw-bold pt-5">
                {FormatCurrency(cartItem.price)}
              </td>

              <td className="cart-product-quantity  col-3 text-center pt-5">
                <div
                  className="d-flex align-items-center justify-content-center mx-5  "
                  style={{ width: "55%", height: "1%" }}
                >
                  <button
                    type="button"
                    className="btn  text-danger fw-bold"
                    onClick={() => handelDecreaseCartItems(cartItem)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-dash-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                      />
                    </svg>
                  </button>
                  <span className="mx-2 fw-bold">
                    {cartItem.cartQuantity}
                  </span>
                  <button
                    type="button"
                    className="btn text-success fw-bold"
                    onClick={() => handelIncreaseCartItems(cartItem)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-plus-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="cart-product-total-price fw-bold col-2 pt-5">
                {FormatCurrency(cartItem.price * cartItem.cartQuantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container w-100 m-auto">
        <CartOperations />
      </div>

      <Modal
        show={showDecreaseModal}
        onHide={() => setShowDecreaseModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Removing Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Remove this from cart?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDecreaseModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              dispatch(removeFromCart(itemToDecrease));
              setShowDecreaseModal(false);
            }}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

    </Fragment>
  );
}

export default CartTable
import { React, Fragment,useEffect ,useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.css"
import { decreaseCartItems, removeFromCart,addToCart,clearCart,getTotal } from "../../features/cartSlice";
import { NavLink } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';   
import Button from 'react-bootstrap/Button';

const formatCurrency = (currency) => {
    return Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency:"SAR",
    minimumFractionDigits: 0,
     }).format(currency)
         };


  const Cart = () => {
   const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTotal());
  },[cart,dispatch])
  
  const handelRemoveFromCart =(cartItem)=>{
  dispatch(removeFromCart(cartItem));
      }
  const handelDecreaseCartItems =(cartItem)=>{
  dispatch(decreaseCartItems(cartItem));
      }
const handelIncreaseCartItems =(cartItem)=>{
dispatch(addToCart(cartItem));
      }
      
  const handelClearCart =(cartItem)=>{
  dispatch(clearCart());}

  const [clearCartShow, setClearCartShow] = useState(false);
const handleClearCartClose = () => setClearCartShow(false);
const handleClearCartShow = () => setClearCartShow(true);
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <Fragment>
      <div className="container">
      <h2 className="my-5 text-center animate__animated animate__bounce animate__infinite" style={{animation: "color-change 2s alternate , move-text 2s ease-in-out 0s "}}>Shopping Cart</h2>

        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
          <div className="container d-flex flex-column align-items-center justify-content-center">
          <h5 className="mt-1" style={{ color: 'black' }}>
          Your cart is empty Go shopping now.
        </h5>
          <img
            src="assets/images/carty.png"
            height="25%"
            className="d-block mx-auto"
            alt="cart"
          />

        </div>
          <div className="start-Shopping">
            <button type="button" className="btn btn-outline-primary">
            <Link to="/" className="text-decoration-none on-hover">
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
          </button>
            </div>
          </div>

        ) : (
          //cart table
          <div>
          <table className="table table-striped w-100 m-auto table-hover text-center text-black  border-dark mb-4 mt-4">
          <thead >
          <tr >
          <th className="col-4" >Product</th>
          <th className="col-2" >Price</th>
          <th className=" col-2" >Quantity</th>
          <th className="col-3" >Total</th>
        </tr>
          </thead>
          <tbody  className="mt-4">
            {cart.cartItems?.map((cartItem) => (
              <tr className="cart-item" key={cartItem.id}>
               
              <td className="cart-product col-4 pt-2">
                  <div className="row">
                       <div className="col-4 col-md-3">
                          <div className="aspect-ratio aspect-ratio-4x3">
                            <img src={cartItem.image} alt={cartItem.title} className="img-fluid" />
                          </div>
                        </div>

                    <div className="col-9 col-md-9">
                      <div className="cart-product-details">
                        <p className="mb-0">{cartItem.title}</p>
                        <button className="btn text-danger mt-3 fw-bolder p-1" onClick={()=>handelRemoveFromCart(cartItem)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="cart-product-price col-2 fw-bolder pt-5">{formatCurrency(cartItem.price)}</td>
                
                <td className="cart-product-quantity  col-3 text-center pt-5">
                <div className="d-flex align-items-center justify-content-center mx-5 border border-2  border-dark rounded-pill " style={{ width: "55%", height: "1%" }} >
                <button type="button" className="btn  text-danger fw-bolder" onClick={()=>handelDecreaseCartItems(cartItem)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                </svg>
                </button>
                 <span className="mx-2 fw-bolder">{cartItem.cartQuantity}</span>
                  <button type="button" className="btn text-success fw-bolder" onClick={()=>handelIncreaseCartItems(cartItem)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                   <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                     </svg>
                  </button> 
               </div> 
               </td>
                <td className="cart-product-total-price fw-bolder col-2 pt-5">{formatCurrency(cartItem.price * cartItem.cartQuantity)}</td>
             
                </tr>
            ))}
          </tbody>
        </table>


       
/*----------------------------------------------------------------*/
        <div className="container w-100 m-auto">
        <div className="row">
          <div className="col-md-4 pt-5">
          <button
          type="button"
          className="btn btn-danger mb-5"
          onClick={handleClearCartShow}
        >
          Clear Cart
        </button>
            <div className="Continue-Shopping col-md-12">
            <button type="button" className="btn btn-outline-primary">
              <Link to="/" class="text-decoration-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
                Continue Shopping
              </Link>
            </button>
          </div>
          </div>
          <div className="col-md-8">
            <div className="row justify-content-between">
              <div className="col-md-6">
             
              </div>
              <div className="col-md-6">
              <div className="subtotal row justify-content-center mt-3">
              <div className="col-auto  mr-3">
                <span className="text-center fw-bolder">Subtotal</span>
              </div>
              <div className="col-auto">
                <span className="amount text-center fw-bold">{formatCurrency(cart.cartTotalAmount)}</span>
              </div>
            </div>
                <div className="row justify-content-center">
                  <h6 className="col-md-12 text-center mt-4">You can now complete the purchase</h6>
                  <NavLink to="/payment" type="button" className="btn btn-secondary col-md-8">Buy Now</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    /* Modal popUp for asking for confirmation before clearing the cart*/

      <Modal
      show={clearCartShow}
      onHide={handleClearCartClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Clear Cart Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to clear your cart?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClearCartClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handelClearCart}>
          Clear Cart
        </Button>
      </Modal.Footer>
    </Modal>
      



          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;

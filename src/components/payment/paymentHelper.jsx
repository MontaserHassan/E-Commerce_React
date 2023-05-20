import React, { useEffect,useState } from 'react'
import { API } from "../../backend";
import { useDispatch } from 'react-redux';
import Card from '../ui/Card';
import { FormatCurrency } from '../../features/FormatCurrency'
import { fetchCartItems } from "../../features/cartSlice";



const PaymentHelper = () => {
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const [cartItem, setCartItem] = useState([]);
    useEffect(() => {
        console.log("cartItem", cartItem);
      }, [cartItem]);
    
      useEffect(() => {
        dispatch(fetchCartItems(userInfo.user_id))
          .then((action) => {
            const payload = action.payload;
            setCartItem(payload);
          });
      }, [dispatch, userInfo.user_id]);
    console.log(cartItem);
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            console.log("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            console.log(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return (

        <section>
            <div className="row">
                {cartItem.map((item) => (
                    <div className="col-lg-4" key={item.id}>
                        <Card>
                            <div className="product" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    src={item.product.image}
                                    alt={item.product.title}
                                    style={{ width: '16rem', height: '20rem' }}
                                />
                                <div className="description" style={{ textAlign: 'center' }}>
                                    <h3>{item.title}</h3>
                                    <h5>price: {FormatCurrency(item.product.price)}</h5>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
            <div className="row" style={{ width: '100%' }} >
                <div className="row justify-content-center">
                    <div className="col-6 text-center">
                        <form action={`${API}payment/create-checkout-session`} method="POST">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Check Out<br></br>

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );

};


export default PaymentHelper;
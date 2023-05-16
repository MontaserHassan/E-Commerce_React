import React, { useEffect } from 'react'
import { API } from "../../backend";
import { useSelector } from 'react-redux';
import Card from '../ui/Card';
import { FormatCurrency } from '../../features/FormatCurrency'


const PaymentHelper = () => {
    const state = useSelector(state => state.cart.cartItems);
    const total = useSelector(state => state.cart.cartTotalAmount);
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
                {state.map((item) => (
                    <div className="col-lg-4" key={item.id}>
                        <Card>
                            <div className="product" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: '16rem', height: '20rem' }}
                                />
                                <div className="description" style={{ textAlign: 'center' }}>
                                    <h3>{item.title}</h3>
                                    <h5>price: {FormatCurrency(item.price)}</h5>
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
                                {FormatCurrency(total)}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );

};


export default PaymentHelper;
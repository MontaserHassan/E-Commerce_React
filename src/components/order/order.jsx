import React, { useState, useEffect } from 'react';
import { API } from "../../backend";

function Order() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            const response = await fetch(`${API}order`);
            const data = await response.json();
            setOrders(data);
        }

        fetchOrders();
    }, []);

    return (

        <div className="justify-content-center mb-3 mt-4 bg-light m-auto rounded-3 w-75 align-content-center">

            <h2 className="text-dark mt-4 text-center fw-bold display-6">My Orders</h2>
            <hr />

            <table className="table table-bordered m-auto mb-5 rounded-3">

                <thead>

                    <tr>

                        <th className="fw-bold">Transaction ID</th>
                        <th className="fw-bold">Address</th>
                        <th className="fw-bold">Status</th>
                        <th className="fw-bold">Total Price</th>
                        <th className="fw-bold">Delivery Date</th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map((order) => (
                        
                        <tr key={order.id}>
                            
                            <td>
                            
                                <div className="d-flex align-items-center">

                                    <div className="ms-3">
                            
                                        <p className="fw-bold mb-1">{order.transaction_id}</p>
                            
                                    </div>
                            
                                </div>
                            
                            </td>
                            
                            <td>
                           
                                <p className="fw-normal mb-1">Street: {order.shipping_address.street}</p>
                                <p className="text-muted mb-0">City: {order.shipping_address.city}</p>

                            </td>
                           
                            <td>
    
                                <span className="badge badge-warning text-dark rounded-pill d-inline"> {order.status}
                                    {order.status === 'shipped' && <span className="badge badge-warning text-dark rounded-pill fw-bold d-inline display-6"> <i className="fas fa-motorcycle"></i> </span>}
                                    {order.status === 'delivered' && <span className="badge badge-warning text-dark rounded-pill fw-bold d-inline display-6"> <i className="fas fa-user"></i> </span>}
                                    {order.status === 'pending' && <span className="badge badge-warning text-dark rounded-pill d-inline fw-bold display-6"> <i className="fas fa-box"></i> </span>}
                                </span>

                            </td>


                            <td>
                           
                                <span className="badge badge-warning text-dark rounded-pill d-inline"> {order.total} </span>
                           
                            </td>

                            <td>
                           
                                <p className="text-muted mb-0">{order.delivery_date}</p>
                           
                            </td>
                        
                        </tr>
                    
                    ))}

                </tbody>

            </table>

        </div>
    );

}

export default Order;
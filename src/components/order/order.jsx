import React, { useState, useEffect } from 'react';
import { API } from "../../backend";

function Order() {

    const [orders, setOrders] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    useEffect(() => {
        async function fetchOrders() {
            const response = await fetch(`${API}order/`,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.access}`,
                    },
                });
            const data = await response.json();
            setOrders(data);
        }

        fetchOrders();
    }, []);

    return (
        <div className="justify-content-center mb-3 mt-4 bg-light m-auto rounded-3 w-75 align-content-center">
            <h2 className="text-dark mt-4 text-center fw-bold display-6">My Orders</h2>
            <hr />

            <table className="table table-bordered table-hover m-auto mb-5">
                <thead className="table-light">
                    <tr>
                        <th className="border-0 fw-bold">Transaction ID</th>
                        <th className="border-0 fw-bold">Status</th>
                        <th className="border-0 fw-bold">Total Price</th>
                        <th className="border-0 fw-bold">Delivery Date</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="align-middle">{order.transaction_id}</td>

                            <td className="align-middle">
                                <span className={`badge badge-warning text-dark rounded-pill ${order.shipping === 'shipped' ? 'fw-bold display-6' : ''}`}>
                                    {order.shipping}
                                    {order.shipping === 'shipped' && <i className="fas fa-motorcycle ms-1"></i>}
                                    {order.shipping === 'delivered' && <i className="fasfa-user ms-1"></i>}
                                    {order.shipping === 'pending' && <i className="fas fa-box ms-1"></i>}
                                </span>
                            </td>

                            <td className="align-middle">
                                <span className="badge badge-warning text-dark rounded-pill">{order.total_price}</span>
                            </td>

                            <td className="align-middle">
                                <p className="text-muted mb-0">{order.delivered_date}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );



}

export default Order;
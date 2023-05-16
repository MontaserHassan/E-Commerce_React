// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Card from '../ui/Card';
// import { getMeToke, processPayment } from './paymentHelper';
// import DropIn from "braintree-web-drop-in-react"

// const userId = "123";
// const token = "user123";

// const isAuthenticated = true;

// const formatCurrency = (currency) => {
//     return Intl.NumberFormat("ar-SA", {
//         style: "currency",
//         currency: "SAR",
//         minimumFractionDigits: 0,
//     }).format(currency)
// };

// const Payment = (props) => {
//     const state = useSelector(state => state.cart);
//     const bill = formatCurrency(state.cartTotalAmount);
//     const [info, setInfo] = useState({
//         loading: false,
//         success: false,
//         cleintToken: null,
//         error: "",
//         instance: {},
//     })
//     ///////////waiting user/////////////
//     const getToken = (userId, token) => {
//         getMeToke(userId,token)
//         .then((info)=>{
//             if(info.error){
//                 setInfo({
//                     ...info,
//                     error:true
//                 });
//                 return <Link to='/' />
//             }else{
//                 const cleintToken = token
//                 setInfo({cleintToken})
//             }
//         })
//     }

//     useEffect(() => {
//         getToken(userId, token)
//     }, [])
//     console.log(info.cleintToken);
//     console.log(info.instance);
//     const showBtnDropIn = () => {
//         return (

//             <div>
//                 <DropIn
//                     options={{ authorization: info.cleintToken }}
//                     onInstance={(instance) => (info.instance = instance)}
//                     />

//                 <button>Buy</button>
//             </div>
//         )
//     }


//     // console.log(bill);
//     return (
//         <Card className='container'>
//             <div className='text-align-center' style={{ textAlign: 'center' }}>
//                 <h3> Your Bill is :</h3>
//                 <h2>{bill}</h2>
//                 {showBtnDropIn()}
//             </div>
//         </Card>
//     );
// }

// export default Payment;

import React from "react";
import PaymentHelper from './paymentHelper'


function Payment() {

    return (
        <>
        <PaymentHelper />
        </>

    );

};

export default Payment;

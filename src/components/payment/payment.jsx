import React from 'react';
// import { useState,useEffect } from 'react';
// import { redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import formatCurrency from '../cart/Cart'
import Card from '../ui/Card';

const formatCurrency = (currency) => {
    return Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 0,
    }).format(currency)
  };

const Payment = (props) => {
    const state = useSelector(state => state.cart);
    const bill = formatCurrency(state.cartTotalAmount);
    // console.log(bill);
    return (
        <Card className='container'>
            <div className='text-align-center' style={{ textAlign: 'center' }}>
                <h3> Your Bill is :</h3>
                <h2>{bill}</h2>
            </div>
        </Card>
    );
}

export default Payment;
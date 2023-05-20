
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from './other/search';
import { NavDropdown } from 'react-bootstrap';
import { fetchCartItems } from "../../features/cartSlice";

import {
    USER_LOGIN_SUCCESS,
}
    from '../client/userConst'
import './other/style/navbar.css'
import { logout } from '../client/userAction'

const Navbar = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cartItems);
    const [cartItem, setCartItem] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { cartTotalQuantity } = useSelector(state => state.cart);


    useEffect(
        () => {
            if (userInfo) {
                dispatch(
                    fetchCartItems(userInfo.user_id))
                    .then((action) => {
                        setCartItem(action.payload);
                    })
            }

        }, [dispatch]);



    const handleLogout = () => {
        dispatch(logout());
    }
    const handelProfile = () => {
        setDropdownOpen(false); // Close the dropdown
        navigate('/profile'); // Navigate to the profile page
    };

    return (
        <Fragment>
            <div className="">

                <nav className="navbar bg-dark navbar-expand-lg  py-2 ">

                    <div className="container-fluid">

                        <NavLink className="navbar-brand text-light fw-bolder me-5 fs-5 ms-4 mt-2 mb-1" to="/">
                            <img src="/assets/images/nav-icon.png" alt="" width="40" height="40" className="d-inline-block align-text-top" /> QUICK BUY </NavLink>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">

                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <NavLink className="nav-link text-light ms-2" aria-current="page" to="/">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link text-light ms-2" to="/product/">Products</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link text-light ms-2" to="/WishList">My Wish List</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link text-light ms-2" to="/order">My Orders</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link text-light ms-2" aria-current="page" to="/about-us">About-Us</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link text-light ms-2" to="/contact-us">Contact-Us</NavLink>
                                </li>



                            </ul>

                            <Search />

                            <div className="buttons me-5">
                                {userInfo ? (
                                    <NavDropdown className="btn btn-outline-light" title={userInfo.username} id='username'>
                                        <button className="btn btn-outline-dark " onClick={() => handelProfile()}>
                                            <i className="fas fa-sign-in-alt me-1"></i>
                                            Profile
                                        </button>
                                        <button className="btn btn-outline-dark " onClick={handleLogout}>
                                            <i className="fas fa-sign-in-alt me-1"></i>
                                            &nbsp;  Logout
                                        </button>
                                    </NavDropdown>


                                ) : (
                                    <NavLink className="btn btn-outline-light" to="/login">
                                        <i className="fas fa-sign-in-alt me-1"></i>
                                        &nbsp; Login
                                    </NavLink>
                                )}
                                {!userInfo && (
                                    <NavLink className="btn btn-outline-light ms-2" to="/register">
                                        <i className="fa fa-user-plus"></i>
                                        &nbsp; Register
                                    </NavLink>
                                )}
                                <NavLink className="btn btn-outline-light ms-2" to="/cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    &nbsp; Cart &nbsp; <span>{cartTotalQuantity}</span>
                                </NavLink>
                            </div>

                        </div>

                    </div>

                </nav>

            </div >

        </Fragment >

    );
};

export default Navbar;
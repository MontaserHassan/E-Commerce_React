
import React, { Fragment, useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from './other/search';
import { NavDropdown, LinkContainer } from 'react-bootstrap';
import {
    USER_LOGIN_SUCCESS,
} from '../client/userConst'

const Navbar = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    const { cartTotalQuantity } = useSelector(state => state.cart);
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: JSON.parse(storedUserInfo) });
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch({ type: 'USER_LOGOUT' });
        localStorage.removeItem('userInfo');
    }



    return (
        <Fragment>
            <div className="ms-2 me-2 mt-3">

                <nav className="navbar navbar-expand-lg bg-dark rounded-3 py-2 shadow-sm">

                    <div className="container-fluid">
                        <div className="col-2">

                            <NavLink className="navbar-brand text-light fw-bolder me-5 fs-5 ms-4 mt-2 mb-1" to="/">
                                <img src="assets/images/nav-icon.png" alt="Quick Buy Logo"
                                    width="90" height="50"
                                    className="d-inline-block align-text-top me-2" />
                                QUICK BUY
                            </NavLink>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">

                            <ul className="navbar-nav mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <NavLink className="nav-link text-light ms-2" aria-current="page" to="/">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link text-light ms-2" to="/products">Products</NavLink>
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
                                        <NavLink className="btn btn-outline-light" to="/profile">
                                            <i className="fas fa-sign-in-alt me-1"></i>
                                            &nbsp; Profile
                                        </NavLink>
                                        <button className="btn btn-outline-dark" onClick={handleLogout}>
                                            <i className="fas fa-sign-in-alt me-1"></i>
                                            &nbsp; Logout
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

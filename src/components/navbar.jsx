import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const [searchValue, setSearchValue] = useState("");


    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value)
    }

    return (
        <>
            <div className="ms-2 me-2 mt-4">

                <nav className="navbar navbar-expand-lg bg-dark rounded-3 py-3 shadow-sm">
                    
                    <div className="container-fluid">
                        
                        <NavLink className="navbar-brand text-light fw-bolder fs-4 ms-3" to="/">Website</NavLink>
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                
                                <li className="nav-item">
                                    <NavLink className="nav-link active text-light ms-2" aria-current="page" to="/">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link text-light ms-2" to="/products">Products</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active text-light ms-2" aria-current="page" to="/about-us">About-Us</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link text-light ms-2" to="/contact-us">Contact-Us</NavLink>
                                </li>
                        
                            </ul>
                        
                            <form className="d-flex me-4" role="search">
                        
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchValue} onChange={handleSearchInputChange}/>
                               <button className="btn btn-warning rounded-end" type="submit"><i className="fas fa-search"></i></button>
                        
                            </form>

                            <div className="buttons me-5">
                                <NavLink className="btn btn-outline-light" to="/login">
                                    <i className="fas fa-sign-in-alt me-1"></i>
                                    &nbsp; Login
                                </NavLink>
                                <NavLink className="btn btn-outline-light ms-2" to="/register">
                                    <i className="fa fa-user-plus"></i>
                                    &nbsp; Register
                                </NavLink>
                                <NavLink className="btn btn-outline-light ms-2" to="/cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    &nbsp; Cart (0)
                                </NavLink>
                            </div>
                        
                        </div>
            
                    </div>
            
                </nav>            
            
            </div>
        </>
    );
};

export default Navbar;

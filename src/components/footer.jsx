import React from 'react';
import { NavLink } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
    return (
        <>

            <footer className="text-center mt-5 text-lg-start bg-light text-muted">

                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    
                    <div className="me-5 ms-3 d-none d-lg-block">
                    
                        <span>Get connected with us on social networks:</span>
                    
                    </div>

                    <div>
                    
                        <NavLink to="" className="me-4 text-reset">
                            <i className="fab fa-facebook-square"></i>
                        </NavLink>
                        <NavLink to="" className="me-4 text-reset">
                            <i className="fab fa-twitter"></i>
                        </NavLink>
                        <NavLink to="" className="me-4 text-reset">
                            <i className="fab fa-google-plus-square"></i>
                        </NavLink>
                        <NavLink to="" className="me-4 text-reset">
                            <i className="fab fa-instagram"></i>
                        </NavLink>
                        <NavLink to="" className="me-4 text-reset">
                            <i className="fab fa-linkedin-square"></i>
                        </NavLink>
                    
                    </div>

                </section>

                <section className="">
                    
                    <div className="container text-center text-md-start mt-5">
                        
                        <div className="row mt-3">
                            
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>Company name
                                </h6>
                                <p>
                                    Here you can use rows and columns to organize your footer content. Lorem ipsum
                                    dolor sit amet, consectetur adipisicing elit.
                                </p>
                            
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Products
                                </h6>
                                <p> Clothing </p>
                                <p> Accessories </p>
                                <p> Electronic </p>
                                <p> Feeding </p>
                                
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p> Website App Download </p>
                                <p> Settings </p>
                                <p> Help </p>
                            
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i className="fas fa-home me-3"></i> Bani-Suef, Egypt</p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    Django&React@gmail.com
                                </p>
                                <p><i className="fas fa-phone me-3"></i>(+02)1111611810</p>
                                <p><i className="fas fa-print me-3"></i>(+02)1234567890</p>
                            
                            </div>
                        
                        </div>
                    
                    </div>

                </section>

                <div className="text-center p-4">
                    © 2023 Copyright:
                    <NavLink className="text-reset fw-bold" to="#">ITI students</NavLink>
                </div>

            </footer>
        </>
    );
}

export default Footer;

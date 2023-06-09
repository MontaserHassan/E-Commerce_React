import React, { Fragment } from 'react';
import './style/Carousel.css'
import main from '../../images/main.png'
import { Link } from 'react-router-dom';

const Carousel = () => {

    return (

        <Fragment>

            <div className="main">
            
                <img src={main} className="w-50" title="Clothings" alt="Clothings" />
            
                <div className="content">
            
                    <h1 className='font-link'>All your Needs in One Place</h1>
                    <div className="centered">
            
                        <p>We ship over a million products around the world Discover Our Products</p>
                        <p >
                            <Link to='/product'><button className='btn btn-dark'>Discover  </button></Link>
                        </p>

                    </div>

                </div>

            </div>

            <div id="carouselExampleIndicators" className="rounded-3 carousel carousel-home slide m-auto mt-4 " data-bs-ride="carousel">

                <div className="carousel-indicators rounded-3">

                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1">  </button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>

                </div>

                <div className="carousel-inner rounded-3 ">

                    <div className="carousel-item active">

                        <img src="assets/images/labs.webp" className="d-block w-100 " title="Clothings" alt="Clothings" />

                    </div>

                    <div className="carousel-item">

                        <img src="assets/images/Accessories.jpg" className="d-block w-100" title="Accessories" alt="Accessories" />

                    </div>

                    <div className="carousel-item">

                        <img src="assets/images/Electronics.jpg" className="d-block w-100" alt="Electronics" title="Electronics" />

                    </div>

                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">

                    <span className="visually-hidden">Previous</span>

                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">

                    <span className="visually-hidden">Next</span>

                </button>

            </div>

        </Fragment >


    );

};

export default Carousel;
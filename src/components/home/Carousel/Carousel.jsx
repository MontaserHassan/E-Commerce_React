import React from 'react';
import './style/Carousel.css'

const Carousel = () => {
    return (
    
        <>
            
            <div id="carouselExampleIndicators" className="rounded-3 m-auto carousel carousel-home slide ms-5" data-bs-ride="carousel">
                
                <div className="carousel-indicators rounded-3">
                
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                
                </div>

                <div className="carousel-inner rounded-3">
                
                    <div className="carousel-item active">
                
                        <img src="assets/images/Clothings.jpg" height="550px" className="d-block w-100" title="Clothings" alt="Clothings" />
                
                    </div>
                
                    <div className="carousel-item">
                
                        <img src="assets/images/Accessories.jpg" height="550px" className="d-block w-100"title="Accessories" alt="Accessories" />
                
                    </div>
                
                    <div className="carousel-item">
                
                        <img src="assets/images/Electronics.jpg" height="550px" className="d-block w-100" alt="Electronics" title="Electronics"/>
                
                    </div>
                
                </div>
                
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
               
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
               
                </button>
                
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
               
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                
                </button>
            
            </div>

        </>
    
    );
}

export default Carousel;

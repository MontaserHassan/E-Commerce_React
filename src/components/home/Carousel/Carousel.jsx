import React from 'react';

const Carousel = () => {
    return (
    
        <>
            
            <div id="carouselExampleIndicators" className="w-75 m-auto carousel slide" data-bs-ride="carousel">
                
                <div class="carousel-indicators">
                
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                
                </div>

                <div class="carousel-inner">
                
                    <div class="carousel-item active">
                
                        <img src="assets/images/Clothings.jpg" height="550px" class="d-block w-100" title="Clothings" alt="Clothings" />
                
                    </div>
                
                    <div class="carousel-item">
                
                        <img src="assets/images/Accessories.jpg" height="550px" class="d-block w-100"title="Accessories" alt="Accessories" />
                
                    </div>
                
                    <div class="carousel-item">
                
                        <img src="assets/images/Electronics.jpg" height="550px" class="d-block w-100" alt="Electronics" title="Electronics"/>
                
                    </div>
                
                </div>
                
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
               
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
               
                </button>
                
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
               
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                
                </button>
            
            </div>

        </>
    
    );
}

export default Carousel;

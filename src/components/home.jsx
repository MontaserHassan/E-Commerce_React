import React from 'react';
import Products from './products';

const Home = () => {
    return (
        <div className='hero mt-1 ms-2 me-2'>
            
            <div className="card text-white">
                <img src="assets/images/Montaser.jpg" className="card-img" alt="Background" height="550px"/>
                <div className="card-img-overlay d-flex flex-column justify-content-center">

                    <div className="container">
                        
                        <h5 className="card-title display-3 fw-bolder mb-0">NEW SEASON ARRIVALS</h5>
                        <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>

                    </div>
                
                </div>
            
            </div>

            <Products/>
            
        </div>
    );
}

export default Home;

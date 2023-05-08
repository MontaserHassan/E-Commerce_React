import React from 'react';
import Carousel from './Carousel/Carousel';
import Wishlists from './wishlists';
import HomeFooter from './home-footer';

const Home = () => {
    return (

        <>

            <div className="container-fluid">

                <div className="text-center-fw-bold mt-5 mb-5">
                
                    <h1 className="me-2 text-center display-6 fw-bolder">Visit us to find what please you</h1>
                
                </div>

                
                <div className="row">
                
                    <div className="col-md-2">
                
                        <Wishlists/>
                
                    </div>
                
                    <div className="hero mt-1 col-md-10">
                                
                        <Carousel />

                    </div>
                    
                </div>
            </div>

            <div className="container-fluid">

                <HomeFooter/>

            </div>

        </>
    );
}

export default Home;

import React, { Fragment } from 'react';
import Carousel from './Carousel/Carousel';
// import Wishlists from './wishlists';
import HomeFooter from './home-footer';

const Home = () => {
    return (

        <Fragment>

            <div className="container-fluid mx-5">

                <div className="text-center-fw-bold mt-5 mb-5">
                    <h1 className="me-2 text-center display-6 fw-bolder">Visit us to find what please you</h1>
                </div>

                
                <div className="row ">
                    <div className="hero mt-1 text-center col-md-12">
                        <Carousel />
                    </div>
                </div>
           
         </div>

            <div className="container-fluid">

                <HomeFooter/>

            </div>

        </Fragment>
    );
}

export default Home;

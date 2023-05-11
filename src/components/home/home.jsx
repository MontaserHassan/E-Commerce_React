import React, { Fragment } from 'react';
import Carousel from './Carousel/Carousel';
// import Wishlists from './wishlists';
import HomeFooter from './home-footer';

const Home = () => {
    return (

        <Fragment>

            <div className="container-fluid ">

              
                <div className="row ">
                    <div className="hero mx-5 mt-1 text-center ">
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

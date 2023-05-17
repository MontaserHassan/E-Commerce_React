import React, { Fragment } from 'react';
import Carousel from './Carousel/Carousel';
import HomeFooter from './home-footer';
import main from '../images/main.png'
import './style/home.css'
const Home = () => {
    return (

        <Fragment>
            <div className="main ">
                <img src={main} className=" w-50 " title="Clothings" alt="Clothings" />
            </div>
            <div className="container-fluid ">

                <div className="row ">

                    <div className="hero  mt-1 text-center ">

                        <Carousel />
                    </div>
                </div>

            </div>
            <div className="container-fluid">

                <HomeFooter />

            </div>

        </Fragment>
    );
}

export default Home;

import React from 'react';
// import Products from './products';
import Carousel from './Carousel/Carousel';

const Home = () => {
    return (

        <>

            <div className="text-center-fw-bold mt-5 mb-5">

                <h1 className="me-2 text-center display-6 fw-bolder">Visit us to find what please you</h1>
            
            </div>

            <div className='hero mt-1'>

                <Carousel/>
                
            </div>

        </>
    );
}

export default Home;

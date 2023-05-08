import React from 'react';
import "./style/home-footer.css";

const HomeFooter = () => {
    return (
        
        <>

            <div className="d-flex w-100 mt-5">

                <div className="card gradStart text-center h-100 p-4 mt-3 w-75 h-25">
                    <img className="card-img-top" width="350px" height="300px" src="assets/images/Sports.jpg" title="Sports" alt="Sports"/>
                    <div className="card-body">
                        <h5 className="card-title">Sport Tools</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>

                <div className="card text-center gradCenter h-100 p-4 mt-3 w-75 h-25">
                    <img className="card-img-top" width="350px" height="300px" src="assets/images/Gym.jpg" title="Gym" alt="Gym"/>
                    <div className="card-body">
                        <h5 className="card-title">Gym Materials</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>

                <div className="card text-center gradEnd h-100 p-4 mt-3 w-75 h-25">
                    <img className="card-img-top" width="350px" height="300px" src="assets/images/Food.jpg" title="Food" alt="Food"/>
                    <div className="card-body">
                        <h5 className="card-title">Favorite Foods</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>


        </>
    
    );
}

export default HomeFooter;

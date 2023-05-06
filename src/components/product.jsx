import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';

const Product = () => {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getProduct = async () => {
            setIsLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                setProduct(await response.clone().json());
                setIsLoading(false);
        }
        getProduct()
    },[]);

    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={350}/>
                </div>

                <div className="col-md-6" style={{ lineHeight:2 }}>
                    <Skeleton width={350} height={50}/> {/* category */}
                    <Skeleton height={75}/> {/* title */}
                    <Skeleton height={50}/> {/* price */}
                    <Skeleton height={150}/> {/* description */}
                    <Skeleton height={50} width={100}/> {/* btn 1 */}
                    <Skeleton height={50} width={100} style={{ marginLeft:6 }}/> {/* btn 2 */}
                </div>

            </>
        );
    };

    const ShowProduct = () => {
        return (
            <>
                
                <div className="col-md-6">
                    <img src={product.image} alt={product.title} height="400px" width="400px"/>
                </div>

                <div className="col-md-6">

                    <h4 className="text-black-50 text-uppercase">{ product.category }</h4>
                    <h1 className="display-6">{ product.title }</h1>
                    <h3 className="fw-bold my-4 display-6">$ { product.price }</h3>
                    <p className="lead">{ product.description }</p>
                    <button className="btn btn-outline-success px-4 py-2">Add To Cart</button>
                    <NavLink to="/cart" className="btn btn-outline-secondary px-4 py-2 ms-3">Go To Cart</NavLink>

                </div>

            </>
        );
    };



    return (
        
        <div>

            <div className="container py-5">

                <div className="row py-5">
                    {isLoading ? <Loading/> : <ShowProduct/> }
                </div>
            
            </div> 

        </div>
    
    );
}

export default Product;

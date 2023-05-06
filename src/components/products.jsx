import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Products = () => {

    const [ data, setData ] = useState([]);
    const [ filter, setFilter ] = useState(data);
    const [ isLoading, setIsLoading ] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getAllProducts = async () => {
            setIsLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            if(componentMounted){
                setData(await response.clone().json());
                setFilter(await response.json());
                console.log(filter);
                setIsLoading(false);
            }
            return() => {
                componentMounted = false;
            }
        }
        getAllProducts()
    },[]);

    const Loading = () => {
        return (
            <>

                <div className="col-md-3">
                    {/* <h4>Loading...</h4> */}
                    <Skeleton animation="wave" width={210} height={350}/>
                </div>
            
            </>
        );
    };

    const filterProducts = (category) => {
        const updatedList = data.filter( prod => prod.category === category );
        setFilter(updatedList);
    };

    const formatCurrency = (currency) => {
        return Intl.NumberFormat('ar-SA', {
          style: 'currency',
          currency: 'SAR',
          minimumFractionDigits: 0,
        }).format(currency);
      }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">

                    <button className="btn btn-outline-dark me-2" onClick={()=>{setFilter(data)}}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>{filterProducts("men's clothing")}}>Men's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>{filterProducts("women's clothing")}}>Women's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>{filterProducts('jewelery')}}>Jewelery</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>{filterProducts('watches')}}>Watches</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>{filterProducts('electronics')}}>Electronic</button>

                </div>

                { filter.map((product) => {
                    return(
                        <>
                          
                            <div className="col-md-3 mb-4">
                                <div className="card text-center h-100 p-4" key={product.id}>
                                    <img className="card-img-top" src={product.image} alt={product.title} height="250px"/>
                                    <div className="card-body">
                                        <h5 className="card-title  mb-0">{product.title.substring(0,12)}...</h5>
                                        <p className="card-text lead fw-bold">{ formatCurrency(product.price) }</p>
                                        <NavLink to={`/products/${product.id}`} className="btn btn-outline-primary">Details</NavLink>
                                    </div>
                                </div>
                            </div>
                        
                        </>
                    )
                }) }
            </>
        );
    };


    return (
        <div>

            <div className="container mt-4">

                <div className="row">
                    
                    <div className="col-12">

                        <h1 className="me-2 text-center display-6 fw-bolder">Our Products</h1>
                        <hr className="mt-5"/>
                    
                    </div>
                
                </div>

                <div className="row justify-content-center mt-5">
                    { isLoading ? <Loading/> :<ShowProducts/> }
                </div>

            </div>
        
        </div>
    );
}

export default Products;

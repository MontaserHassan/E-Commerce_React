import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Pagination from './pagination';
import classNames from 'classnames';


const Products = () => {

    const [ products, setProducts ] = useState([]);
    const [ filter, setFilter ] = useState(products);
    const [ isLoading, setIsLoading ] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [ currentPage, setCurrentPage ] = useState(1);

    let componentMounted = true;


    useEffect(() => {
        const getAllProducts = async () => {
            setIsLoading(true);
            const response = await fetch('http://localhost:3030/products');
            if(componentMounted){
                setProducts(await response.clone().json());
                setFilter(await response.json());
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
        setActiveCategory(category);
        const updatedList = products.filter( prod => prod.category === category );
        setFilter(updatedList);
    };

    // Pagination
    const productPerPage = 8;
    const pages = Math.ceil(filter.length / productPerPage); // to round to the nearest whole number
    const startIndex = ( currentPage - 1 ) * productPerPage; // 0
    const endIndex = currentPage * productPerPage; // 3
    const currentProducts = filter.slice(startIndex, endIndex); // [ 0, 1, 2 ]

    const formatCurrency = (currency) => {
        return Intl.NumberFormat('ar-SA', {
          style: 'currency',
          currency: 'SAR',
          minimumFractionDigits: 0,
        }).format(currency);
    }

    const handleFilterProduct = () => {
        setFilter(products);
    }
    
    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">

                    <button className="btn btn-outline-dark me-2" onClick={handleFilterProduct}>All</button>
                    <button className={classNames('btn btn-outline-dark me-2', {active: activeCategory === "men's clothing"})} onClick={()=>{filterProducts("men's clothing")}}>Men's Clothing</button>
                    <button className={classNames('btn btn-outline-dark me-2', {active: activeCategory === "women's clothing"})} onClick={()=>{filterProducts("women's clothing")}}>Women's Clothing</button>
                    <button className={classNames('btn btn-outline-dark me-2', {active: activeCategory === "jewelery"})} onClick={()=>{filterProducts('jewelery')}}>Jewelery</button>
                    <button className={classNames('btn btn-outline-dark me-2', {active: activeCategory === "watches"})} onClick={()=>{filterProducts('watches')}}>Watches</button>
                    <button className={classNames('btn btn-outline-dark me-2', {active: activeCategory === "electronics"})} onClick={()=>{filterProducts('electronics')}}>Electronic</button>

                </div>

                { currentProducts.map((product) => {
                    return(
                        <>
                          
                            <div className="col-md-3 mb-4">
                                <div className="card text-center h-100 p-4" key={product.id}>
                                    <img className="card-img-top" src={product.image} title={product.title} alt={product.title} height="350px"/>
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
                    
                    <div className="col-12 mt-2">

                        <h3 className="me-2 mt-4 text-center display-6 fw-bolder">Our Products</h3>
                        <hr className="mt-5"/>
                    
                    </div>
                
                </div>

                <div className="row justify-content-center mt-5">
                    { isLoading ? <Loading/> : <ShowProducts/>  }
                    { isLoading ? <Loading/> : <Pagination pages={ pages } currentPage={ currentPage } setCurrentPage={setCurrentPage} /> }
                </div>

            </div>
        
        </div>
    );
}

export default Products;

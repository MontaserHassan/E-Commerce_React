import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Pagination from './pagination';
import classNames from 'classnames';
import './style/products.css';
import { FormatCurrency } from '../../features/FormatCurrency';

const Products = () => {
    // const {items,status}=useSelector(state => state.products)
    // const {data,error,isLoading}=useGetAllProductsQuery();
      
    const [ products, setProducts ] = useState([]);
    const [ filter, setFilter ] = useState(products);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ activeCategory, setActiveCategory ] = useState(null);
    const [ currentPage, setCurrentPage ] = useState(1);
    let componentMounted = true;


    useEffect(() => {
        const getAllProducts = async () => {
            setIsLoading(true);
            const response = await fetch('http://127.0.0.1:8000/product');
            if(componentMounted){
                setProducts(await response.clone().json());
                setFilter(await response.json());
                setIsLoading(false);
            }
            return() => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                componentMounted = false;
            }
        }
        getAllProducts()
    },[]);

    const Loading = () => {
        return (
            <Fragment>

                <div className="col-md-3">
                    
                    {/* <h4>Loading...</h4> */}
                    <Skeleton animation="wave" width={210} height={350}/>

                </div>
            
            </Fragment>
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

    const handleFilterProduct = () => {
        setActiveCategory();
        setFilter(products);
    }
    
    const ShowProducts = () => {
        return (
            
            <Fragment>
                
                <div className="buttons d-flex justify-content-center mb-5 pb-5">

                    <button className="btn btn-outline-dark rounded-5 me-2" onClick={handleFilterProduct}>All</button>
                    <button className={classNames('btn btn-outline-dark rounded-5 me-2', {active: activeCategory === "men's clothing"})} onClick={()=>{filterProducts("men's clothing")}}>Men's Clothing</button>
                    <button className={classNames('btn btn-outline-dark rounded-5 me-2', {active: activeCategory === "women's clothing"})} onClick={()=>{filterProducts("women's clothing")}}>Women's Clothing</button>
                    <button className={classNames('btn btn-outline-dark rounded-5 me-2', {active: activeCategory === "jewelery"})} onClick={()=>{filterProducts('jewelery')}}>Jewelery</button>
                    <button className={classNames('btn btn-outline-dark rounded-5 me-2', {active: activeCategory === "watches"})} onClick={()=>{filterProducts('watches')}}>Watches</button>
                    <button className={classNames('btn btn-outline-dark rounded-5 me-2', {active: activeCategory === "electronics"})} onClick={()=>{filterProducts('electronics')}}>Electronic</button>

                </div>

                <div className="row">
                
                    { currentProducts.map((product) => {
                            return(
                                <Fragment>

                                    <div className="col-md-3 mb-4">
                                        <div className="card text-center h-100 p-4" key={product.id}>
                                            <div className="bg-image hover-overlay hover-zoom hover-shadow ripple">
                                                <img className="card-img-top" src={product.image} title={product.title} alt={product.title} height="350px"/>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title  mb-0">{product.title.substring(0,12)}...</h5>
                                                <p className="card-text lead fw-bold">{ FormatCurrency(product.price) }</p>
                                                <NavLink to={`/products/${product.id}`} className="btn btn-outline-primary"> Details </NavLink>
                                            </div>
                                            { product.stoke > 0 ? ( <p className="card-text text-success fw-bold"> In Stock </p> ) :
                                            ( <p className="card-text text-danger fw-bold"> Not Available </p> )}
                                        </div>
                                    </div>
                                
                                </Fragment>
                            )
                        }) 
                    }
                
                </div>
                
            </Fragment>
        );
    };


    return (
       
        <div>

            <div className="container mt-4">

                <div className="row">
                    
                    <div className="col-12 mt-2">

                        <h4 className="me-3 ms-2 mt-3 text-center display-6 fw-bolder">The best choice for you is here</h4>
                        <h3 className="me-2 mt-4 text-center display-6 fw-bolder">Check Our Products</h3>
                    
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

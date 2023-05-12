import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './style/search.css';


const Search = () => {

    const [ products, setProducts ] = useState([]);
    const [ filterData, setFilterData ] = useState([]);
    const [ inputValue, setInputValue ] = useState('');
    const [ navLinkClicked, setNavLinkClicked ] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3030/products')
            .then(response => response.json() )
            .then( data =>{
                console.log(data);
                setFilterData(data) })
            .catch( error => console.log(error) )
    }, [])

    const handleFilterData = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = filterData.filter(product => product.title && product.title.toLowerCase().includes(searchTerm));
        setProducts(filteredProducts);
        setInputValue(searchTerm);
        if (searchTerm === ''){
            setProducts([]);
        }
    }
    
    const clearInputValue = () => {
        setNavLinkClicked(true);
    }

    const resetInputValue = () => {
        setNavLinkClicked(false);
    }

    return (
        <Fragment>
            <div className='position-relative'>
                <form className="d-flex me-4" role="search">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={navLinkClicked ? '' : inputValue} onChange={handleFilterData}/>
                    <button className="btn btn-warning rounded-end" type="button">
                    <i className="fas fa-search"></i>
                    </button>
                </form>
                  


                {products.length > 0 && !navLinkClicked && (
                    <ul className="list-group position-absolute w-100 p-0 mb-1" style={{ top: '100%', zIndex: '1' }}>
                        { products.map( product => (
                            <NavLink to={`/products/${product.id}`} className="list-group-item list-group-item-action" key={product.id} onClick={() => {clearInputValue(); resetInputValue();}}>
                                { product.title.substring(0,30)}...
                            </NavLink>
                        ))}
                    </ul>
                )}
            </div>
        </Fragment>
    );
}

export default Search;

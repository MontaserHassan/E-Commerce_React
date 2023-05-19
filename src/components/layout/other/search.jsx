import React, { useState, useEffect, Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './style/search.css';


const Search = () => {

    const [products, setProducts] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fetch('https://quick-buy-211i.onrender.com/product/')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error));
    }, []);

    const handleFilterData = (event) => {
        setInputValue(event.target.value);
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = products.filter(product => product.title && product.title.toLowerCase().includes(searchTerm));
        setFilterData(filteredProducts);
    }

    const handleNavLinkClick = (productId) => {
        setInputValue('');
        setFilterData([]);
        navigate(`/product/${productId}`);
    }

    return (

        <Fragment>

            <div className='position-relative'>

                <form className="d-flex me-4" role="search">

                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={inputValue} onChange={handleFilterData} />
                    <button className="btn btn-warning rounded-end" type="button"> <i className="fas fa-search"></i> </button>

                </form>

                {filterData.length > 0 && (

                    <ul className="list-group position-absolute w-100 p-0 mb-1" style={{ top: '100%', zIndex: '1' }}>

                        {filterData.map(product => (
                            <a href={`/product/${product.id}`} className="list-group-item list-group-item-action" key={product.id} onClick={() => handleNavLinkClick(product.id)}> {product.title.substring(0, 30)}... </a>
                        ))}

                    </ul>

                )}

            </div>

        </Fragment>

    );

}

export default Search;

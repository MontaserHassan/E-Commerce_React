import React, { useState, useEffect, Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import{useDispatch, useSelector} from "react-redux"
import { addToCart,decreaseCartItems, fetchCartItems} from '../../features/cartSlice';
import { addToWishList } from '../../features/wishlistSlice';
import { FormatCurrency } from '../../features/FormatCurrency';


const Product = () => {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, loading, error , } = userLogin
    
    const dispatch = useDispatch();

    const handleAddToWishlist = (product,userId,useracess) => {
        dispatch(addToWishList([product.id,userId,useracess]))
      };
    const [isWishlists, setIsWishlists] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [wishlist, setWishlist] = useState([]);

    const cartItems = useSelector(state => state.cart.items);

    const handleAddToCart = (product) => {
        const alreadyInCart = cartItems?.find((item) => item.id === product.id);
        if (!alreadyInCart) {
            console.log(product)
            dispatch(addToCart([userInfo.user_id,product]));
            setIsInCart(true);
        }
    };

    useEffect(() => {
        const getProduct = async () => {
            setIsLoading(true);
            const response = await fetch(`https://quick-buy-211i.onrender.com/product/${id}`);
            setProduct(await response.clone().json());
            setIsLoading(false);
        }
        getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const Loading = () => {
        return (
            <Fragment>
                <div className="col-md-6">
                    <Skeleton height={350}/>
                </div>

                <div className="col-md-6" style={{ lineHeight:2 }}>
                    <Skeleton width={350} height={50}/> {/* category */}
                    <Skeleton height={75}/> {/* name */}
                    <Skeleton height={50}/> {/* price */}
                    <Skeleton height={150}/> {/* description */}
                    <Skeleton height={50} width={100}/> {/* btn 1 */}
                    <Skeleton height={50} width={100}/> {/* btn 2 */}
                    <Skeleton height={50} width={100} style={{ marginLeft:6 }}/> {/* btn 3 */}
                </div>

            </Fragment>
        );
    };

  


    const ShowProduct = () => {

        let stockColor = "";

        if (product.stoke >= 5) {
          stockColor = "text-success";
        } else if (product.stoke < 5 && product.stoke > 0) {
          stockColor = "text-warning";
        } else if (product.stoke === 0) {
          stockColor = "text-danger";
        }

        return (
            <Fragment>
                
                <div className="col-md-6">
                    <img src={product.image} alt={product.name} height="400px" width="400px"/>
                </div>

                <div className="col-md-6">

                    <h4 className="text-black-50 text-uppercase">{ product.categories}</h4>
                    <h3 className="display-6">Product Name: { product.name }</h3>
                    <h5 className="fw-bold my-4 display-6">Price: { FormatCurrency(product.price) }</h5>
                    <h5 className={`lead fw-bold my-4 ${stockColor}`}>Available Stock: { product.stoke } piece</h5>
                    <p className="lead">Description: { product.description }</p>

                    {product.stoke === 0 ? (
                        
                        <Fragment>
                        
                            <p className="btn btn-outline-secondary px-4 py-2" disabled> Out of Stock </p>
                            <h6 className="text-secondary fw-bolder text-uppercase">Coming Soon</h6>
                        
                        </Fragment>
                    
                    ) : (
                        <Fragment>

                            {isInCart ? (
                                <button className="btn btn-success px-4 py-2" disabled> In Cart </button>
                            ) : (
                                <button className="btn btn-outline-success px-4 py-2" disabled={ isInCart } 
                                onClick={() => !isInCart && handleAddToCart(product)}> Add To Cart </button>
                            )}

                               <button className="btn btn-outline-success px-4 py-2" onClick={() => dispatch(fetchCartItems(userInfo.user_id))}> go to cart</button>
                            <NavLink to="/cart" className="btn btn-outline-secondary px-4 py-2 ms-3">Go To Cart</NavLink>

                            {!isWishlists && (
                                <button className="btn btn-outline-primary px-4 py-2 ms-3" onClick={() =>
                                     handleAddToWishlist(product,userInfo.user_id,userInfo.access)}> Add To Wishlist </button>
                            )}

                            {isWishlists && (
                                <button className="btn btn-primary px-4 py-2 ms-3" disabled> In Wishlist </button>
                            )}                        
                        </Fragment>
                        
                    )}

                </div>

            </Fragment>
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
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./WishList.css";
import { removeFromWishList, clearWishList, fetchWishListItems } from '../../features/wishlistSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from '../../features/cartSlice';

const WishList = () => {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const wishListItems = useSelector(state => state.wishlist)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [wishListItem, setWishListItem] = useState([]);

  useEffect(() => {
    console.log(userInfo)
    if (userInfo) {
      dispatch(fetchWishListItems(userInfo.user_id))
        .then((action) => {
          console.log(action.payload)
          setWishListItem(action.payload); // Log the data returned by the async thunk
        });
    }
    else {
      navigate('/login')
    }
  }, [dispatch, wishListItems]
  );

  const handleAddToCart = (product) => {
    console.log(product)
    console.log(userInfo.access)
    if (userInfo) {
      dispatch(addToCart([userInfo.user_id, product]));
      dispatch(removeFromWishList([product.id, userInfo.access]))
    }
  }



  const handleRemoving = (wishlistitem, access) => {
    dispatch(removeFromWishList([wishlistitem, access]));
  }

  const handleClearing = (userId, access) => {
    if (userInfo) {
      dispatch(clearWishList([userId, access]));
    }

  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wishListContainer">
      {!wishListItem || wishListItem.length === 0 || !userInfo ? (
        <div class="empty">
          <div className="text">wishList is empty</div>
          <div className="n"><img src="https://www.elitejewelryhouse.com/assets/images/empty-wishlist.png" alt="empty wishList" className="img-fluid" />
          </div>
          <Link to="/" className="text-decoration-none  link" > go to Shopping </Link>
        </div>
      ) : (
        <div className="container mt-5 py-3">
          <table class="table py-3">
            <thead>
              <tr >
                <th scope="col"></th>
                <th scope="col">Img</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>

              {wishListItem.map(item =>
                <tr>
                  <th scope="row pt-5<" className="remove"> <button onClick={() => {
                    handleRemoving(item.id, userInfo.access)
                    dispatch(fetchWishListItems(userInfo.user_id))
                      .then((action) => {
                        console.log(action.payload)
                        setWishListItem(action.payload); // Log the data returned by the async thunk
                      });
                  }}>





                    <FontAwesomeIcon icon={faTimes} /></button></th>
                  <td key={item.id} ><img src={item.image} alt={item.title} className="img-fluid" /></td>
                  <td ><div className="title">{item.name}</div></td>
                  <td ><div className="price">{item.price} $</div></td>
                  <td><button className="btn btn-primary px-4 py-2" onClick={() => {
                    handleAddToCart(item)
                    dispatch(fetchWishListItems(userInfo.user_id))
                      .then((action) => {

                        setWishListItem(action.payload); // Log the data returned by the async thunk
                      });
                  }}> add To Cart </button></td>

                </tr>
              )}
            </tbody>
          </table>
          <div className="links">
            <div className="col-6">
              <button className="btn btn-light my-5 mx-5" onClick={() => {
                handleClearing(userInfo.user_id, userInfo.access);
                dispatch(fetchWishListItems(userInfo.user_id))
                  .then((action) => {
                    setWishListItem(action.payload); // Log the data returned by the async thunk
                  });
              }}>Clear</button>
            </div>
            <div className="home my-5 mx-5">
              <Link to="/" className="text-decoration-none on-hover linklist">Go to Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WishList;
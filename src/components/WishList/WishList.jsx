import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./WishList.css";
import { removeFromWishList, clearWishList, fetchWishListItems } from '../../features/wishlistSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const WishList = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  console.log(userInfo);
  const wishListItems = useSelector(state => state.wishlist);
  const dispatch = useDispatch();
  const [wishListItem, setwishListItem] = useState([]);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchWishListItems(userInfo.user_id))
        .then((action) => {
          console.log(action.payload)
          setwishListItem(action.payload); // Log the data returned by the async thunk
        });
    }
  }, [dispatch, userInfo]);

  const handleRemoving = (wishlistitem, access) => {
    dispatch(removeFromWishList([wishlistitem, access]));
  }

  const handleClearing = (userId, access) => {
    dispatch(clearWishList([userId, access]));
  }

  if (!userInfo) {
    // Handle the case when userInfo is not available
    return <div>Loading...</div>;
  }

  return (
    <div className="wishListContainer">
      {wishListItem.length === 0 ? (
        <div className="empty">
          <div className="text">WishList is empty</div>
          <div className="n">
            <img src="https://www.elitejewelryhouse.com/assets/images/empty-wishlist.png" alt="empty WishList" className="img-fluid" />
          </div>
          <Link to="/" className="text-decoration-none link">Go to Shopping</Link>
        </div>
      ) : (
        <div className="container mt-5 py-3">
          <table className="table py-3">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Img</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {wishListItem.map(item => (
                <tr key={item.id}>
                  <td className="remove">
                    <button onClick={() => {
                      handleRemoving(item.id, userInfo.access);
                      dispatch(fetchWishListItems(userInfo.user_id))
                        .then((action) => {
                          console.log(action.payload)
                          setwishListItem(action.payload); // Log the data returned by the async thunk
                        });
                    }}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </td>
                  <td><img src={item.image} alt={item.title} className="img-fluid" /></td>
                  <td><div className="title">{item.name}</div></td>
                  <td><div className="price">{item.price} $</div></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="links">
            <div className="col-6">
              <button className="btn btn-light my-5 mx-5" onClick={() => {
                handleClearing(userInfo.user_id, userInfo.access);
                dispatch(fetchWishListItems(userInfo.user_id))
                  .then((action) => {
                    setwishListItem(action.payload); // Log the data returned by the async thunk
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

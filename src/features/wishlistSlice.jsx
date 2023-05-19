import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from 'react-redux';
// import {toast} from "react-toastify";
// import { useEffect , useState} from 'react';
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWishListItems = createAsyncThunk(
  "wishList/fetchWishListItems",
  async (userId) => {
    const response = await axios.get(
      `https://quick-buy-211i.onrender.com/wishList/getWishListByUserId/${userId}`
    );

    const promises = response.data.map((item) => {
      return axios
        .get(`https://quick-buy-211i.onrender.com/product/${item.product_id}/`)
        .then((response) => response.data);
    });

    const productData = await Promise.all(promises);
    console.log(productData);
    return productData;
  }
);

const initialState = {
  WishListItems: fetchWishListItems ? fetchWishListItems : [],
  WishListTotalQuantity: 0,
  WishListToalAmount: 0,
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList(state, action) {
      let found = [];
      fetch(
        `https://quick-buy-211i.onrender.com/wishList/getWishListByProductId/${action.payload[0]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: action.payload[2],
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            found = data.filter((item) => {
              return item.user_id === action.payload[1];
            });
            return found.length;
          }
        })
        .then((len) => {
          if (len === 0) {
            fetch("https://quick-buy-211i.onrender.com/wishList/addwishListItem", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: action.payload[2],
              },
              body: JSON.stringify({
                user_id: action.payload[1],
                product_id: action.payload[0],
              }),
            })
              .then((response) => response.json())
              .then((data) => console.log(data, "inserted"))
              .catch((error) => console.error(error, "faild"));
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    },

    removeFromWishList(state, action) {
      console.log(action.payload);

      fetch(
        `https://quick-buy-211i.onrender.com/wishList/getWishListByProductId/${action.payload[0]}`,
        {
          method: "DELETE",
          headers: {
            Authorization: action.payload[1],
          },
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    },

    clearWishList(state, action) {
      console.log(action.payload);

      fetch(
        `https://quick-buy-211i.onrender.com/wishList/getWishListByUserId/${action.payload[0]}`,
        {
          method: "DELETE",
          headers: {
            Authorization: action.payload[1],
          },
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    },
  },
});

export const { addToWishList, removeFromWishList, clearWishList, getData } =
  wishListSlice.actions;
export default wishListSlice.reducer;

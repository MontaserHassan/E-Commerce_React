import {createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {toast} from "react-toastify";
import { useEffect , useState} from 'react';
import axios from "axios"
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchWishListItems = createAsyncThunk(
                            'wishList/fetchWishListItems',
                            async (userId) => {
                            const response = await axios.get(`http://127.0.0.1:8000/wishList/getWishListByUserId/${userId}`);

                            const promises = response.data.map(item => {
                            return axios.get(`http://127.0.0.1:8000/product/${item.product_id}/`)
                            .then(response => response.data);
                            });

                            const productData = await Promise.all(promises);
                                        console.log(productData)
                                        return productData 
                            }
                            );





                            const initialState = {
                            WishListItems: fetchWishListItems?fetchWishListItems:[],
                            WishListTotalQuantity:0,
                            WishListToalAmount:0
                            }

                            const wishListSlice = createSlice({
                            name:"wishList",
                            initialState,
                            reducers:{
                            addToWishList(state,action){

                             console.log(action.payload[1],action.payload[0], action.payload[2])
                            fetch('http://127.0.0.1:8000/wishList/addwishListItem', {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': action.payload[2]
                            },
                            body: JSON.stringify({
                            user_id:action.payload[1],
                            product_id: action.payload[0]
                            })
                            })
                            .then(response => response.json())
                            .then(data => console.log(data,"inserted"))
                            .catch(error => console.error(error,"faild"));
        

        }
       

    ,

    removeFromWishList(state,action){

        console.log(action.payload)

        fetch(`http://127.0.0.1:8000/wishList/getWishListByProductId/${action.payload[0]}`, {
            method: 'DELETE',
            headers: {
              'Authorization':action.payload[1]
            }
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));

    }, clearWishList(state,action){
       
        
        console.log(action.payload)

        fetch(`http://127.0.0.1:8000/wishList/getWishListByUserId/${action.payload[0]}`, {
            method: 'DELETE',
            headers: {
              'Authorization':action.payload[1]
            }
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
        
            }
            
    }
}) 

export const { addToWishList,removeFromWishList,clearWishList,getData}= wishListSlice.actions
export default wishListSlice.reducer

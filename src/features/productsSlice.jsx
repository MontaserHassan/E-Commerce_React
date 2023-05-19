// import React from 'react';
import {createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const  initialState={
    items:[],
    status:null,
    error:null
}
export const productsFetch = createAsyncThunk(
  "product/productsFetch",
  async(id=null, {rejectWithValue}) =>{
    try{
        const response=  await  axios.get("http://127.0.0.1:8000/product/")
        return response?.data 
    }catch(error){
        return rejectWithValue("an error occurred");
    }

}  
)
const productsSlice =createSlice({
    name:'products',
    initialState,
    reducers:{

    },
    extraReducers:{
        [productsFetch.pending]:(state,action)=>{
            state.status="loading"
        },
        [productsFetch.fulfilled]:(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        },
        [productsFetch.rejected]:(state,action)=>{
            state.status="failed"
            state.error=action.payload
        }
    }
      
})
export default productsSlice.reducer;
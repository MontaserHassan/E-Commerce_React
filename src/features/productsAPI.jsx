import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productApi=createApi({
    reducerPath: "productApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://quick-buy-211i.onrender.com"
    }),
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:(id)=>"product/:id",
        }),
    }),
});
export const { useGetAllProductsQuery }= productApi
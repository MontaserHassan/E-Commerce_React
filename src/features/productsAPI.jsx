import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productApi=createApi({
    reducerPath: "productApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://127.0.0.1:8000"
    }),
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:(id)=>"product/:id",
        }),
    }),
});
export const { useGetAllProductsQuery }= productApi
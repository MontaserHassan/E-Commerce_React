import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productApi=createApi({
    reducerPath: "productApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:3030"
    }),
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:(id)=>"products",
        }),
    }),
});
export const { useGetAllProductsQuery }= productApi
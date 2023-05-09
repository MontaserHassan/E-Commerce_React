import {createSlice } from '@reduxjs/toolkit'
import {toast} from "react-toastify";
const  initialState={
    cartItems:
    localStorage.getItem("cartItem")?JSON.parse(localStorage.getItem("cartItems"))
    :[],
    cartTotalQuantity:0,
    cartTotalAmount:0,

}
const cartSlice =createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
           const itemIndex= state.cartItems.findIndex((Item) => Item.id === action.payload.id );
           if(itemIndex>=0){
                          state.cartItems[itemIndex].cartQuantity++;
                          toast.info(`Increased ${state.cartItems[itemIndex].title} quantity`,{
                            position:"bottom-left",
                          } )
                      }else{
                        const tempProduct = {...action.payload,cartQuantity:1};
                        state.cartItems.push(tempProduct);  
                        toast.success(` ${action.payload.title} added to your cart`,{
                            position:"bottom-left",
                          } )
                    }
                  localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        removeFromCart:(state,action)=>{
            state.cartItems.splice(action.payload,1)
        }
    }
})
export const{addToCart,removeFromCart }=cartSlice.actions;
export default cartSlice.reducer;
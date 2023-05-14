import {createSlice } from '@reduxjs/toolkit'
import {toast} from "react-toastify";




const initialState = {
    WishListItems:localStorage.getItem("wishListItems")?JSON.parse(localStorage.getItem("wishListItems"))
    :[],
    WishListTotalQuantity:0,
    WishListToalAmount:0
}

const wishListSlice = createSlice({
    name:"wishList",
    initialState,
    reducers:{
    addToWishList(state,action){
      
        const itemIndex = state.WishListItems.find(item => item.id === action.payload.id)
        if(itemIndex>=0){
       
            state.WishListItems[itemIndex].wishListQuantity += 1;
            toast.info(`${state.WishListItems[itemIndex].name}`+" increased to your wishList",{

                position:"bottom-left"

            })

        }else{
      
            const tempProduct = {...action.payload,wishListQuantity:1}
            state.WishListItems.push(tempProduct)
            toast.success(" added " + `${action.payload.title}`+" To Your WishList",{

                position:"bottom-left"

            })

            localStorage.setItem("wishListItems",JSON.stringify(state.WishListItems))

        }
       

    },

    removeFromWishList(state,action){
const wishListitem = state.WishListItems.filter(
  item => item.id !== action.payload.id
)

state.WishListItems = wishListitem

localStorage.setItem("wishListItems",JSON.stringify(wishListitem))

    }, clearWishList(state,action){
       
        
        state.WishListItems = []
        
        localStorage.setItem("wishListItems",JSON.stringify(state.WishListItems))
        
            }
    }
})
 
export const {addToWishList,removeFromWishList,clearWishList}= wishListSlice.actions
export default wishListSlice.reducer

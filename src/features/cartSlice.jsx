import {createSlice } from '@reduxjs/toolkit'
import {toast} from "react-toastify";


const  initialState={
    cartItems:
    localStorage.getItem("cartItem")?JSON.parse(localStorage.getItem("cartItems"))
    :[],
    cartTotalQuantity:0,
    cartTotalAmount:0,

}
const cartSlice =createSlice(
  {
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
           state.cartTotalAmount = state.cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0);
           const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
          if (itemIndex >= 0) {
            if (state.cartItems[itemIndex].cartQuantity >= action.payload.stoke) {
              toast.error(`Sorry, there are only ${action.payload.stoke} available in stock.`,{
                position:"top-center",
              } )
            } else {
              state.cartItems[itemIndex].cartQuantity++;
              toast.info(`Increased ${state.cartItems[itemIndex].title} quantity`, {
                position: "bottom-left",
              });
            }
          } else {
            const tempProduct = { ...action.payload, cartQuantity: 1 };
            state.cartItems.push(tempProduct);
            toast.success(` ${action.payload.title.substring(0,30)}... added to your cart`, {
              position: "bottom-left",
            });
          }
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          // Dispatch the getTotal action after adding the item to the cart
          state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.cartQuantity, 0);
          state.cartTotalAmount = state.cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0);

},

        removeFromCart:(state,action)=>{
         const nextCartItem= state.cartItems.filter(
            (cartItem) => cartItem.id!== action.payload.id
          )
        state.cartItems=nextCartItem
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        toast.error(` ${action.payload.title.substring(0,30)}... removed from your cart`,{
                  position:"bottom-left",
                } );
              },

        decreaseCartItems:(state,action)=>{
          const itemIndex= state.cartItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
          )
          if(state.cartItems[itemIndex].cartQuantity>1){
            state.cartItems[itemIndex].cartQuantity--;
            toast.info(
              `Decreased
               ${state.cartItems[itemIndex].title.substring(0,30)}... 
               quantity`
              ,{
              position:"bottom-left",
            } )
          }else if( state.cartItems[itemIndex].cartQuantity===1){
            const nextCartItem= state.cartItems.filter(
              (cartItem) => cartItem.id!== action.payload.id
            )
          state.cartItems=nextCartItem
          toast.error(` ${action.payload.title.substring(0,30)}... removed from your cart`,{
                    position:"bottom-left",
                  } );
        }
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        
        clearCart:(state,action)=>{
          state.cartItems=[]
          toast.success("Your cart has been cleared",{
                position:"bottom-left",
              } );
              localStorage.removeItem("cartItems")
        },
         getTotal:(state,action)=>{
           let{total,quantity}= state.cartItems.reduce((cartTotal,cartItem)=>{
            const{price,cartQuantity}=cartItem;
            const itemTotal=price*cartQuantity;

            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;
            return cartTotal;
          },{
            total:0,
            quantity:0,
          }
          )
          state.cartTotalQuantity=quantity
          state.cartTotalAmount=total
             },


          

    }
    
}


)
export const{addToCart,removeFromCart,decreaseCartItems,clearCart,getTotal }=cartSlice.actions;
export default cartSlice.reducer;
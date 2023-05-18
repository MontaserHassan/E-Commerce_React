import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';






export const fetchCartItems = createAsyncThunk(
  'cart/fetchCertItems',
  async (data) => {  
  let response = await axios.get(`http://127.0.0.1:8000/cart/getCartItemsByUserId/${data[0]}`);
  console.log("Check if Cart exist ",response.data)
  console.log("Show function Data" ,data[1],data[0])

  if (response.data === 'notfound'){
    console.log("hello")
    response = await axios.post('http://127.0.0.1:8000/cart/addToCart',{user:data[0]}) 
    response = response.data
    console.log("Check if Cart has been created ",response.data.id)
    console.log("Show Cart Id" ,response.data.id)
  }
  console.log("Show Cart Id" ,response.data.id)
  console.log(`http://127.0.0.1:8000/cart/getCartItemsByProductId/${data[1].id}/${response.data.id}/`)
  let res= await axios.get(`http://127.0.0.1:8000/cart/getCartItemsByProductId/${data[1].id}/${response.data.id}/`);
  console.log("Check if this cart Item exists",res.data)
  if (res.data === 'notfound'){

  const response2 = await axios.post('http://127.0.0.1:8000/cart/addToCartItems',
  {cart:response.data.id,product:data[1].id,quantity:1}) 
  console.log("Check if cart Item Created" , data[1].id,response2.data)

  toast.success(`Added  this product to cart`, {
    position: 'bottom-left',
  });
  }
  else{
    const quantity = res.data.quantity+1
    if(data[1].stoke >= quantity){
      const increase = await axios.put(`http://127.0.0.1:8000/cart/getCartItemsById/${res.data.id}`,{quantity:quantity})
      console.log(increase.data.quantity)
      ;toast.info(`want to increase  this product `, {
      position: 'bottom-left',
    });
    }
    
    
    
  }

  const productData = await Promise.all();
              console.log(productData)
              return productData 
  }
  );

const initialState = {
  WishListItems: fetchCartItems?fetchCartItems:[],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
    addToCart: (state, action) => {
   
    },





    removeFromCart: (state, action) => {
      const nextCartItem = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id);
      state.cartItems = nextCartItem;
      axios.delete(`http://127.0.0.1:8000/cart/getCartItemsById/${action.payload.id}/`)
        .then(response => {
          toast.error(` ${action.payload.name} removed from your cart`, {
            position: 'bottom-left',
          });
        })
        .catch(error => {
          console.log(error);
          toast.error('An error occurred while removing the item from your cart.', {
            position: 'bottom-left',
          });
        });
    },


    decreaseCartItems: (state, action) => {
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === action.payload.id);
      if (state.cartItems[itemIndex].quantity > 1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[itemIndex] = { ...updatedCartItems[itemIndex], quantity: updatedCartItems[itemIndex].quantity - 1 };
        state.cartItems = updatedCartItems;
        toast.info(`Decreased ${updatedCartItems[itemIndex].product.name} quantity`, {
          position: 'bottom-left',
        });
        axios.put(`http://127.0.0.1:8000/cart/getCartItemsById/${action.payload.id}/`, { quantity: updatedCartItems[itemIndex].quantity })
          .catch(error => {
            console.log(error);
            toast.error('An error occurred while updating the quantity of the item in your cart.', {
              position: 'bottom-left',
            });
          });
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItem = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id);
        state.cartItems = nextCartItem;
        axios.delete(`http://127.0.0.1:8000/cart/getCartItemsById/${action.payload.id}/`)
          .then(response => {
            toast.error(` ${action.payload.name} removed from your cart`, {
              position: 'bottom-left',
            });
          })
          .catch(error => {
            console.log(error);
            toast.error('An error occurred while removing the item from your cart.', {
              position: 'bottom-left',
            });
          });
      }
    },


    clearCart: (state, action) => {
      state.cartItems = [];
      axios.delete('http://127.0.0.1:8000/cart/CartItems')
        .then(response => {
          toast.success('Your cart has been cleared', {
            position: 'bottom-left',
          });
        })
        .catch(error => {
          console.log(error);
          toast.error('An error occurred while clearing your cart.', {
            position: 'bottom-left',
          });
        });
    },
    getCartItemsSuccess: (state, action) => {
      state.cartItems = action.payload;
    },

    getCartItemsFailure: (state, action) => {
      console.log(action.payload);
    },
    // getTotal: (state, action) => {
    //   let { total, quantity } = state.cartItems.reduce(
    //     (cartTotal, cartItem) => {
    //       const { price, cartQuantity } = cartItem.product;
    //       const itemTotal = price * cartQuantity;

    //       cartTotal.total += itemTotal;
    //       cartTotal.quantity += cartQuantity;
    //       return cartTotal;
    //     },
    //     {
    //       total: 0,
    //       quantity: 0,
    //     }
    //   );
    //   state.cartTotalQuantity = quantity;
    //   state.cartTotalAmount = total;
    // },
  },
});

export const { addToCart, removeFromCart, decreaseCartItems, clearCart, getCartItemsSuccess, getCartItemsFailure } = cartSlice.actions;


export default cartSlice.reducer;

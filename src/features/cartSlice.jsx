import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState = {
  cartItems: sessionStorage.getItem('cartItems') ? JSON.parse(sessionStorage.getItem('cartItems')) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        const currentQuantity = state.cartItems[itemIndex].quantity;
        if (currentQuantity >= action.payload.product.stoke) {
          toast.error(`Sorry, there are only ${action.payload.product.stoke} available in stock.`, {
            position: 'top-center',
          });
        } else {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[itemIndex] = { ...updatedCartItems[itemIndex], quantity: currentQuantity + 1 };
          state.cartItems = updatedCartItems;
          toast.info(`Increased ${updatedCartItems[itemIndex].product.name} quantity`, {
            position: 'bottom-left',
          });
        }
      } else {
        axios.post('http://127.0.0.1:8000/cart/addToCartItems', { product_id: action.payload.product.id, quantity: 1 })
          .then(response => {
            state.cartItems.product.push(response.data);
            toast.success(` ${action.payload.product.name} added to your cart`, {
              position: 'bottom-left',
            });
          })
          .catch(error => {
            console.log(error);
            toast.error('An error occurred while adding the item to your cart.', {
              position: 'bottom-left',
            });
          });
      }
      // calculate total amount
  // const cartTotalAmount = state.cartItems.reduce((total, item) => {
  //   return total + (item.quantity * item.product.price);
  // }, 0);

  // // update state with new cart total amount
  // state.cartTotalAmount = cartTotalAmount;
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
    getTotal: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem.product;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

// export const { addToCart, removeFromCart, decreaseCartItems, clearCart, getTotal } = cartSlice.actions;
export const { addToCart, removeFromCart, decreaseCartItems, clearCart, getCartItemsSuccess, getCartItemsFailure,getTotal } = cartSlice.actions;

export const fetchCartItems = () => (dispatch) => {
  axios.get('http://127.0.0.1:8000/cart/CartItems')
    .then(response => {
      dispatch(getCartItemsSuccess(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(getCartItemsFailure(error));
    });
};
export default cartSlice.reducer;

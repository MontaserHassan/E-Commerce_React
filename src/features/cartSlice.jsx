import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk("cart/addToCart", async (data) => {

  console.log(data[0])
  let response = await axios.get(
    `https://quick-buy-211i.onrender.com/cart/getCartItemsByUserId/${data[0]}`
  );
  console.log("this is cart user's id",response.data)
  if (response.data === "notfound") {
    response = await axios.post("https://quick-buy-211i.onrender.com/cart/addToCart", {
      user: data[0],
    });
    response = response.data;
    console.log("this user id",data[0])
  }

  let res = await axios.get(
    `https://quick-buy-211i.onrender.com/cart/getCartItemsByProductId/${data[1].id}/${response.data[0].id}/`
  );
  console.log("this is cart",res)

  if (res.data === "notfound") {
    console.log(response.data[0].id, data[1].id)
    await axios.post("https://quick-buy-211i.onrender.com/cart/addToCartItems", {
      cart: response.data[0].id,
      product: data[1].id,
      quantity: 1,
    })
    
    toast.success(`Added   ${data[1].name} to cart`, {
      position: "bottom-left",
    });
    
  } else {
    const quantity = res.data.quantity + 1;
    if (data[1].stoke >= quantity) {
      await axios.put(
        `https://quick-buy-211i.onrender.com/cart/getCartItemsById/${res.data.id}`,
        { quantity: quantity }
      );
      toast.info(`increasing  ${data[1].name} Quantity `, {
        position: "bottom-left",
      });
    } else {
      toast.error(`Maximum stock limit reached for ${data[1].name}`, {
        position: "top-center",
      });
    }
  }
  
});


export const decreaseCartItems = createAsyncThunk(
  "cart/decreaseCartItems",
  async (data) => {
    
    
    let quantity = data[1].quantity

    if (1< quantity) {
      console.log(`${data[1].cart}`)
        quantity--
       


     const items = await axios.put(`https://quick-buy-211i.onrender.com/cart/getCartItemsById/${data[1].id}`,
        { quantity: quantity }
      );

      console.log(items)
      toast.info(`decreasing  ${data[1].name} Quantity `, {
        position: "bottom-left",
      });
    } else if (1 === quantity) {
      console.log()
      await axios.delete(
        `https://quick-buy-211i.onrender.com/cart/getCartItemsById/${data[1].cart}`
      );
      toast.error(`deleted  ${data[1].name} from cart `, {
        position: "bottom-left",
      });
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (data) => {
  console.log(data)
  console.log( `https://quick-buy-211i.onrender.com/cart/getCartItemsById/${data.id}`)
    await axios.delete(
      `https://quick-buy-211i.onrender.com/cart/getCartItemsById/${data.id}`
    );
    toast.error(`deleted  ${data[1].name} from cart `, {
      position: "bottom-left",
    });
  }
);

export const clearCartItems = createAsyncThunk(
  "cart/clearCartItems",
  async (data) => {

  }
);


export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (cartdata,{ getState, dispatch }) => {

   
    let response = await axios.get(
      `https://quick-buy-211i.onrender.com/cart/getCartItemsByUserId/${cartdata}` )
     
 
      if (response.data ==="notfound"){
         return [];
     }else{
     
      let cartItems = await axios.get(
        `https://quick-buy-211i.onrender.com/cart/getCartItemsByCartId/${response.data[0].id}`    
      )

     const  cartItemsProducts = cartItems.data.map((item) => {
      return axios.get(`https://quick-buy-211i.onrender.com/product/${item.product}`)
    });


    const productData = await Promise.all(cartItemsProducts);
    const finalData = cartItems.data.map((item) => {
    
    item.product = productData[cartItems.data.indexOf(item)].data
    return item

    });
          // calculate total quantity and amount
          const cartTotalQuantity = finalData.reduce(
            (total, item) => total + item.quantity,
            0
          );
          const cartTotalAmount = finalData.reduce(
            (total, item) => total + item.quantity * item.product.price,
            0
          );
               // dispatch action to update state with cart totals
      dispatch(setCartTotals(cartTotalQuantity, cartTotalAmount));
    finalData.sort((a, b) => {
      return a.id - b.id; 
    });
    return finalData;
  }}
 );

 export const setCartTotals = (quantity, amount) => {
  return {
    type: "cart/setCartTotals",
    payload: {
      cartTotalQuantity: quantity,
      cartTotalAmount: amount,
    },
  };
};
const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartTotals: (state, action) => {
      state.cartTotalQuantity = action.payload.cartTotalQuantity;
      state.cartTotalAmount = action.payload.cartTotalAmount;
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      axios
        .delete("https://quick-buy-211i.onrender.com/cart/CartItems")
        .then((response) => {
          toast.success("Your cart has been cleared", {
            position: "bottom-left",
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("An error occurred while clearing your cart.", {
            position: "bottom-left",
          });
        });
    },
    getCartItemsSuccess: (state, action) => {
      state.cartItems = action.payload;
    },

    getCartItemsFailure: (state, action) => {
      console.log(action.payload);
    },

  },
});

export const {
  // removeFromCart,
  clearCart,
  getCartItemsSuccess,
  getCartItemsFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
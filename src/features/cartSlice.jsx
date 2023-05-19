import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk("cart/addToCart", async (data) => {
  let response = await axios.get(
    `https://quick-buy-211i.onrender.com/cart/getCartItemsByUserId/${data[0]}`
  );
  console.log("this is cart items",response.data)
  if (response.data === "notfound") {
    response = await axios.post("https://quick-buy-211i.onrender.com/cart/addToCart", {
      user: data[0],
    });
    response = response.data;
  }
  let res = await axios.get(
    `https://quick-buy-211i.onrender.com/cart/getCartItemsByProductId/${data[1].id}/${response.data.id}/`
  );
  console.log("this is cart",res.data)

  if (res.data === "notfound") {
    await axios.post("https://quick-buy-211i.onrender.com/cart/addToCartItems", {
      cart: response.data.id,
      product: data[1].id,
      quantity: 1,
    });
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
    let response = await axios.get(
      `https://quick-buy-211i.onrender.com/cart/getCartItemsByUserId/${data[0]}`
    );
    let res = await axios.get(
      `https://quick-buy-211i.onrender.com/cart/getCartItemsByProductId/${data[1].id}/${response.data.id}/`
    );
    const quantity = res.data.quantity - 1;
    if (1 < quantity) {
      await axios.put(
        `https://quick-buy-211i.onrender.com/cart/getCartItemsById/${res.data.id}`,
        { quantity: quantity }
      );
      toast.info(`decreasing  ${data[1].name} Quantity `, {
        position: "bottom-left",
      });
    } else if (1 === quantity) {
      await axios.delete(
        `https://quick-buy-211i.onrender.com/cart/getCartItemsById/${res.data.id}`
      );
      toast.error(`deleted  ${data[1].name} from cart `, {
        position: "bottom-left",
      });
    }
  }
);

export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems",
  async (data) => {
    let response = await axios.get(
      `https://quick-buy-211i.onrender.com/cart/getCartItemsByUserId/${data[0]}`
    );
    let res = await axios.get(
      `https://quick-buy-211i.onrender.com/cart/getCartItemsByProductId/${data[1].id}/${response.data.id}/`
    );
    await axios.delete(
      `https://quick-buy-211i.onrender.com/cart/getCartItemsById/${res.data.id}`
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
  async (cartdata) => {
    
    let response = await axios.get(
      `https://quick-buy-211i.onrender.com/cart/getCartItemsByUserId/${cartdata}` )
       

      if (response.data ==="notfound"){
        console.log("not")
         return [];
     }else{

      let cartItems = await axios.get(
        `https://quick-buy-211i.onrender.com/cart/getCartItemsByCartId/${response.data.id}`    
      )

      console.log(cartItems.data)

     const  cartItemsProducts = cartItems.data.map((item) => {
      console.log(item.product)
      return axios.get(`https://quick-buy-211i.onrender.com/product/${item.product}`)
    });


    const productData = await Promise.all(cartItemsProducts);
    const finalData = cartItems.data.map((item) => {
    
    item.product = productData[cartItems.data.indexOf(item)].data
    return item

    })
    console.log(finalData)
    return finalData;}}
 ) 
;

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
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

export const {
  removeFromCart,
  clearCart,
  getCartItemsSuccess,
  getCartItemsFailure,
} = cartSlice.actions;

export default cartSlice.reducer;

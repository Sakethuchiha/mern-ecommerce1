import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartItems: [],
  status: 'idle',
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (token) => {
  const response = await axios.get('http://localhost:5010/api/cart', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ product, qty, token }, { getState }) => {
    await axios.post(
      'http://localhost:5010/api/cart/item',
      {
        productId: product._id,
        qty,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // Return updated cart from backend
    const response = await axios.get('http://localhost:5010/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const updateCartQty = createAsyncThunk(
  'cart/updateCartQty',
  async ({ productId, qty, token }) => {
    await axios.post(
      'http://localhost:5010/api/cart/item',
      { productId, qty },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const response = await axios.get('http://localhost:5010/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ productId, token }) => {
    await axios.delete(`http://localhost:5010/api/cart/item/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await axios.get('http://localhost:5010/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state) {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(updateCartQty.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

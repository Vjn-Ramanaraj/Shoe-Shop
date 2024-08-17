
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../Model/model';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.product.id && item.selectedSize === action.payload.selectedSize
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; selectedSize: string }>) => {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.id && item.selectedSize === action.payload.selectedSize
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            item => !(item.product.id === action.payload.id && item.selectedSize === action.payload.selectedSize)
          );
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

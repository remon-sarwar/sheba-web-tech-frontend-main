import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  cart: Record<string, string | number>[];
  isCartOpen: boolean;
}

const initialState: CartState = {
  cart: [],
  isCartOpen: false
};

// for internal usage
function saveToLocalStorage(cart: Record<string, string | number>[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem, removeItem, updateQuantity -> notnow
    addItem: (
      state,
      action: PayloadAction<Record<string, string | number>>
    ) => {
      state.cart = [...state.cart, action.payload];
      saveToLocalStorage(state.cart);
    },
    removeItem: (state, action: PayloadAction<string | number>) => {
      const productId = Number(action.payload);
      const newList = state.cart.filter(item => item.id !== productId);
      state.cart = newList;
      saveToLocalStorage(state.cart);
    },
    initCart: state => {
      const lsCart = localStorage.getItem('cart') || '[]';
      state.cart = JSON.parse(lsCart);
    },
    clear: state => {
      state.cart = [];
      saveToLocalStorage([]);
    },
    openCart: state => {
      state.isCartOpen = true;
    },
    closeCart: state => {
      state.isCartOpen = false;
    }
  }
});

export const { addItem, removeItem, initCart, clear, openCart, closeCart } =
  cartSlice.actions;
export default cartSlice.reducer;

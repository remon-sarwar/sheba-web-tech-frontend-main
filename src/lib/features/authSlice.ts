import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// define interface
export interface AuthState {
  authenticated: boolean;
  user: IAuthUser;
}

export interface IAuthUser {
  role: string;
  email: string;
  name: string;
}

// define initial state
const initialState: AuthState = {
  authenticated: false,
  user: {
    role: '',
    email: '',
    name: ''
  }
};

// create slice and define reducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    setAuthUser: (state, action: PayloadAction<IAuthUser>) => {
      state.user = action.payload;
    }
  }
});

// export
export const { setAuth, setAuthUser } = authSlice.actions;
export default authSlice.reducer;

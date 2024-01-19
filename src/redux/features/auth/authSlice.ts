import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { User } from '@/types';

// ----------------------------------------------------------------------

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logOut: () => initialState,
  },
});

export default authSlice.reducer;

export const { setUser, logOut } = authSlice.actions;

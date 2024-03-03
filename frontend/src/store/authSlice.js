import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.isLoading = false;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.isLoading = false;
    },
    updateUser: (state, action) => {
      state.userData = action.payload.userData;
    },
    setLoadingFalse: (state) => {
      state.isLoading = false;
    },
  },
});

export const { login, logout, updateUser, setLoadingFalse } = authSlice.actions;
export default authSlice.reducer;

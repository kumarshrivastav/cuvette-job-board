import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: null,
  posts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegisterStart: (state) => {
      state.loading = true;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    createPostStart: (state, action) => {
      state.loading = true;
    },
    createPostSuccess: (state, action) => {
      state.loading = false;
      state.posts?.push(action.payload);
    },
    createPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllPosts: (state,action) => {
      state.posts = [];
    },
    userRegisterSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    userRegisterFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    userEmailVerificationStart: (state) => {
      state.loading = true;
    },
    userEmailVerificationSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userEmailVerificationFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    userPhoneVerificationStart: (state) => {
      state.loading = true;
    },
    userPhoneVerificationSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userPhoneVerificationFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    userSignOutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = null;
    },
  },
});

export const {
  userRegisterFailure,
  userRegisterSuccess,
  userRegisterStart,
  userSignOutSuccess,
  userEmailVerificationFailure,
  userEmailVerificationStart,
  userEmailVerificationSuccess,
  userPhoneVerificationFailure,
  userPhoneVerificationStart,
  userPhoneVerificationSuccess,
  setAuthenticated,
  createPostFailure,
  clearAllPosts,
  createPostStart,
  createPostSuccess,
} = userSlice.actions;
export default userSlice.reducer;

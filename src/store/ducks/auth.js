import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../../services/auth';

const INICIAL_STATE = {
  loading: false,
  succes: null,
  error: null,
  originalError: null,
  checked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INICIAL_STATE,
  reducers: {
    authRequest(state, action) {
      logout();
      state.loading = false;
    },
    authSuccess(state, action) {
      login(action.payload);
      state.loading = false;
      state.error = null;
      state.success = action.payload;
    },
    authFailure(state, action) {
      state.error = action.payload.error;
      state.originalError = action.payload.originalError;
      state.loading = false;
    },
    logoutAuth(state) {
      logout();
      state = INICIAL_STATE;
    },
    userVerifyToken(state) {
      state.loading = true;
    },
    userVerifyTokenSuccess(state, action) {
      state = { ...INICIAL_STATE };
      state.checked = action.payload.id;
    },
    userVerifyTokenFailure(state, action) {
      state.error = action.payload.error;
      state.originalError = action.payload.originalError;
      state.loading = false;
    },
    resetPassword(state) {
      state = { ...INICIAL_STATE };
      state.loading = true;
    },
    resetPasswordSuccess(state) {
      state = { ...INICIAL_STATE };
    },
    resetPasswordFailure(state, action) {
      state.error = action.payload.error;
      state.originalError = action.payload.originalError;
      state.loading = false;
    },
  },
});

export const {
  authFailure,
  authRequest,
  authSuccess,
  logoutAuth,
  resetPassword,
  resetPasswordFailure,
  resetPasswordSuccess,
  userVerifyToken,
  userVerifyTokenFailure,
  userVerifyTokenSuccess,
} = authSlice.actions;

export default authSlice.reducer;

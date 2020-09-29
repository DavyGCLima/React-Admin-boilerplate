import { createSlice } from '@reduxjs/toolkit';
import User from '../../models/User';

const INICIAL_STATE = {
  user: User(),
  userManufacturer: User(),
  loading: false,
  saved: false,
  error: null,
  originalError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INICIAL_STATE,
  reducers: {
    addUserRequest(state) {
      state.loading = false;
      state.saved = false;
    },
    addUserSuccess(state, action) {
      state.loading = false;
      state.user = User(action.payload.data);
      state.error = null;
      state.originalError = null;
    },
    addUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.originalError = action.payload.originalError;
    },

    findUserRequest(state) {
      state.loading = false;
      state.saved = false;
    },
    findUserSuccess(state, action) {
      state.loading = false;
      state.user = User(action.payload);
      state.error = null;
      state.originalError = null;
    },
    findUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.originalError = action.payload.originalError;
    },

    updateUserRequest(state) {
      state.loading = false;
      state.saved = false;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.saved = true;
      state.user = User(action.payload.data);
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.originalError = action.payload.originalError;
    },

    deleteUser(state) {
      state = INICIAL_STATE;
    },

    addUserManufacturerRequest(state) {
      state.loading = false;
      state.saved = false;
    },
    addUserManufacturerSuccess(state) {
      state.loading = false;
      state.saved = true;
    },
    addUserManufacturerFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.originalError = action.payload.originalError;
    },

    updateUserManufacturerRequest(state) {
      state.loading = false;
      state.saved = false;
    },
    updateUserManufacturerSuccess(state) {
      state.loading = false;
      state.saved = false;
    },
    updateUserManufacturerFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.originalError = action.payload.originalError;
    },

    findUserByManufacturerRequest(state) {
      state.loading = false;
      state.saved = false;
    },
    findUserByManufacturerSuccess(state, action) {
      state.loading = false;
      state.userManufacturer = User(action.payload.data);
    },
    findUserByManufacturerFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.originalError = action.payload.originalError;
    },

    updateUserPasswordRequest(state) {
      state.loading = false;
      state.saved = false;
    },
    updateUserPasswordSuccess(state) {
      state.saved = true;
    },
    updateUserPasswordFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.originalError = action.payload.originalError;
    },
  },
});

export const {
  addUserRequest,
  addUserFailure,
  addUserManufacturerFailure,
  addUserManufacturerRequest,
  addUserManufacturerSuccess,
  addUserSuccess,
  findUserRequest,
  findUserFailure,
  findUserSuccess,
  deleteUser,
  findUserByManufacturerFailure,
  findUserByManufacturerRequest,
  findUserByManufacturerSuccess,
  updateUserFailure,
  updateUserManufacturerFailure,
  updateUserManufacturerRequest,
  updateUserManufacturerSuccess,
  updateUserPasswordFailure,
  updateUserPasswordRequest,
  updateUserPasswordSuccess,
  updateUserRequest,
  updateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;

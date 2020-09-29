import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  visible: false,
  message: null,
  originalError: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState: INITIAL_STATE,
  reducers: {
    setError(state, action) {
      state.visible = true;
      state.message = action.payload.message;
      state.originalError = action.payload.originalError;
    },
    clearError(state) {
      state = INITIAL_STATE;
    },

    hideError(state) {
      state.visible = false;
    },
  },
});

export const { clearError, hideError, setError } = errorSlice.actions;

export default errorSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

/**
 * =====================================================================================================================
 * Reducers
 * =====================================================================================================================
 */
const INICIAL_STATE = {
  products: [],
  loading: false,
  error: null,
  originalError: null,
  deleted: null,
  saved: null,
  uploadeds: [],
};

function setError(state, action) {
  state.error = action.payload.error;
  state.originalError = action.payload.originalError;
  state.loading = false;
  return state;
}

/**
 * =====================================================================================================================
 * Actions
 * =====================================================================================================================
 */
const productSlice = createSlice({
  name: 'products',
  initialState: INICIAL_STATE,
  reducers: {
    listProductsRquest(state) {
      state.loading = true;
    },
    listProductsSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.products = [...action.payload];
    },
    listProductsFailure(state, action) {
      state = setError(state, action);
    },

    saveProductRequest(state) {
      state.loading = true;
    },
    saveProductSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.saved = action.payload;
      state.products = [...state.products, action.payload];
    },
    saveProductFailure(state, action) {
      state = setError(state, action);
    },

    updateProductRequest(state) {
      state.loading = true;
    },
    updateProductSuccess(state, action) {
      const exists = state.products.find(
        (product) => product.id === action.payload.product.id
      );
      const copy = state.products;
      copy[state.products.indexOf(exists)] = action.payload.product;
      state.loading = false;
      state.error = null;
      state.saved = action.payload.product;
      state.products = copy;
    },
    updateProductFailure(state, action) {
      state = setError(state, action);
    },

    deleteProductRequest(state) {
      state.loading = true;
    },
    deleteProductSuccess(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.finish = true;
      state.loading = false;
      state.error = null;
      state.deleted = action.payload.id;
    },
    deleteProductFailure(state, action) {
      state = setError(state, action);
    },

    uploadCVSRequest(state) {
      state.loading = true;
    },
    uploadCVSSuccess(state, action) {
      state.loading = false;
      state.uploadeds = action.payload.uploaded;
    },
    uploadCVSFailure(state, action) {
      state = setError(state, action);
    },

    setProductLoading(state, action) {
      state.loading = action.payload;
    },

    setProductError(state, action) {
      state = setError(state, action);
    },

    setProductUploadeds(state, action) {
      state.loading = false;
      state.uploadeds = [...action.payload];
    },
  },
});

export const {
  deleteProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  listProductsFailure,
  listProductsRquest,
  listProductsSuccess,
  saveProductFailure,
  saveProductRequest,
  saveProductSuccess,
  setProductError,
  setProductLoading,
  setProductUploadeds,
  updateProductFailure,
  updateProductRequest,
  updateProductSuccess,
  uploadCVSFailure,
  uploadCVSRequest,
  uploadCVSSuccess,
} = productSlice.actions;

export default productSlice.reducer;

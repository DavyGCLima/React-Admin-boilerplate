import { all, takeLatest } from 'redux-saga/effects';

import {
  authRequest as authRequestAction,
  resetPassword as resetpasswordAction,
  userVerifyToken as userVerifyTokenAction,
} from '../ducks/auth';
import { authRequest, resetPassword, userVrifyToken } from './auth';

import {
  updateUserPasswordRequest as updateUserPasswordAction,
  findUserRequest,
  updateUserPasswordRequest,
  updateUserRequest,
  findUserByManufacturerRequest,
  updateUserManufacturerRequest,
  addUserManufacturerRequest,
} from '../ducks/user';
import {
  fetchUser,
  updateUser,
  findUserByManbufacturer,
  updateUserManufacturer,
  addUserManufacturer,
  updateUserPassword,
} from './user';

import {
  saveProductRequest,
  updateProductRequest,
  listProductsRquest,
  deleteProductRequest,
  uploadCVSRequest
} from '../ducks/products';
import {
  saveProduct,
  updateProduct,
  listProduct,
  deleteProduct,
  uploadCSV,
} from './products';

export default function* rootSaga() {
  yield all([
    takeLatest(authRequestAction.type, authRequest),
    takeLatest(resetpasswordAction.type, resetPassword),
    takeLatest(userVerifyTokenAction.type, userVrifyToken),

    takeLatest(updateUserPasswordAction.type, updateUserPassword),
    takeLatest(findUserRequest.type, fetchUser),
    takeLatest(updateUserPasswordRequest.type, updateUserPassword),
    takeLatest(updateUserRequest.type, updateUser),
    takeLatest(findUserByManufacturerRequest.type, findUserByManbufacturer),
    takeLatest(updateUserManufacturerRequest.type, updateUserManufacturer),
    takeLatest(addUserManufacturerRequest.type, addUserManufacturer),

    takeLatest(saveProductRequest.type, saveProduct),
    takeLatest(updateProductRequest.type, updateProduct),
    takeLatest(listProductsRquest.type, listProduct),
    takeLatest(deleteProductRequest.type, deleteProduct),
    takeLatest(uploadCVSRequest.type, uploadCSV),
  ]);
}

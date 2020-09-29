import { call, put } from 'redux-saga/effects';
import client from '../../services';

import {
  updateUserFailure,
  updateUserSuccess,
  findUserSuccess,
  findUserFailure,
  updateUserPasswordFailure,
  updateUserPasswordSuccess,
  updateUserManufacturerFailure,
  addUserManufacturerSuccess,
  addUserManufacturerFailure,
  findUserByManufacturerFailure,
  findUserByManufacturerSuccess,
} from '../ducks/user';
import User from '../../models/User';

import { setError, clearError } from '../ducks/error';

import { HandleError } from '../Errors/UserManufacturer';

import { login, logout } from '../../services/auth';

/**
 * Fetch the user from API based on the token
 * @param {String} payload.token
 */
export function* fetchUser({ payload }) {
  try {
    const { errors, data } = yield call(client.userVerifyToken, payload);

    if (errors) {
      logout();
      yield put(
        findUserFailure({
          error: 'Authentication failed',
          originalError: errors,
        })
      );
      yield put(
        setError({ error: 'Authentication failed', originalError: errors })
      );
    } else {
      yield put(findUserSuccess({ ...data.userVerifyToken }));
      yield put(clearError());
    }
  } catch (err) {
    logout();
    yield put(
      findUserFailure({
        error: 'Failed request, find current user',
        originalError: err,
      })
    );
    yield put(
      setError({
        error: 'Failed request, find current user',
        originalError: err,
      })
    );
  }
}

/**
 * Saga to update the User
 * @param {User} payload.user
 */
export function* updateUser({ payload: { user } }) {
  try {
    const { errors, data } = yield call(client.updateUser, user);

    if (errors) {
      yield put(
        updateUserFailure({
          error: 'Fail on update user',
          originalError: errors,
        })
      );
      yield put(
        setError({ error: 'Fail on update user', originalError: errors })
      );
    } else {
      yield put(updateUserSuccess({ ...data.updateUser }));
      yield put(clearError());
    }
  } catch (err) {
    yield put(
      updateUserFailure({
        error: 'Failed request, update User',
        originalError: err,
      })
    );
    yield put(
      setError({ error: 'Failed request, update User', originalError: err })
    );
  }
}

export function* updateUserPassword({ payload: { password, token } }) {
  try {
    logout();
    login(token);
    const { errors, data } = yield call(client.updateUserPassword, password);
    logout();

    if (errors) {
      yield put(
        updateUserPasswordFailure({
          error: 'Fail on update user password',
          originalError: errors,
        })
      );
      yield put(
        setError({
          error: 'Fail on update user password',
          originalError: errors,
        })
      );
    } else {
      yield put(updateUserPasswordSuccess({ ...data.updateUserPassword }));
      yield put(clearError());
    }
  } catch (err) {
    yield put(
      updateUserPasswordFailure({
        error: 'Failed request, update User password',
        originalError: err,
      })
    );
    yield put(
      setError({
        error: 'Failed request, update User password',
        originalError: err,
      })
    );
  }
}

export function* updateUserManufacturer({ payload: { manufacturer, user } }) {
  try {
    const { errors } = yield call(
      client.editUserWithManufacturer,
      manufacturer,
      user
    );

    if (errors) {
      yield put(
        updateUserManufacturerFailure({
          error: 'Fail to update User Manufacturer',
          originalError: errors,
        })
      );
      yield put(
        setError({
          error: 'Fail to update User Manufacturer',
          originalError: errors,
        })
      );
    } else {
      yield put(addUserManufacturerSuccess());
    }
  } catch (err) {
    yield put(
      updateUserManufacturerFailure({
        error: 'Fail to request, update User Manufacturer',
        originalError: err,
      })
    );
    yield put(
      setError({
        error: 'Fail to request, update User Manufacturer',
        originalError: err,
      })
    );
  }
}

export function* addUserManufacturer({ payload: { manufacturer, user } }) {
  try {
    const { errors } = yield call(
      client.addUserWithManufacturer,
      manufacturer,
      user
    );

    if (errors) {
      const message = HandleError(errors);
      yield put(
        addUserManufacturerFailure({ error: message, originalError: errors })
      );
      yield put(setError({ error: message, originalError: errors }));
    } else {
      yield put(addUserManufacturerSuccess());
    }
  } catch (err) {
    yield put(
      addUserManufacturerFailure({
        error: 'fail to request, add User Manufacturer',
        originalError: err,
      })
    );
    yield put(
      setError({
        error: 'Fail to request, add User Manufacturer',
        originalError: err,
      })
    );
  }
}

export function* findUserByManbufacturer({ payload: { id } }) {
  try {
    const { errors, data } = yield call(client.findUserByManufacturer, id);

    if (errors) {
      yield put(
        findUserByManufacturerFailure({
          error: 'failt to find User Manufacturer',
          originalError: errors,
        })
      );
      yield put(
        setError({
          error: 'Fail to find User Manufacturer',
          originalError: errors,
        })
      );
    } else {
      yield put(findUserByManufacturerSuccess(data.userByManufacturer));
    }
  } catch (err) {
    yield put(
      findUserByManufacturerFailure({
        error: 'failt to request, find User Manufacturer',
        originalError: err,
      })
    );
    yield put(
      setError({
        error: 'Fail to request, find User Manufacturer',
        originalError: err,
      })
    );
  }
}

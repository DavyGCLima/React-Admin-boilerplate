import { call, put } from 'redux-saga/effects';
import {
  authFailure,
  authSuccess,
  userVerifyTokenFailure,
  userVerifyTokenSuccess,
  resetPasswordFailure,
  resetPasswordSuccess,
} from '../ducks/auth';
import client from '../../services';

export function* authRequest(props) {
  const {
    payload: { email, password },
  } = props;
  try {
    const { errors, data } = yield call(client.userLogin, email, password);

    if (errors) {
      if (errors?.networkError?.result?.errors) {
        yield put(
          authFailure({
            error: `Validation failed`,
            originalError: errors.networkError.result.errors,
          })
        );
      } else {
        yield put(
          authFailure({ error: `Validation failed`, originalError: errors })
        );
      }
    } else {
      yield put(authSuccess(data.userLogin.token));
    }
  } catch (err) {
    yield put(authFailure({ error: `Validation failed`, originalError: err }));
  }
}

export function* userVrifyToken({ payload: { token } }) {
  try {
    const { errors, data } = yield call(client.userVrifyToken, token);

    if (errors) {
      if (errors?.networkError?.result?.errors) {
        yield put(
          userVerifyTokenFailure(
            `Connection Error`,
            errors.networkError.result.errors
          )
        );
      } else {
        yield put(userVerifyTokenFailure(`Could not validate user`, errors));
      }
    } else {
      yield put(userVerifyTokenSuccess(data.userVerifyToken.id));
    }
  } catch (error) {}
}

export function* resetPassword({ payload: { email } }) {
  try {
    const { errors, data } = yield call(client.resetPassword, email);

    if (errors) {
      if (errors?.networkError?.result?.errors) {
        yield put(
          resetPasswordFailure(
            `Reset password failed`,
            errors.networkError.result.errors
          )
        );
      } else {
        yield put(resetPasswordFailure(`Reset password failed`, errors));
      }
    } else {
      yield put(resetPasswordSuccess());
    }
  } catch (error) {
    yield put(resetPasswordFailure(`Reset password failed`, error));
  }
}

// import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import products from './ducks/products';
import user from './ducks/user';
import error from './ducks/error';
import auth from './ducks/auth';
import commonSnackBar from './ducks/CommonSnackBar';
import sagas from './sagas';

const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: {
    auth,
    products,
    user,
    error,
    commonSnackBar,
  },
  middleware: [...getDefaultMiddleware({thunk: false}),...middlewares],
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(sagas);

export default store;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Roles from '../models/Roles';

import Main from '../pages/Main';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';

import Product from '../pages/Product';
import ProductForm from '../pages/Product/Form';

import Profile from '../pages/Profile';

import RouteWithLayout from '../components/RouteWithLayout';

export default function Routes() {
  const productRoles = [Roles.ADMIN, Roles.MANUFACTURER];
  const profileRoles = [Roles.ADMIN, Roles.MANUFACTURER];

  return (
    <BrowserRouter basename="/admin">

      <Switch>
        <Route exact path="/login" render={() => (<Login/>)} />
        <Route path="/forgot-password" render={() => (<ForgotPassword/>)}/>

        <RouteWithLayout
          component={Main}
          exact
          roles={[Roles.ADMIN, Roles.MANUFACTURER, Roles.MANAGER, Roles.GUEST]}
          path="/"
        />

        <RouteWithLayout
          component={Profile}
          exact
          roles={profileRoles}
          path="/profile"
        />

        {/* PRODUCT ========================================================== */}
        <RouteWithLayout
          component={Product}
          exact
          roles={productRoles}
          path="/products"
        />
        <RouteWithLayout
          component={ProductForm}
          exact
          roles={productRoles}
          path="/products/new"
        />
        <RouteWithLayout
          component={ProductForm}
          exact
          roles={productRoles}
          path="/products/:id"
        />
      </Switch>
    </BrowserRouter>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { deleteUser, findUserRequest } from '../../store/ducks/user';
import { logoutAuth } from '../../store/ducks/auth';

import Roles from '../../models/Roles';
import { getToken, isAuthenticated } from '../../services/auth';

import AdmLayout from '../../layout/AdmLayout';

import Loading from '../../components/Loading';

const RouteWithLayout = props => {
  const { component: Component, roles, ...rest } = props;

  const token = getToken();

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.user);

  const userError = useSelector(state => state.user.originalError);

  const authError = useSelector(state => state.auth.originalError);

  const jwtExpired = 'UNAUTHENTICATED';

  useEffect(() => {
    if (
      (userError && Array.isArray(userError) && userError.some(error => error?.extensions?.code === jwtExpired))
      || (authError && Array.isArray(userError) && authError.some(error => error?.extensions?.code === jwtExpired))
    ) {
      dispatch(deleteUser());
      dispatch(logoutAuth());
    }
  }, [userError, authError]);

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(findUserRequest(token));
    }
  }, [token]);

  return (
    <Route
      {...rest}
      render={matchProps => {
        if (!isAuthenticated()) {
          return <Redirect to={{ pathname: '/login' }} />
        }

        if (!currentUser.role) {
          return (<Loading />);
        }

        if (roles.some(role => role === currentUser.role)) {
          switch (currentUser.role) {

            case Roles.ADMIN:
              return (
                <AdmLayout>
                  <Component {...matchProps} />
                </AdmLayout>
              );

            //TODO change to homepage or login page
            default:
              return <Component {...matchProps} />
          }
        } else {
          return (<Redirect to={{}} />);
        }

      }
      }
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
};

export default RouteWithLayout;

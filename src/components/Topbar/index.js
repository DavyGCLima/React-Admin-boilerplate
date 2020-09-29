import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import clsx from 'clsx';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Badge, IconButton, Icon } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

import styles from './styles';

import { logoutAuth } from '../../store/ducks/auth';
import { deleteUser } from '../../store/ducks/user';

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = styles();

  const dispatch = useDispatch();

  const [notifications] = useState([]);

  function handleLogout() {
    dispatch(deleteUser());
    dispatch(logoutAuth);
  }

  return (
    <AppBar
      {...rest}
      color="primary"
      className={clsx(classes.root)}
    >
      <Toolbar>
        <div className={classes.menu}>
          <IconButton
            aria-label="open drawer"
            onClick={onSidebarOpen}
            edge="start">
            <Icon>menu</Icon>
          </IconButton>

        </div>

        <div className={classes.flexGrow} />

        <RouterLink to="/" className={classes.logoContainer}>
          <img className={classes.logo} src={process.env.REACT_APP_LOGO_URL} />
        </RouterLink>

        <div className={classes.flexGrow} />

        <IconButton >
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton
          onClick={() => handleLogout()}
          className={classes.signOutButton} >
          <InputIcon />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;

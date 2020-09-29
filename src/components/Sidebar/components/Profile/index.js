import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Typography, Zoom } from '@material-ui/core';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';

import styles, { AvatarAnimated } from './styles';

const Profile = ({ collapse }) => {

  const classes = styles();

  const user = useSelector((state) => state.user.user);

  return (
    <div className={classes.root} >
      <AvatarAnimated
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/profile"
        animate={!collapse}>
        {!user.avatar ? user.name.slice(0, 1) : null}
      </AvatarAnimated>

      {collapse && <Typography
        className={classes.name}
        variant="h4" >
        {user.name}
      </Typography>}
      {collapse && <Typography variant="body2">{user.bio}</Typography>}
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;

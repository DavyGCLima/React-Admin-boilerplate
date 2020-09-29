import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton
  , MenuItem
  , Menu
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import styles from './styles';

const PopMenu = ({ options }) => {

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = styles();

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = (action) => {
    action();
    handleClose();
  };

  return (
    <div className={classes.root}>
      <IconButton
        aria-controls="menu-list-grow"
        aria-haspopup="true"
        edge="end"
        size="small"
        onClick={handleToggle}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {options.map((item, index) => (
          <MenuItem key={index} onClick={ () => handleAction(item.action) }>{item.title}</MenuItem>
        ))}
      </Menu>
    </div >
  );
};


PopMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func,
    title: PropTypes.string,
  })),
};


export default PopMenu;

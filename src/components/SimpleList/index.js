import React from 'react';
import PropTypes from 'prop-types';

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';

import PopMenu from '../../components/PopMenu';

import styles from './styles';

const SimpleList = ({ list, popMenu }) => {

  const classes = styles();

  return (
    <List>
      {list.map((item, index) => (
        <ListItem key={index}>
          <ListItemAvatar onClick={item.onItemClick} className={classes.clickItem} >
            <Avatar alt={item.avatar.alt} src={item.avatar.src}>
              {!item.avatar.src && `${item.alt}`}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            className={classes.clickItem}
            onClick={item.onItemClick}
            primary={item.primaryText}
            secondary={item.secondaryText}
          />
          {popMenu && <PopMenu options={item.options} />}
        </ListItem>
      ))}
    </List>
  );
}

SimpleList.propTypes = {
  popMenu: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.shape({ alt: PropTypes.string.isRequired, src: PropTypes.string }),
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string,
    options: PropTypes.shape({
      action: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
    }),
    onItemClick: PropTypes.func,
  })),
};

export default SimpleList;

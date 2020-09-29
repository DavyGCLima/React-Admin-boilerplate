import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Face, BusinessCenter } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Profile from './components/Profile';

import Roles from '../../models/Roles';

import styles from './styles';

const Sidebar = ({ open, restriction }) => {

  const classes = styles();

  const history = useHistory();

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open} >
        <Profile collapse={open} />
        <Divider />
        <List>
          {['Products'].map((text) => (
            <ListItem button key={text} onClick={() => history.push('/products')}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        { restriction !== Roles.MANUFACTURER &&
          <>
            <Divider />

            <List>
              {['Manufacturers'].map((text) => (
                <ListItem button key={text} onClick={() => history.push('/manufacturer')}>
                  <ListItemIcon><BusinessCenter /></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>

            <Divider />
            <List>

              {['Customers'].map((text) => (
                <ListItem button key={text} onClick={() => history.push('/customer')}>
                  <ListItemIcon><Face /></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </>
        }

      </Drawer>

    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default Sidebar;

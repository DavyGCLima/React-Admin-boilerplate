import React from 'react';
import PropTypes from 'prop-types';

import {
  SnackbarContent,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import clsx from 'clsx';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

import styles from './styles';

const SimpleSnackBar = ({ open, close, variant, message, className }) => {

  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

  const classes = styles();

  const Icon = variantIcon[variant];

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
        open={open}
        autoHideDuration={6000}
        onClose={close} >
        <SnackbarContent
          className={clsx(classes[variant], className)}
          message={
            <span id="client-snackbar" className={classes.message}>
              {variant && <Icon className={clsx(classes.icon, classes.iconVariant)} />}
              {message}
            </span>
          }
          action={[
            <IconButton key="close" color="inherit" onClick={close}>
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    </div>
  );
};


SimpleSnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};


export default SimpleSnackBar;

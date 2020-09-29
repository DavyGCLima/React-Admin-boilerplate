import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';

const ConfirmDialog = ({open, content, accept, cancel, handleClose}) => {

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle >{content.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={`alert-dialog-${content.title}`}>
          {content.body}
      </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => cancel()} color="primary">
          {content.cancelText}
      </Button>
        <Button onClick={() => accept()} color="primary" autoFocus>
          {content.acceptText}
      </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    acceptText: PropTypes.string.isRequired,
  }).isRequired,
  accept: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};


export default ConfirmDialog;

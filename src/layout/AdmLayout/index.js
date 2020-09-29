// import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import SimpleSnackBar from '../../components/SnackBar/SimpleSnackBar';

import styles from './styles';

import { hideError } from '../../store/ducks/error';

export default function MiniDrawer(props) {
  const classes = styles();

  const { children } = props;

  const [openSidebar, setOpenSidebar] = useState(true);

  const dispatch = useDispatch();

  const handlerSidebarOpening = () => {
    setOpenSidebar(!openSidebar);
  }

  const productSaved = useSelector((state) => state.products.saved);

  const productUploadeds = useSelector((state) => state.products.uploadeds);

  const deleted = useSelector((state) => state.products.deleted);

  const error = useSelector((state) => state.error);

  const [openSnack, setOpenSnack] = useState(false);

  const [snackMessage, setSnackMessage] = useState('');

  const [snackVariant, setSnackVariant] = useState('');

  const [saved, setSaved] = useState(null);

  const snackBarStateFailed = useSelector(state => state.commonSnackBar.failed);

  const snackBarStateSuccess = useSelector(state => state.commonSnackBar.success);

  function handleCloseSnackBar() {
    dispatch(hideError());
  }

  useEffect(() => {
    if (deleted) {
      setSnackMessage('Successfully deleted');
      setSnackVariant('success');
      setOpenSnack(deleted);
    }
  }, [deleted]);

  //TODO handle error message
  useEffect(() => {
    if (error.visible) {
      setSnackMessage(error.message);
      setSnackVariant('error');
      setOpenSnack(true);
    }
  }, [error]);

  useEffect(() => {
    if (!error.visible) {
      setOpenSnack(false);
    }
  }, [error]);

  useEffect(() => {
    setSaved(productSaved);
  }, [productSaved, productUploadeds]);

  useEffect(() => {
    if (snackBarStateSuccess) {
      setSnackMessage(snackBarStateSuccess);
      setSnackVariant('success');
      setOpenSnack(true);
    }
  }, [snackBarStateSuccess]);

  useEffect(() => {
    if (snackBarStateFailed) {
      setSnackMessage(snackBarStateFailed);
      setSnackVariant('error');
      setOpenSnack(true);
    }
  }, [snackBarStateFailed]);

  useEffect(() => {
    if (saved) {
      setSnackMessage(`${saved.name} saved successfully`);
      setSnackVariant('success');
      setOpenSnack(true);
    }
  }, [saved]);

  useEffect(() => {
    if (productUploadeds?.length) {
      setSnackMessage(`CSV saved successfully`);
      setSnackVariant('success');
      setOpenSnack(true);
    }
  }, [productUploadeds])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar onSidebarOpen={handlerSidebarOpening} />
      <Sidebar open={openSidebar} />

      <main className={classes.content}>
        {children}
        <Footer />
      </main>
      <SimpleSnackBar open={openSnack} close={handleCloseSnackBar} variant={snackVariant} message={snackMessage} />
    </div>
  );
}

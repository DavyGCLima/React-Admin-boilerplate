import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,

} from '@material-ui/core';

import PopMenu from '../../../../components/PopMenu';
import ConfirmDialog from '../../../../components/Dialogs/ConfirmDialog';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import defaultProductIcon from '../../../../assets/icons/icon-product-3.jpg';

import styles from './styles';

import { deleteProductRequest } from '../../../../store/ducks/products';

const ListProducts = ({ products }) => {
  const classes = styles();

  const history = useHistory();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [dialogContent, setDialogContent] = useState({
    title: '',
    body: ``,
    cancelText: '',
    acceptText: '',
    id: '',
  });

  const deleteDialodContent = (product) => {
    return {
      title: 'Confirm Delete',
      body: `Are you sure you want to delete ${product.name}?`,
      cancelText: 'Cancel',
      acceptText: 'Delete',
      id: product.id,
    }
  }

  function createOptions(product) {
    const options = [
      {
        action: () => openProduct(product),
        title: 'Edit',
      },
      {
        action: () => confirmDelete(product),
        title: 'Delete',
      },
    ];
    return options;
  }

  function openProduct(product) {
    history.push(`/products/${product.id}`)
  }

  function confirmDelete(product) {
    setDialogContent(deleteDialodContent(product));
    setOpen(true);
  }

  function acceptDelete() {
    handleDelete();
    setOpen(false);
  }

  async function handleDelete() {
    dispatch(deleteProductRequest(dialogContent.id))
  }

  function cancelDelte() {
    setOpen(false);
  }

  return (
    <>
      <Card>
        <CardHeader
          action={
            <Button
              size="small"
              variant="text" >
              Last Week <ArrowDropDownIcon />
            </Button>
          }
          title="Products"
        />
        <Divider />
        <CardContent>
          <List>
            {products.map((product, index) => (
              <ListItem key={index} button >
                <ListItemAvatar
                  className={classes.cursor}
                  onClick={() => openProduct(product)} >
                  <img
                    alt="Product Img"
                    className={classes.image}
                    src={product?.thumbnail?.url ? product.thumbnail.url : defaultProductIcon} />
                </ListItemAvatar>
                <ListItemText
                  className={classes.cursor}
                  onClick={() => openProduct(product)}
                  primary={product.name}
                  secondary={product.sku}
                />
                <PopMenu options={createOptions(product)} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <ConfirmDialog
        open={open}
        content={dialogContent}
        accept={acceptDelete}
        cancel={cancelDelte}
        handleClose={cancelDelte} />
    </>
  );
}

export default ListProducts;

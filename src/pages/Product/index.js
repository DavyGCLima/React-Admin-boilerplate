import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import ListProducts from './components/ListProducts';
import ToolBar from '../../components/Toolbar';
import UploadButton from './components/Upload/UploadButton';
import DeleteMany from './components/DeleteMany';

import { listProductsRquest } from '../../store/ducks/products';
import { filterProductsByRole , getProductsWithFilter } from './product.service';

export default function Main() {

  const dispatch = useDispatch();

  const history = useHistory();

  const products = useSelector((state) => state.products.products);

  const user = useSelector((state) => state.user.user);

  const [productsByRole, setProductsByRole] = useState([]);

  const [searchFilter, setSeacchFilter] = useState('');

  function fetchProducts() {
    dispatch(listProductsRquest());
  }

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0 && user)
      setProductsByRole(filterProductsByRole(products, user));
  }, [products, user])

  function handleFilter(value) {
    setSeacchFilter(value);
  }

  function toNewProduct() {
    history.push('/products/new');
  }

  function renderUploadButtons() {
    const buttons = [];
    buttons.push( <UploadButton key="upload-many-products" reload={fetchProducts}/> );
    buttons.push( <DeleteMany key="delete-many-products" reload={fetchProducts}/> );
    return buttons;
  }

  return (
    <Grid
      container
      spacing={4} >
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <ToolBar
          onFilter={handleFilter}
          ButtonAction={toNewProduct}
          buttons={renderUploadButtons()}
          ButtonText="New Product"
          searchBarPlaceholder="Search Product"/>
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <ListProducts
          products={getProductsWithFilter(searchFilter, productsByRole)}
        />
      </Grid>
    </Grid>
  );
}

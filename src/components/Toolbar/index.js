import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import SearchBar from '../SearchBar';

import styles from './styles';

const ToolBar = ({ className, onFilter, ButtonAction, ButtonText, searchBarPlaceholder, buttons, ...rest }) => {

  const classes = styles();

  function handleSearch({ target: { value } }) {
    onFilter(value);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={ButtonAction}>
          {ButtonText}
        </Button>
        {(buttons && buttons.length) && [...buttons]}
      </div>
      <div className={classes.row}>
        <SearchBar
          className={classes.searchInput}
          placeholder={searchBarPlaceholder}
          onChange={handleSearch} />
      </div>
    </div>
  );
};

ToolBar.propTypes = {
  className: PropTypes.string,
  onFilter: PropTypes.func.isRequired,
  ButtonAction: PropTypes.func.isRequired,
  ButtonText: PropTypes.string.isRequired,
  searchBarPlaceholder: PropTypes.string.isRequired,
  buttons: PropTypes.array,
};

export default ToolBar;

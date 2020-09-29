import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import styles from './styles';

const SearchBar = ({ className, onChange, style, ...rest }) => {

  const classes = styles();

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
      style={style}
    >
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        onChange={onChange}
      />
    </Paper>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SearchBar;

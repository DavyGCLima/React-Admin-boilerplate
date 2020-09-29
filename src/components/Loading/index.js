import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

import {
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0',
    position: 'absolute',
    top: '50%',
    msTransform: 'translateY(-50%)',
    transform: 'translateY(-50%)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));

export default function Loading() {

  const classes = useStyles();

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item lg={6} md={6} xl={6} xs={6}>
        <LinearProgress />
        <img src={process.env.REACT_APP_LOGO_URL} className={classes.image} />
        <LinearProgress variant="query" />
      </Grid>
    </Grid>

  );
}

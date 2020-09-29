import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import { userVerifyToken } from '../../store/ducks/auth';
import { updateUserPasswordRequest } from '../../store/ducks/user';

import {
  Grid,
  Card,
  Divider,
  CardContent,
  CardHeader,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import styles from './styles';

import {} from '../../services/auth';

function ForgotPassword() {
  const logo = () => {
    if (process.env.REACT_APP_LOGO_URL)
      return (
        <img className={classes.logo} src={process.env.REACT_APP_LOGO_URL} />
      );
    else return null;
  };

  const classes = styles();

  const dispatch = useDispatch();

  const history = useHistory();

  const { checked, loading, error } = useSelector((state) => state.auth);
  const { saved, error: userError } = useSelector((state) => state.user);

  const location = useLocation();

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRep, setNewPasswordRep] = useState('');
  const [feedbackUser, setFeedbackUser] = useState({
    text: '',
    color: 'error',
  });

  useEffect(() => {
    const splitToken = location.search.split('=');

    if (splitToken.length > 1) {
      dispatch(userVerifyToken(splitToken[1]));
    }
  }, []);

  useEffect(() => {
    if (error) {
      setFeedbackUser(error);
    }
  }, [error]);

  useEffect(() => {
    if(userError)
      setFeedbackUser({
        text: 'some problem occurred when trying to update password',
        color: 'error',
      });
  }, [userError]);

  useEffect(() => {
    if (saved) setFeedbackUser({ text: 'Password updated', color: 'primary' });
  }, [saved]);

  const validate = () => {
    if (saved) history.push('/login');
    const token = location.search.split('=')[1];
    if (newPassword === newPasswordRep && checked) {
      dispatch(updateUserPasswordRequest(newPassword, token));
    } else {
      setFeedbackUser({ text: 'Passwords must match', color: 'error' });
    }
  };

  return (
    <Grid container className={classes.container}>
      <Grid item lg={6} md={6} xl={6} xs={6} className={classes.cardForm}>
        <Card>
          <CardHeader
            avatar={logo()}
            className={classes.logoContainer}
            style={{
              alignItems: 'center',
              justifyItems: 'center',
              margin: '0',
            }}
            title={
              process.env.REACT_APP_LOGO_URL ? undefined : 'Reset Password'
            }
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              variant="filled"
              label="New Password"
              type="password"
              name="newpassword"
              onChange={(event) => setNewPassword(event.target.value)}
              value={newPassword}
              className={classes.field}
              disabled={!checked}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Repeat Password"
              type="password"
              name="newpasswordrep"
              onChange={(event) => setNewPasswordRep(event.target.value)}
              value={newPasswordRep}
              className={classes.field}
              disabled={!checked}
            />
            {feedbackUser.text && (
              <div className={classes.feedbackWrapper}>
                <Typography variant="button" color={feedbackUser.color}>
                  {feedbackUser.text}
                </Typography>
              </div>
            )}
            <div className={classes.buttonWrapper}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={validate}
                disabled={!checked}
              >
                {saved ? 'Back to Login' : 'Reset Password'}
              </Button>
              {loading && <CircularProgress size={24} />}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ForgotPassword;

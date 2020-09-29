import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as LoginService from './components';
import { Grid, Card, Divider, CardContent } from '@material-ui/core';

import { authRequest, resetPassword } from '../../store/ducks/auth';

import backgroundImage from '../../assets/data/images/background.jpg';

import styles from './styles';

export default function Login() {
  const classes = styles();

  const dispatch = useDispatch();

  const history = useHistory();

  const loading = useSelector((state) => state.auth.loading);

  const {success, error} = useSelector((state) => state.auth);

  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackTextColor, setFeedbackTextColor] = useState('error');

  const logo = () => {
    if (process.env.REACT_APP_LOGO_URL)
      return (
        <img className={classes.logo} src={process.env.REACT_APP_LOGO_URL} />
      );
    else return null;
  };

  useEffect(() => {
    if (success && !loading) {
      history.push('/');
    }
  }, [success, loading]);

  useEffect(() => {
    if(error) {
      setFeedbackText(error);
      setFeedbackTextColor('error');
    }
  }, [error]);

  function handleLogin(values) {
    setFeedbackText('');
    dispatch(authRequest({email: values.email, password: values.password}));
  }

  function resetPassword(props) {
    setFeedbackText('');
    if (props.values.email) {
      dispatch(resetPassword(props.values.email));
      setFeedbackTextColor('primary');
      setFeedbackText('Check your email, we sent a password recovery message');
    }
    else setFeedbackText('You must fill in the email field');
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
      }}
    >
      <Formik {...{ ...LoginService.formikProps, onSubmit: handleLogin }}>
        {({ errors, touched, ...props }) => (
          <Form>
            <Grid container className={classes.container}>
              <Grid
                item
                lg={6}
                md={6}
                xl={6}
                xs={6}
                className={classes.cardForm}
              >
                <Card>
                  <LoginService.Header
                    logo={logo()}
                    className={classes.logoContainer}
                    title={
                      process.env.REACT_APP_LOGO_URL ? undefined : 'Sing In'
                    }
                  />
                  <Divider />

                  <CardContent>
                    {/* Email Field  */}
                    {feedbackText && (
                      <div className={classes.feedbackWrapper}>
                        <LoginService.FeedbackText text={feedbackText} color={feedbackTextColor}/>
                      </div>
                    )}
                    <Field
                      name={LoginService.FIELDS.EMAIL}
                      as={LoginService.TextInput}
                      className={classes.field}
                      {...props}
                    />
                    <ErrorMessage name={LoginService.FIELDS.EMAIL}>
                      {(msg) => <LoginService.Error msg={msg} />}
                    </ErrorMessage>

                    {/* Password Field  */}
                    <Field
                      name={LoginService.FIELDS.PASSWORD}
                      as={LoginService.PasswordInput}
                      className={classes.field}
                      {...props}
                    />
                    <ErrorMessage name={LoginService.FIELDS.PASSWORD}>
                      {(msg) => <LoginService.Error msg={msg} />}
                    </ErrorMessage>

                    <div className={classes.actionsWrapper}>
                      <LoginService.LoginButton
                        type="submit"
                        text="Login"
                        loading={loading}
                        containerStyle={classes.buttonWrapper}
                        progressStyle={classes.buttonProgress}
                      />
                      <LoginService.ResetPasswordLink
                        resetLinkStyle={classes.resetPasswordLink}
                        text="Reset password"
                        onClick={() => resetPassword(props)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

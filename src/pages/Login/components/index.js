import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  TextField,
  CardHeader,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';

export const FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

export const INITIAL_VALUES = {
  [FIELDS.EMAIL]: '',
  [FIELDS.PASSWORD]: '',
};

export const handleSubmit = (values, actions) => {};

export const SignupSchema = Yup.object().shape({
  [FIELDS.EMAIL]: Yup.string()
    .email('Invalid email')
    .required('Email is required.'),
  [FIELDS.PASSWORD]: Yup.string().required('Password is required'),
});

export const formikProps = {
  initialValues: INITIAL_VALUES,
  onSubmit: handleSubmit,
  validationSchema: SignupSchema,
  validateOnChange: true,
};

export const TextInput = ({
  handleChange,
  handleBlur,
  values,
  name,
  ...rest
}) => (
  <TextField
    fullWidth
    variant="filled"
    label="E-mail"
    onChange={handleChange}
    onBlur={handleBlur}
    value={values[name]}
    name={name}
    {...rest}
  />
);

export const PasswordInput = ({
  handleChange,
  handleBlur,
  values,
  name,
  ...rest
}) => (
  <TextField
    fullWidth
    variant="filled"
    label="Password"
    type="password"
    onChange={handleChange}
    onBlur={handleBlur}
    value={values[name]}
    name={name}
    {...rest}
  />
);

export const Header = ({ title, subTitle, logo, ...rest }) => (
  <CardHeader
    avatar={logo}
    title={title}
    subheader={subTitle}
    style={{ alignItems: 'center', justifyItems: 'center', margin: '0' }}
    {...rest}
  />
);

export const LoginButton = ({
  text,
  onClick,
  loading,
  containerStyle,
  progressStyle,
  ...rest
}) => (
  <div className={containerStyle}>
    <Button
      disabled={loading}
      type="submit"
      variant="contained"
      color="secondary"
      {...rest}
    >
      {text}
    </Button>
    {loading && <CircularProgress size={24} className={progressStyle} />}
  </div>
);

export const ResetPasswordLink = ({ resetLinkStyle, text, ...rest }) => (
  <span className={resetLinkStyle} {...rest}>
    {text}
  </span>
);

export const Error = ({ msg, ...rest }) => (
  <Typography variant="caption" display="block" gutterBottom {...rest}>
    {msg}
  </Typography>
);

export const FeedbackText = ({text, color = "error", ...rest}) => (
  <Typography variant="button" color={color} {...rest}>
    {text}
  </Typography>
);

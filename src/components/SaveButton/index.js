import React from 'react';
import PropTypes from 'prop-types';
import { StylesProvider } from '@material-ui/core/styles';

import { Container, SaveProgress } from './styles';

import { Button } from '@material-ui/core';

function SaveButton({ onClick, disabled, loading, buttonText, CustomButton }) {
  return (

    <Container >
      {CustomButton
        ? <CustomButton />
        : (
          <Button
            onClick={onClick}
            color="primary"
            variant="contained"
            disabled={disabled} >
            {buttonText}
          </Button>
        )}
      <StylesProvider injectFirst>
        {loading && <SaveProgress size={24} />}
      </StylesProvider>
    </Container>
  );
}

SaveButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string,
};

export default SaveButton;

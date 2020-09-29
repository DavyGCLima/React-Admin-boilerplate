import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

function InputPhone(props) {
  const { inputRef, ...other } = props;

  function formatMask(value) {
    if (value?.length <= 16) {
      return ['+', /\d/, '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/];
    }

    if (value?.length === 17) {
      return ['+', /\d/, /\d/, '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/];
    }

    if (value?.length === 18) {
      return ['+', /\d/, /\d/, /\d/, '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]
    }

    return ['+', /\d/, '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  }

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      guide={false}
      mask={formatMask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

InputPhone.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default InputPhone;

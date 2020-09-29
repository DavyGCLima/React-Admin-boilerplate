import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

function InputNumber(props) {
  const { inputRef, onChange, prefix, name, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: name,
            value: Number(values.value),
          },
        });
      }}
      thousandSeparator
      prefix={prefix}
    />
  );
}

InputNumber.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputNumber;

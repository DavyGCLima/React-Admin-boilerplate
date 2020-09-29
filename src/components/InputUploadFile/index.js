import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  IconButton,
  Paper,
  InputBase,
  Link,
} from '@material-ui/core';

import { CloudUpload } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';

const InputUploadFile = (
  {
    value,
    handleChange,
    name,
    multiple,
    variant = 'text',
    accept = '/*',
    id = 'input-file',
    placeholder,
    buttonText = 'Upload File',
  }) => {

  const classes = styles();

  function handleUpload(event) {
    const fileRef = event.target.files[0];
    const file = { fileRef, name: fileRef.name.substring(0, fileRef.name.indexOf('.')) }
    const customEvent = { ...event, target: { name, value: file } };
    handleChange(customEvent);
  }

  function deleteFile() {
    const event = { target: { name, value: { link: '', name: '' } } };
    handleChange(event);
  }

  return (
    <Paper component="div" className={classes.root}>
      <Button
        startIcon={<CloudUpload />}
        variant={variant}
        component="label"
        className={classes.button}>
        {buttonText}
        <input
          accept={accept}
          style={{ display: 'none' }}
          id={id}
          type="file"
          name={name}
          multiple={multiple}
          onChange={handleUpload}
        />
      </Button>
      |
      {value.link
        ? (
          <>
            <Link href={value.link} className={classes.input}>🧲DOWNLOAD CURRENT BROCHURE</Link>
            <IconButton onClick={() => deleteFile()}>
              <DeleteIcon />
            </IconButton>
          </>
        )
        : <InputBase
          disabled
          className={classes.input}
          placeholder={placeholder}
          value={value.name}
        />}
    </Paper>
  );
};


InputUploadFile.propTypes = {
  value: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  variant: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
};


export default InputUploadFile;

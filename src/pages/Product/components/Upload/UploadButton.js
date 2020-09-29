import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { useSelector, useDispatch } from "react-redux";

import { setProductLoading, uploadCVSSuccess, uploadCVSFailure } from "../../../../store/ducks/products";
import { setError} from '../../../../store/ducks/error';
import { uploadCVSGql } from "../../../../services/productsTransactions";
import client from '../../../../services';

import { Button, CircularProgress } from "@material-ui/core";

import { cleanApolloErrorsMsg } from '../../../../Utils/stringUtils';

import styles from "./styles";

function Upload({ reload }) {
  const classes = styles();

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.products);

  function handleUpload(e, mutation) {
    const file = e.target.files[0];
    mutation({
      variables: {
        file
      }
    });
    dispatch(setProductLoading(true));
  }

  function handleComplete(data) {
    dispatch(uploadCVSSuccess(data.massImport));
    reload();
  }

  function handlerError(error) {
    dispatch(setError(cleanApolloErrorsMsg(error.message)));
    dispatch(uploadCVSFailure(cleanApolloErrorsMsg(error.message)));
    reload();
  }

  return (
    <Mutation
      mutation={uploadCVSGql}
      onError={handlerError}
      onCompleted={handleComplete}
      client={client}
    >
      {mutate => (
        <div className={classes.buttonSaveWrapper}>
          <Button
            type="submit"
            variant="outlined"
            component="label"
            disabled={loading}
            style={{ marginLeft: "5px", marginRight: "5px" }}
          >
            Upload Products CSV
            <input
              type="file"
              style={{ display: "none" }}
              accept=".csv"
              onChange={e => handleUpload(e, mutate)}
            />
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      )}
    </Mutation>
  );
}

Upload.propTypes = {
  reload: PropTypes.func.isRequired
};

export default React.memo(Upload);

import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { useSelector, useDispatch } from "react-redux";

import { setProductUploadeds, setProductLoading, setProductError } from "../../../../store/ducks/products";
import { revertCVSGql } from "../../../../services/productsTransactions";

import styles from "./styles";
import { Button, CircularProgress } from "@material-ui/core";

function DeleteMany({ reload }) {
  const classes = styles();

  const dispatch = useDispatch();

  const { uploadeds, loading } = useSelector(state => state.products);

  function getUploadedIDs() {
    return uploadeds.map(up => up.id);
  }

  function handleClick(mutate) {
    dispatch(setProductLoading(true));
    mutate({ variables: { ids: getUploadedIDs() } });
  }

  function handleComplete(props) {
    dispatch(setProductUploadeds([]));
    reload();
  }

  function handleError(error) {
    dispatch(setProductError(error.message));
  }

  if (uploadeds?.length) {
    return (
      <Mutation
        mutation={revertCVSGql}
        onError={handleError}
        onCompleted={props => handleComplete(props)}
      >
        {mutate => (
          <div className={classes.buttonSaveWrapper}>
            <Button
              type="submit"
              variant="outlined"
              component="label"
              disabled={loading}
              className={classes.revertButton}
              onClick={() => handleClick(mutate)}
            >
              Revert Upload Products
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        )}
      </Mutation>
    );
  }
  return <div />;
}

DeleteMany.propTypes = {
  reload: PropTypes.func.isRequired
};

export default React.memo(DeleteMany);

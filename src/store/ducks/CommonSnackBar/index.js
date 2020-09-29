export const Types = {
  COMMON_SNACKBAR_SUCCESS: 'COMMON_SNACKBAR_SUCCESS',
  COMMON_SNACKBAR_UPDATED: 'COMMON_SNACKBAR_UPDATED',
  COMMON_SNACKBAR_DELETED: 'COMMON_SNACKBAR_DELETED',
  COMMON_SNACKBAR_FAILED: 'COMMON_SNACKBAR_FAILED',

  COMMON_SNACKBAR_LOADING: 'COMMON_SNACKBAR_LOADING',
};

const INITIAL_STATE = {
  loading: false,
  success: null,
  failed: null,
  deleted: null,
  updated: null,
};

export default function Index(state = INITIAL_STATE, action) {
  switch (action.type) {

    case Types.COMMON_SNACKBAR_LOADING:
      return { ...state, loading: action.payload.loading };

    case Types.COMMON_SNACKBAR_DELETED:
      return { ...state, deleted: action.payload.deletedMsg };

    case Types.COMMON_SNACKBAR_FAILED:
      return { ...state, failed: action.payload.failedMsg };

    case Types.COMMON_SNACKBAR_SUCCESS:
      return { ...state, success: action.payload.successMsg };

    case Types.COMMON_SNACKBAR_UPDATED:
      return { ...state, updated: action.payload.updatedMsg };

    default:
      return state;
  }
}

export const Creators = {
  setLoading: loading => ({
    type: Types.COMMON_SNACKBAR_LOADING, payload: { loading }
  }),
  setSuccess: successMsg => ({
    type: Types.COMMON_SNACKBAR_SUCCESS, payload: { successMsg }
  }),
  setFailed: failedMsg => ({
    type: Types.COMMON_SNACKBAR_FAILED, payload: { failedMsg }
  }),
  setdeleted: deletedMsg => ({
    type: Types.COMMON_SNACKBAR_DELETED, payload: { deletedMsg }
  }),
  setUpdated: updatedMsg => ({
    type: Types.COMMON_SNACKBAR_UPDATED, payload: { updatedMsg }
  }),
};

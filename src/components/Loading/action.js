export const types = { SET_LOADING: 'SET_LOADING' };

export const setLoadingInternal = (dispatch, isLoading) => dispatch({
  type: types.SET_LOADING,
  isLoading,
});

export const setLoading = (isLoading) => (dispatch) => dispatch({
  type: types.SET_LOADING,
  isLoading,
});

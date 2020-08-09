export const types = { SET_LOADING: 'SET_LOADING' };

export const setLoading = (dispatch, isLoading) => dispatch({
  type: types.SET_LOADING,
  isLoading,
});

export const setLoadingActionCreator = (isLoading) => (dispatch) => dispatch({
  type: types.SET_LOADING,
  isLoading,
});

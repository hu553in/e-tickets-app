import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './style.scss';

const Loading = ({ isLoading }) => (
  isLoading
    ? (<div className="loading"><CircularProgress /></div>)
    : null
);

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingReducer.isLoading,
});

export default connect(mapStateToProps, null)(Loading);

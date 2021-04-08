import CircularProgress from '@material-ui/core/CircularProgress';
import { useStore } from 'effector-react';
import React from 'react';
import { $loading } from '../../effector/loading/index';
import './style.scss';

const Loading: React.FC = () => {
  const loading = useStore($loading);
  return loading ? (
    <div className='loading'>
      <CircularProgress />
    </div>
  ) : null;
};

export default Loading;

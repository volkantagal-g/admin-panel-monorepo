import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';

import { getStatus } from './selector';
import useStyles from './style';

const LoadingBarComponent = ({ status, ...props }) => {
  const classes = useStyles();
  const loadingBarRef = useRef(null);

  useEffect(() => {
    if (loadingBarRef && loadingBarRef.current) {
      const loadingBar = loadingBarRef.current;

      switch (status) {
        case 'show':
          loadingBar.continuousStart();
          break;
        case 'hide':
        case 'reset':
          loadingBar.complete();
          break;
        default:
          break;
      }
    }
  }, [status]);

  return (
    <div className={classes.root}>
      <LoadingBar
        ref={loadingBarRef}
        height={3}
        color="#FFD10D"
        {...props}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return { status: getStatus(state) };
};

const withConnect = connect(mapStateToProps);

export default withConnect(LoadingBarComponent);

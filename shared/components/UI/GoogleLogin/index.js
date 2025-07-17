import { memo } from 'react';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { useGoogleAuth } from '@shared/hooks';
import { GOOGLE_AUTH_REQUEST_TYPES, APPLICATION_ENVIRONMENTS } from '@shared/shared/constants';
import { Creators } from '@shared/redux/actions/auth';
import { ENVIRONMENT } from '@shared/config';

const GoogleLogin = () => {
  const targetEnv = ENVIRONMENT.REACT_APP_TARGET_ENV;
  const isTbe = targetEnv === APPLICATION_ENVIRONMENTS.TBE;
  const styleProps = {
    pointerEvents: isTbe ? 'none' : 'auto',
    opacity: isTbe ? 0.5 : 1,
  };

  const classes = useStyles(styleProps);
  const dispatch = useDispatch();

  useGoogleAuth({
    authRequest: GOOGLE_AUTH_REQUEST_TYPES.SIGN_IN,
    dispatch,
    Creators,
  });

  return (
    <div className={classes.centered} id="gsiLogin" />
  );
};

export default memo(GoogleLogin);

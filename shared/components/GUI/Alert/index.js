import { memo } from 'react';
import { Alert as AlertAntd } from 'antd';
import PropTypes from 'prop-types';

import useStyles from './styles';

export const Alert = memo(function Alert({ message, type }) {
  const classes = useStyles({ type });
  return <AlertAntd message={message} type={type} className={classes.root} />;
});

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
};

Alert.defaultProps = {
  message: '',
  type: 'success',
};

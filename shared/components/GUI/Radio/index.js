import { Radio as RadioAntd } from 'antd';
import { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useStyles from './styles';

export const Radio = memo(function Radio({ children, className = '', ...otherProps }) {
  const classes = useStyles();
  return (
    <RadioAntd
      {...otherProps}
      className={classNames(className, classes.radio)}
    >
      {children}
    </RadioAntd>
  );
});

Radio.propTypes = {
  children: PropTypes.element,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};

Radio.defaultProps = {
  children: undefined,
  defaultChecked: false,
  disabled: false,
  value: undefined,
};

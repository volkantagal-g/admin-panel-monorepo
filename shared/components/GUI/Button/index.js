import { Button as ButtonAntd } from 'antd';
import PropTypes from 'prop-types';

import { memo } from 'react';

import useStyles from './styles';

export const Button = memo(function Button({
  color,
  icon,
  size,
  disabled,
  children,
  noBackground,
  className,
  ...otherProps
}) {
  const doesHaveOnlyIcon = icon && !children;
  const classes = useStyles({ size, color, doesHaveOnlyIcon, noBackground });
  return (
    <ButtonAntd
      {...otherProps}
      className={`${classes.button} ${className}`}
      icon={icon}
      disabled={disabled}
    >
      {children}
    </ButtonAntd>
  );
});
Button.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'ternary', 'active', 'danger', 'default', 'defaultWithoutBorder']),
  icon: PropTypes.element,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['extra-small', 'small', 'medium']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'link', 'text']),
};
Button.defaultProps = {
  color: 'primary',
  icon: undefined,
  loading: false,
  size: 'medium',
  disabled: false,
  onClick: undefined,
  type: 'primary',
};
export default Button;

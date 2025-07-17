import PropTypes from 'prop-types';
import { memo } from 'react';

import { Button as AntButton } from '@shared/components/GUI';
import useStyles from './styles';

const Button = ({
  children,
  type = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  ...props
}) => {
  const classes = useStyles();

  const getButtonClasses = () => {
    const baseClass = classes.button;
    const typeClass = classes[type];
    const sizeClass = classes[size];
    const disabledClass = disabled ? classes.disabled : '';

    return `${baseClass} ${typeClass} ${sizeClass} ${disabledClass} ${className}`.trim();
  };

  return (
    <AntButton
      {...props}
      className={getButtonClasses()}
      disabled={disabled}
    >
      {children}
    </AntButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'outline', 'disabled']),
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'primary',
  size: 'medium',
  disabled: false,
  className: '',
};

export default memo(Button);

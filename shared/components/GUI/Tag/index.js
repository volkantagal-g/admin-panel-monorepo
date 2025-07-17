import { Tag as TagAntd } from 'antd';
import PropTypes from 'prop-types';
import { memo } from 'react';
import classnames from 'classnames';

import useStyles from './styles';

export const Tag = memo(function Tag({
  children,
  color,
  closable,
  onClose,
  icon,
  size,
  className,
  ...otherProps
}) {
  const classes = useStyles({ size, color });
  return (
    <TagAntd
      {...otherProps}
      className={classnames(classes.tagItem, className)}
      closable={closable}
      icon={icon}
      onClose={onClose}
    >
      {children}
    </TagAntd>
  );
});

Tag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  closable: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'active', 'danger', 'inactive', 'success', 'warning', 'info', 'active_contrast']),
  icon: PropTypes.element,
  onClose: PropTypes.func,
  size: PropTypes.oneOf(['extra-small', 'small', 'medium']),
  className: PropTypes.string,
};
Tag.defaultProps = {
  closable: false,
  color: 'primary',
  icon: undefined,
  onClose: undefined,
  size: 'medium',
  className: undefined,
};

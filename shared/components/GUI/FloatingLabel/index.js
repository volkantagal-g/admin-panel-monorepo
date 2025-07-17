import { memo } from 'react';

import PropTypes from 'prop-types';

import useStyles from './styles';

export const FloatingLabel = memo(function FloatingLabel({
  children,
  label,
}) {
  const classes = useStyles();
  return (
    <span className={classes.floatingLabelContainer}>
      {children}
      <span
        className="flabel"
      >
        {label}
      </span>
    </span>
  );
});

FloatingLabel.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
};
FloatingLabel.defaultProps = {
  children: undefined,
  label: '',
};

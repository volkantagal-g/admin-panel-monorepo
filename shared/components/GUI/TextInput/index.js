import { Input as InputAntd } from 'antd';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import classnames from 'classnames';

import useStyles from './styles';

import { FloatingLabel } from '../FloatingLabel';
import { FormItem, formItemDefaultPropTypes, formItemsDefaultProps } from '@shared/components/GUI/FormItem';

export const TextInput = memo(
  function TextInput({
    errors,
    hasForm,
    label,
    name,
    className,
    ...otherProps
  }) {
    const classes = useStyles({ label });

    const memoizedTextInput = useMemo(() => (
      <FloatingLabel label={label}>
        <InputAntd
          className={classnames(classes.textInput, className)}
          {...otherProps}
        />
      </FloatingLabel>
    ), [classes.textInput, label, otherProps, className]);

    if (hasForm) {
      return (
        <FormItem name={name} errors={errors}>
          {memoizedTextInput}
        </FormItem>
      );
    }
    return memoizedTextInput;
  },
);

TextInput.propTypes = {
  ...formItemDefaultPropTypes,
  autoComplete: PropTypes.oneOf(['off', 'on']),
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  hasForm: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
};

TextInput.defaultProps = {
  ...formItemsDefaultProps,
  autoComplete: 'off',
  defaultValue: undefined,
  disabled: false,
  errors: {},
  hasForm: true,
  label: undefined,
  onChange: undefined,
  onPressEnter: undefined,
  onFocus: undefined,
  onBlur: undefined,
  className: undefined,
};

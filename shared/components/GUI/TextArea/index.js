import { Input } from 'antd';

import PropTypes from 'prop-types';

import { memo, useMemo } from 'react';

import useStyles from './styles';

import { FloatingLabel } from '../FloatingLabel';
import { FormItem, formItemDefaultPropTypes, formItemsDefaultProps } from '@shared/components/GUI/FormItem';

const { TextArea: TextAreaAntd } = Input;

export const TextArea = memo(
  function TextArea({
    errors,
    hasForm,
    label,
    formLabel,
    name,
    rules,
    ...otherProps
  }) {
    const classes = useStyles({ label });

    const memoizedTextArea = useMemo(() => (
      <FloatingLabel label={label}>
        <TextAreaAntd
          rows={3}
          className={classes.textArea}
          {...otherProps}
        />
      </FloatingLabel>
    ), [classes.textArea, label, otherProps]);

    if (hasForm) {
      return (
        <FormItem
          name={name}
          errors={errors}
          rules={rules ?? undefined}
          label={formLabel}
          className={classes.label}
        >
          {memoizedTextArea}
        </FormItem>
      );
    }
    return memoizedTextArea;
  },
);

TextArea.propTypes = {
  ...formItemDefaultPropTypes,
  autoComplete: PropTypes.oneOf(['off', 'on']),
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  hasForm: PropTypes.bool,
  label: PropTypes.string,
  formLabel: PropTypes.node,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

TextArea.defaultProps = {
  ...formItemsDefaultProps,
  autoComplete: 'off',
  defaultValue: undefined,
  disabled: false,
  errors: {},
  hasForm: false,
  label: undefined,
  formLabel: undefined,
  onChange: undefined,
  onPressEnter: undefined,
  onFocus: undefined,
  onBlur: undefined,
};

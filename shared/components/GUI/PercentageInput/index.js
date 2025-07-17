import { InputNumber as InputAntd } from 'antd';
import PropTypes from 'prop-types';

import { memo, useMemo } from 'react';

import useStyles from './styles';

import { FloatingLabel } from '../FloatingLabel';
import { FormItem, formItemPropTypes, formItemsDefaultProps } from '@shared/components/GUI/FormItem';

export const PercentageInput = memo(
  function PercentageInput({
    errors,
    hasForm,
    label,
    name,
    ...otherProps
  }) {
    const classes = useStyles({ label });

    const memoizedTextInput = useMemo(() => (
      <FloatingLabel label={label}>
        <InputAntd
          className={classes.percentageInput}
          {...otherProps}
        />
      </FloatingLabel>
    ), [classes.percentageInput, label, otherProps]);

    if (hasForm) {
      return (
        <FormItem
          errors={errors}
          name={name}
        >
          {memoizedTextInput}
        </FormItem>
      );
    }
    return (memoizedTextInput);
  },
);
PercentageInput.propTypes = {
  ...formItemPropTypes,
  autoComplete: PropTypes.oneOf(['off', 'on']),
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  hasForm: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  prefix: PropTypes.string,
};
PercentageInput.defaultProps = {
  ...formItemsDefaultProps,
  autoComplete: 'off',
  defaultValue: undefined,
  disabled: false,
  errors: {},
  hasForm: true,
  label: undefined,
  onChange: undefined,
  onPressEnter: undefined,
  prefix: '%',
};

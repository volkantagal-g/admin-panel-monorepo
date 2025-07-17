import { InputNumber as InputNumberAntd } from 'antd';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';

import { FloatingLabel } from '../FloatingLabel';
import useStyles from './styles';
import { FormItem, formItemsDefaultProps, formItemDefaultPropTypes } from '@shared/components/GUI/FormItem';

const handleFormatter = (value, info) => {
  if (info?.input?.includes(',')) {
    return info?.input?.replace(/,/g, '.');
  }
  return value;
};

const handleParser = value => {
  if (value.includes(',')) {
    return value.replace(/,/g, '.');
  }
  return value;
};

export const NumberInput = memo(
  function NumberInput({
    errors,
    hasForm,
    label,
    name,
    ...otherProps
  }) {
    const classes = useStyles({ label });

    const memoizedNumberInput = useMemo(() => (
      <FloatingLabel label={label}>
        <InputNumberAntd
          className={classes.numberInput}
          {...otherProps}
        />
      </FloatingLabel>
    ), [classes.numberInput, label, otherProps]);

    if (hasForm) {
      return (
        <FormItem
          errors={errors}
          name={name}
        >
          {memoizedNumberInput}
        </FormItem>
      );
    }
    return (memoizedNumberInput);
  },
);

NumberInput.propTypes = {
  ...formItemDefaultPropTypes,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  formatter: PropTypes.func,
  hasForm: PropTypes.bool,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  parser: PropTypes.func,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.number,
};
NumberInput.defaultProps = {
  ...formItemsDefaultProps,
  defaultValue: undefined,
  disabled: false,
  errors: {},
  formatter: handleFormatter,
  hasForm: true,
  label: undefined,
  max: undefined,
  min: undefined,
  onChange: undefined,
  onPressEnter: undefined,
  parser: handleParser,
  step: undefined,
  value: undefined,
};

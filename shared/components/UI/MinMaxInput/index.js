import { useState, useEffect } from 'react';
import { get, max, min, debounce } from 'lodash';
import { Col, InputNumber, Row, Space } from 'antd';
import PropTypes from 'prop-types';

import { INPUT_DEBOUNCE_MS } from './constants';
import useStyles from './styles';

const MinMaxInput = ({
  selectedValues = {
    minValue: undefined,
    maxValue: undefined,
  },
  minLimit,
  maxLimit,
  minPlaceholder,
  maxPlaceholder,
  onChange,
  suffix,
  size,
  isDisabled,
}) => {
  const classes = useStyles();
  const [values, setValues] = useState(selectedValues);

  useEffect(() => {
    setValues({
      minValue: get(selectedValues, 'minValue', undefined),
      maxValue: get(selectedValues, 'maxValue', undefined),
    });
  }, [
    selectedValues.minValue,
    selectedValues.maxValue,
  ]);

  const handleOnChange = key => value => {
    const tempValue = value ?? undefined;
    const tempValues = {
      ...values,
      [key]: tempValue,
    };
    onChange(tempValues);
    setValues(tempValues);
  };

  const calculateMaxValueForMinInput = () => {
    if (values?.maxValue || values?.maxValue === 0) {
      return min([maxLimit, values.maxValue]);
    }
    return min([maxLimit, values.minValue]);
  };

  return (
    <Space direction="vertical" className={classes.wrapper}>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <InputNumber
            placeholder={suffix ? (`${minPlaceholder} ${suffix}`) : minPlaceholder}
            size={size}
            type="number"
            value={values.minValue}
            min={minLimit}
            max={calculateMaxValueForMinInput()}
            disabled={isDisabled}
            className={classes.numberInput}
            onChange={debounce(handleOnChange('minValue'), INPUT_DEBOUNCE_MS)}
          />
        </Col>
        <Col span={12}>
          <InputNumber
            placeholder={suffix ? (`${maxPlaceholder} ${suffix}`) : maxPlaceholder}
            size={size}
            type="number"
            value={values.maxValue}
            min={max([minLimit, values.minValue])}
            max={maxLimit}
            disabled={isDisabled}
            className={[classes.numberInput, classes.rightInput]}
            onChange={debounce(handleOnChange('maxValue'), INPUT_DEBOUNCE_MS)}
          />
        </Col>
      </Row>
    </Space>
  );
};

MinMaxInput.propTypes = {
  minLimit: PropTypes.number,
  maxLimit: PropTypes.number,
  minPlaceholder: PropTypes.string,
  maxPlaceholder: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.string,
  suffix: PropTypes.string,
  isDisabled: PropTypes.bool,
};

MinMaxInput.defaultProps = {
  minLimit: undefined,
  maxLimit: undefined,
  minPlaceholder: 'Min',
  maxPlaceholder: 'Max',
  onChange: () => undefined,
  size: 'middle',
  suffix: undefined,
  isDisabled: false,
};
export default MinMaxInput;

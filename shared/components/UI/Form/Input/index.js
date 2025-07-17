import { Form, Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';

import useStyles from './styles';
import { currency } from '@shared/utils/common';
import { percentFormat } from '@shared/utils/localization';

const { Item } = Form;

function InputWrapper(props) {
  const classes = useStyles();

  const {
    inputKey,
    label,
    value,
    isTouched,
    hasError,
    handleChange,
    mode,
    format,
    disabled,
    setFieldValue,
    additionalProps,
    setDefaultValue,
    placeholder,
  } = props;

  const getBaseInputComponent = () => {
    switch (mode) {
      case 'textarea':
        return Input.TextArea;
      case 'number':
        return InputNumber;
      default:
        return Input;
    }
  };

  const BaseInputComponent = getBaseInputComponent(mode);

  const formatter = formatValue => {
    return `${currency()} ${formatValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parser = parserValue => {
    const regExp = new RegExp(`\\${currency()}\\s?|(,*)`, 'g');
    return parserValue.replace(regExp, '');
  };

  const percentageFormatter = formatValue => {
    if (formatValue && formatValue[formatValue.length - 1] === '.') {
      return formatValue;
    }
    return percentFormat().format(formatValue / 100);
  };

  const percentageParser = parserValue => {
    return parserValue.replace(/%|(,*)/g, '');
  };

  const getExtraProps = () => {
    switch (mode) {
      case 'textarea':
        return {
          autoSize: { minRows: 1, maxRows: 4 },
          rows: 4,
        };
      case 'number':
        if (format === 'price') {
          return {
            min: 0,
            formatter,
            parser,
          };
        }
        if (additionalProps?.canBeNegative) {
          return {};
        }
        if (format === 'percentage') {
          return {
            min: 0,
            max: 100,
            formatter: percentageFormatter,
            parser: percentageParser,
          };
        }
        return { min: 0 };
      default:
        return {};
    }
  };

  const extraProps = getExtraProps();

  const handleInputChange = inputEvent => {
    if (mode === 'number') {
      return setFieldValue(inputKey, inputEvent);
    }
    return handleChange(inputEvent);
  };

  return (
    <Item
      help={isTouched && hasError}
      validateStatus={isTouched && hasError ? 'error' : 'success'}
      name={inputKey}
      label={label}
      className={classes.inputWrapper}
    >
      <BaseInputComponent
        value={value}
        {...(setDefaultValue && { defaultValue: value })}
        onChange={handleInputChange}
        disabled={disabled}
        className={classes.inputBase}
        placeholder={placeholder}
        {...extraProps}
        {...additionalProps}
      />
    </Item>
  );
}

InputWrapper.propTypes = {
  inputKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  isTouched: PropTypes.bool,
  hasError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  handleChange: PropTypes.func,
  mode: PropTypes.string,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  setFieldValue: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  additionalProps: PropTypes.object,
  setDefaultValue: PropTypes.bool,
};

InputWrapper.defaultProps = {
  inputKey: '',
  label: '',
  value: '',
  isTouched: false,
  hasError: false,
  handleChange: () => { },
  mode: '',
  format: '',
  disabled: false,
  setFieldValue: () => { },
  additionalProps: {},
  setDefaultValue: true,
};

InputWrapper.defaultProps = {
  inputKey: '',
  label: '',
  value: '',
  isTouched: false,
  hasError: false,
  handleChange: () => {},
  setFieldValue: () => {},
  mode: '',
  disabled: false,
};
export default InputWrapper;

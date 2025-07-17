import PropTypes from 'prop-types';
import { DatePicker, Form } from 'antd';

import useStyles from './styles';

const { Item } = Form;

function DatePickerWrapper(props) {
  const {
    selectKey,
    label,
    value,
    isTouched,
    hasError,
    showTime,
    onChangeCallback,
    disabled,
    allowClear,
    format,
    suffixIcon,
    setDefaultValue,
    disabledDate,
    dataTestId,
  } = props;
  const classes = useStyles();

  return (
    <Item
      help={isTouched && hasError}
      validateStatus={isTouched && hasError ? 'error' : 'success'}
      name={selectKey}
      label={label}
      className={classes.datePickerWrapper}
    >
      <DatePicker
        data-testid={dataTestId}
        disabledDate={disabledDate}
        onChange={onChangeCallback}
        value={value}
        showTime={showTime}
        {...(setDefaultValue && { defaultValue: value })} // TODO refactor here, there is a warning in the console
        disabled={disabled}
        className={classes.datePicker}
        allowClear={allowClear}
        format={format}
        suffixIcon={suffixIcon}
      />
    </Item>
  );
}

DatePickerWrapper.propTypes = {
  selectKey: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  isTouched: PropTypes.bool,
  hasError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChangeCallback: PropTypes.func,
  disabled: PropTypes.bool,
  showTime: PropTypes.bool,
  allowClear: PropTypes.bool,
  suffixIcon: PropTypes.element,
  setDefaultValue: PropTypes.bool,
  format: PropTypes.string,
};

DatePickerWrapper.defaultProps = {
  selectKey: '',
  label: '',
  value: {},
  isTouched: false,
  hasError: false,
  showTime: false,
  onChangeCallback: () => null,
  disabled: false,
  allowClear: false,
  format: undefined,
  suffixIcon: undefined,
  setDefaultValue: true,
};

export default DatePickerWrapper;

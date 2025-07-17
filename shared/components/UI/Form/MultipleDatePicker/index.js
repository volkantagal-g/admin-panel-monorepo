import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Tag, Select, DatePicker, Form } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';

import useStyles from './styles';

const { Item } = Form;

function MultipleDatePickerWrapper(props) {
  const {
    selectKey = '',
    label = '',
    value = [],
    isTouched = false,
    hasError = false,
    onChangeCallback = () => {},
    disabled = false,
    disabledDate = () => false,
    allowClear = false,
    format = 'YYYY/MM/DD',
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const selectRef = useRef();
  const pickerRef = useRef();
  const getFormattedDate = useCallback(date => moment(date).format(format), [format]);
  const findDateIndex = useCallback(date => value?.map(getFormattedDate).indexOf(getFormattedDate(date)), [value, getFormattedDate]);

  const onValueChange = date => {
    if (!value) {
      return;
    }
    const index = findDateIndex(date);
    const clone = [...value];
    if (index > -1) {
      clone.splice(index, 1);
    }
    else {
      clone.push(moment(date));
    }
    if (onChangeCallback) {
      onChangeCallback(clone);
    }
  };

  const renderTag = ({ value: tagValue, onClose }) => {
    const handleClose = () => {
      onClose();
      if (onChangeCallback) {
        const index = findDateIndex(tagValue);
        const clone = [...value];
        clone.splice(index, 1);
        onChangeCallback(clone);
      }
    };
    return (
      <Tag onClose={handleClose} closable>
        {getFormattedDate(tagValue)}
      </Tag>
    );
  };

  const renderDate = currentDate => {
    const isSelected = findDateIndex(currentDate) > -1;
    return <div className={`${isSelected && classes.selectedCell} ant-picker-cell-inner`}>{currentDate.date()}</div>;
  };

  const renderDatePicker = () => (
    <div ref={pickerRef} className={classes.datePickerContainer}>
      {pickerRef?.current && (
        <DatePicker
          onChange={onValueChange}
          disabled={disabled}
          disabledDate={disabledDate}
          className={classes.datePicker}
          allowClear={allowClear}
          format={format}
          showToday={false}
          open
          dateRender={renderDate}
          getPopupContainer={() => pickerRef.current}
        />
      )}
    </div>
  );

  return (
    <Item
      help={isTouched && hasError}
      validateStatus={isTouched && hasError ? 'error' : 'success'}
      name={selectKey}
      label={label}
      className={classes.datePickerWrapper}
    >
      <div ref={selectRef} key={selectKey} className={classes.selectWrapper}>
        <Select
          allowClear={allowClear}
          mode="multiple"
          value={value}
          onClear={() => onChangeCallback && onChangeCallback([])}
          tagRender={renderTag}
          open={open}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          getPopupContainer={() => selectRef.current}
          suffixIcon={<CalendarOutlined />}
          showArrow
          dropdownMatchSelectWidth={false}
          disabled={disabled}
          dropdownRender={renderDatePicker}
        />
      </div>
    </Item>
  );
}

MultipleDatePickerWrapper.propTypes = {
  selectKey: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  isTouched: PropTypes.bool,
  hasError: PropTypes.bool,
  onChangeCallback: PropTypes.func,
  disabled: PropTypes.bool,
  disabledDate: PropTypes.func,
  allowClear: PropTypes.bool,
  format: PropTypes.string,
};

// TODO: correct these default props
MultipleDatePickerWrapper.defaultProps = {
  selectKey: undefined,
  label: undefined,
  value: undefined,
  isTouched: undefined,
  hasError: undefined,
  onChangeCallback: undefined,
  disabled: undefined,
  disabledDate: undefined,
  allowClear: undefined,
  format: undefined,
};

export default MultipleDatePickerWrapper;

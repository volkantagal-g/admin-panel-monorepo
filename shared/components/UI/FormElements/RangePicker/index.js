import { DatePicker, Form } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';

import { VALIDATE_STATUS } from '@shared/shared/constants';
import { defaultFormat } from '@shared/utils/dateHelper';
import useStyles from '@shared/components/UI/FormElements/RangePicker/styles';

const { Item } = Form;
const { RangePicker } = DatePicker;

function RangePickerItem({
  errors,
  disabled,
  format,
  hasForm,
  label,
  name,
  onChangeCallback,
  picker,
  showTime,
  value,
  ...otherProps
}) {
  const classes = useStyles();
  const renderRangerPicker = () => (
    <RangePicker
      className={classes.rangePickerItem}
      defaultValue={value}
      disabled={disabled}
      format={format}
      onChange={onChangeCallback}
      showTime={showTime}
      picker={picker}
      {...otherProps}
    />

  );
  if (hasForm) {
    return (
      <Item
        help={errors && get(errors, name)}
        label={label}
        name={name}
        validateStatus={errors && get(errors, name) ? VALIDATE_STATUS.ERROR : VALIDATE_STATUS.SUCCESS}
      >
        {renderRangerPicker()}
      </Item>
    );
  }
  return (
    <>
      {renderRangerPicker()}
    </>
  );
}

RangePickerItem.propTypes = {
  allowEmpty: PropTypes.bool,
  defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
  disabled: PropTypes.bool,
  errors: PropTypes.bool,
  format: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  hasForm: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  picker: PropTypes.string,
  placement: PropTypes.oneOf([
    'topLeft', 'topRight', 'bottomLeft', 'bottomRight',
  ]),
  showTime: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
};
RangePickerItem.defaultProps = {
  allowEmpty: true,
  defaultValue: [],
  disabled: false,
  errors: false,
  format: defaultFormat,
  hasForm: true,
  label: ' ',
  name: '',
  onChange: () => {},
  picker: '',
  placement: 'bottomLeft',
  showTime: false,
  value: [],
};

export default RangePickerItem;

import { DatePicker as DatePickerAntd } from 'antd';
import { memo, useMemo } from 'react';
import { CalendarTwoTone } from '@ant-design/icons';

import PropTypes from 'prop-types';

import { primary } from '@shared/components/GUI/styles/guiThemes';

import useStyles from './styles';
import { FormItem, formItemPropTypes, formItemsDefaultProps } from '@shared/components/GUI/FormItem';

const { RangePicker: RangePickerAntd } = DatePickerAntd;
export const RangePicker = memo(function RangePicker({ errors, hasForm, name, ...otherProps }) {
  const classes = useStyles();

  const memoizedRangePicker = useMemo(() => (
    <RangePickerAntd
      className={classes.rangepicker}
      getPopupContainer={trigger => trigger?.parentNode}
      suffixIcon={<CalendarTwoTone className={classes.icon} twoToneColor={primary} />}
      {...otherProps}
    />
  ), [classes.icon, classes.rangepicker, otherProps]);

  if (hasForm) {
    return (
      <FormItem errors={errors} name={name}>
        {memoizedRangePicker}
      </FormItem>
    );
  }

  return memoizedRangePicker;
});

RangePicker.propTypes = {
  ...formItemPropTypes,
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledDate: PropTypes.func,
  disabledTime: PropTypes.func,
  hasForm: PropTypes.bool,
  mode: PropTypes.oneOf(['time', 'date', 'month', 'year', 'decade']),
  showTime: PropTypes.oneOfType([PropTypes.bool, PropTypes.objectOf(PropTypes.any)]),
  onCalendarChange: PropTypes.func,
  onChange: PropTypes.func,
  onOpenChange: PropTypes.func,
  onPanelChange: PropTypes.func,
};

RangePicker.defaultProps = {
  ...formItemsDefaultProps,
  allowClear: true,
  disabled: false,
  disabledDate: undefined,
  disabledTime: undefined,
  hasForm: true,
  mode: undefined,
  showTime: false,
  onCalendarChange: undefined,
  onChange: undefined,
  onOpenChange: undefined,
  onPanelChange: undefined,
};

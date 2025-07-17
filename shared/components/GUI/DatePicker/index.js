import { memo, useMemo } from 'react';
import { DatePicker as DatePickerAntd } from 'antd';

import { CalendarTwoTone } from '@ant-design/icons';

import PropTypes from 'prop-types';

import useStyles from './styles';
import { FormItem, formItemDefaultPropTypes, formItemsDefaultProps } from '@shared/components/GUI/FormItem';
import { primary } from '@shared/components/GUI/styles/guiThemes';

export const DatePicker = memo(function DatePicker({ errors, hasForm, name, ...otherProps }) {
  const classes = useStyles();

  const memoizedDatePicker = useMemo(() => (
    <DatePickerAntd
      className={classes.datepicker}
      getPopupContainer={trigger => trigger?.parentNode}
      suffixIcon={<CalendarTwoTone className={classes.icon} twoToneColor={primary} />}
      {...otherProps}
    />
  ), [classes.datepicker, classes.icon, otherProps]);

  if (hasForm) {
    return (
      <FormItem name={name} errors={errors}>
        {memoizedDatePicker}
      </FormItem>
    );
  }
  return (
    memoizedDatePicker
  );
});

DatePicker.propTypes = {
  ...formItemDefaultPropTypes,
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledDate: PropTypes.func,
  disabledTime: PropTypes.func,
  hasForm: PropTypes.bool,
  mode: PropTypes.oneOf(['time', 'date', 'month', 'year', 'decade']),
  showTime: PropTypes.oneOfType([PropTypes.bool, PropTypes.objectOf(PropTypes.any)]),
  onChange: PropTypes.func,
  onOk: PropTypes.func,
  onPanelChange: PropTypes.func,
};

DatePicker.defaultProps = {
  ...formItemsDefaultProps,
  allowClear: true,
  disabled: false,
  disabledDate: undefined,
  disabledTime: undefined,
  hasForm: true,
  mode: undefined,
  showTime: false,
  onChange: undefined,
  onOk: undefined,
  onPanelChange: undefined,
};

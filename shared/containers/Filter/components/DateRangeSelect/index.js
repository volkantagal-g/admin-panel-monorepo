import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'antd';

import { Creators } from '@shared/containers/Filter/redux/actions';
import { getSelectedDateRange } from '@shared/containers/Filter/redux/selectors';
import { getDisabledDates } from '@shared/containers/Filter/utils';
import { useValidateState } from '@shared/containers/Filter/hooks/useValidateState';

const { RangePicker } = DatePicker;

const DateRangeSelect = ({ filterKey, allowClear, onChange, className }) => {
  const dispatch = useDispatch();

  const stateSelector = getSelectedDateRange;
  const { startDate, endDate } = useSelector(stateSelector(filterKey));

  useValidateState({
    filterKey,
    componentName: 'DateRangeSelect',
  });

  const onDateRangeChange = dates => {
    const [newStartDate, newEndDate] = dates;

    dispatch(
      Creators.setSelectedDateRange({
        selectedDateRange: {
          startDate: newStartDate.startOf('day'),
          endDate: newEndDate.endOf('day'),
        },
        filterKey,
      }),
    );

    if (onChange) onChange(dates);
  };

  return (
    <RangePicker
      disabledDate={getDisabledDates}
      onChange={onDateRangeChange}
      value={[startDate, endDate]}
      className={className}
      allowClear={allowClear}
    />
  );
};

DateRangeSelect.defaultProps = { allowClear: false };

DateRangeSelect.propTypes = {
  allowClear: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default DateRangeSelect;

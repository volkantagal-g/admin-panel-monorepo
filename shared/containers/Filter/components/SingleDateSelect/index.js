import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { DatePicker } from 'antd';

import { Creators } from '../../redux/actions';
import { getSelectedDateRange } from '../../redux/selectors';
import { getDisabledDates } from '../../utils';
import { useValidateState } from '@shared/containers/Filter/hooks/useValidateState';

const SingleDateSelect = ({ filterKey, defaultDate = moment(), allowClear, onChange, className, disabledDates = getDisabledDates, showToday = true }) => {
  const dispatch = useDispatch();

  const stateSelector = getSelectedDateRange;
  const { endDate } = useSelector(stateSelector(filterKey));

  useValidateState({
    filterKey,
    componentName: 'SingleDateSelect',
  });

  const onDateRangeChange = useCallback(
    date => {
      dispatch(
        Creators.setSelectedDateRange({
          selectedDateRange: {
            startDate: moment(date).startOf('day'),
            endDate: moment(date).endOf('day'),
          },
          filterKey,
        }),
      );

      if (onChange) onChange(date);
    },
    [dispatch, filterKey, onChange],
  );

  const initialRenderRef = useRef();
  useEffect(() => {
    if (!initialRenderRef.current) {
      // To initialize the state on redux store
      onDateRangeChange(defaultDate);
      initialRenderRef.current = true;
    }
  }, [defaultDate, onDateRangeChange]);

  return (
    <DatePicker
      disabledDate={disabledDates}
      onChange={onDateRangeChange}
      value={endDate}
      className={className}
      allowClear={allowClear}
      showToday={showToday}
    />
  );
};

export default SingleDateSelect;

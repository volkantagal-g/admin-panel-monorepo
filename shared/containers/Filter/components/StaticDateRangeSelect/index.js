import { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import { Radio } from 'antd';

import { getSelectedDateRange } from "@shared/containers/Filter/redux/selectors";
import { Creators } from '@shared/containers/Filter/redux/actions';
import { useValidateState } from "@shared/containers/Filter/hooks/useValidateState";
import { radioButtonOptionDateDiffs } from "@shared/containers/Filter/constants";

const { Group: RadioGroup, Button: RadioButton } = Radio;

const StaticDateRangeSelect = ({ filterKey, onChange, groupClassName, buttonClassName }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('global');

  useValidateState({
    filterKey,
    componentName: 'StaticDateRangeSelect',
  });

  const stateSelector = getSelectedDateRange;
  const { startDate } = useSelector(stateSelector(filterKey));

  const today = moment().startOf('day');

  const selectedRadioButton = useMemo(() => {
    const selectedRadioButtonKey = Object.keys(radioButtonOptionDateDiffs).find(key => {
      const diff = radioButtonOptionDateDiffs[key];
      return moment(today).diff(startDate, 'days') === diff && key;
    });
    return selectedRadioButtonKey;
  }, [startDate, today]);

  const radioButtonOptionValues = Object.keys(radioButtonOptionDateDiffs).map(key => ({
    label: t(key.toUpperCase()),
    value: key,
  }));

  const onDateChange = useCallback(e => {
    const inputValue = e.target.value;

    const diff = radioButtonOptionDateDiffs[inputValue];

    const selectedDate = diff
      ? moment(today).subtract(radioButtonOptionDateDiffs[inputValue], 'days')
      : today;

    const newStartDate = selectedDate;
    const newEndDate = selectedDate === today
      ? moment(today).endOf('day')
      : moment(today).subtract(1, 'days').endOf('day');

    dispatch(Creators.setSelectedDateRange({ selectedDateRange: { startDate: newStartDate, endDate: newEndDate }, filterKey }));

    if (onChange) onChange(inputValue);
  }, [dispatch, filterKey, onChange, today]);

  return (
    <RadioGroup
      value={selectedRadioButton}
      onChange={onDateChange}
      className={groupClassName}
    >
      {radioButtonOptionValues.map(radioButtonOptionValue => (
        <RadioButton
          key={radioButtonOptionValue.value}
          value={radioButtonOptionValue.value}
          className={buttonClassName}
        >
          {radioButtonOptionValue.label}
        </RadioButton>
      ))}
    </RadioGroup>
  );
};

StaticDateRangeSelect.propTypes = {
  onChange: PropTypes.func,
  buttonClassName: PropTypes.string,
  groupClassName: PropTypes.string,
};

export default StaticDateRangeSelect;

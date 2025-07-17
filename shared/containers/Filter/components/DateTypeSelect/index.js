import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Radio } from 'antd';

import { getSelectedDateType } from "@shared/containers/Filter/redux/selectors";
import { Creators } from '@shared/containers/Filter/redux/actions';
import { radioButtonOptionDateTypes } from '@shared/containers/Filter/constants';
import { DATE_TYPE_STRING } from '@shared/shared/constants';
import { useValidateState } from "@shared/containers/Filter/hooks/useValidateState";

const { Group: RadioGroup, Button: RadioButton } = Radio;

const DateTypeSelect = ({ filterKey, onChange, groupClassName, buttonClassName }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('global');

  useValidateState({
    filterKey,
    componentName: 'DateTypeSelect',
  });

  const stateSelector = getSelectedDateType;
  const dateType = useSelector(stateSelector(filterKey));

  const radioButtonOptionValues = radioButtonOptionDateTypes.map(key => ({
    label: t(DATE_TYPE_STRING[key].toUpperCase()),
    value: key,
  }));

  const onDateChange = useCallback(e => {
    const dateType = e.target.value;

    dispatch(Creators.setDateType({ dateType, filterKey }));

    if (onChange) onChange(dateType);
  }, [dispatch, filterKey, onChange]);

  return (
    <RadioGroup
      value={dateType}
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

DateTypeSelect.propTypes = {
  onChange: PropTypes.func,
  buttonClassName: PropTypes.string,
  groupClassName: PropTypes.string,
};

export default DateTypeSelect;

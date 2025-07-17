import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Select } from 'antd';
import { first } from 'lodash';

import { t } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';
import { selectOptionsSearch, convertSelectOptions } from '@shared/utils/common';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators } from './redux/actions';
import { getQualityDepartmentPeopleSelector } from './redux/selectors';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyles from './styles';

const SelectQualityDepartmentPeople = ({
  value,
  onChange,
  disabled,
  allowClear = true,
  isFirstOptionSelected = false,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const qualityDepartmentPeopleData = useSelector(getQualityDepartmentPeopleSelector.getData);
  const isPending = useSelector(getQualityDepartmentPeopleSelector.getIsPending);

  const [qualityDepartmentPeopleSelectOptions, setQualityDepartmentPeopleSelectOptions] = useState([]);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getQualityDepartmentPeopleRequest());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    const options = convertSelectOptions(qualityDepartmentPeopleData, { valueKey: '_id', labelKey: 'fullName' });
    setQualityDepartmentPeopleSelectOptions(options);
    if (isFirstOptionSelected) {
      const firstOption = first(options);
      onChange(firstOption?.value);
    }
  }, [qualityDepartmentPeopleData, isFirstOptionSelected, onChange]);

  return (
    <Select
      value={value}
      options={qualityDepartmentPeopleSelectOptions}
      onChange={onChange}
      allowClear={allowClear}
      showSearch
      filterOption={selectOptionsSearch}
      disabled={disabled || isPending}
      placeholder={t('global:FILTER')}
      className={classes.qualityDepartmentPeopleSelect}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.QUALITY_DEPARTMENT_PEOPLE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectQualityDepartmentPeople);

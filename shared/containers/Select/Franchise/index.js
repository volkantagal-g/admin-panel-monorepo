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
import { getFranchisesSelector } from './redux/selectors';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { SELECT_ALL_OPTION } from './constants';
import useStyles from './styles';

const SelectFranchise = ({
  value,
  onChange,
  disabled,
  allowClear = true,
  isFirstOptionSelected = false,
  isMultiple = false,
  placeholder = t('FILTER'),
  datatestid,
  showArrow = true,
  showAllOption = false,
  isActivated = undefined,
  className,
  cityIds,
  isFormDynamic = false,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const franchises = useSelector(getFranchisesSelector.getData);
  const isPending = useSelector(getFranchisesSelector.getIsPending);

  const [franchiseSelectOptions, setFranchiseSelectOptions] = useState([]);
  const [otherProps, setOtherProps] = useState({});

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getFranchisesRequest({ isActivated, cities: cityIds }));

    return () => {
      if (!isFormDynamic) {
        dispatch(Creators.destroyContainer());
      }
    };
  }, [dispatch, isActivated, cityIds, isFormDynamic]);

  useEffect(() => {
    if (isMultiple) {
      setOtherProps(prevState => {
        return {
          ...prevState,
          mode: 'multiple',
        };
      });
    }
  }, [isMultiple]);

  useEffect(() => {
    const options = convertSelectOptions(franchises, { valueKey: '_id', labelKey: 'name' });
    if (showAllOption && isMultiple) {
      options.unshift({ value: SELECT_ALL_OPTION, label: t('SELECT_ALL') });
    }
    setFranchiseSelectOptions(options);
    if (isFirstOptionSelected) {
      const firstOption = first(options);
      onChange(firstOption?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [franchises, isFirstOptionSelected]);

  const handleOnChange = selectedFranchises => {
    if (selectedFranchises?.includes(SELECT_ALL_OPTION)) {
      if (selectedFranchises.length === franchises.length + 1) {
        onChange([]);
      }
      else {
        onChange(franchises.map(item => item._id));
      }
    }
    else {
      onChange(selectedFranchises);
    }
  };

  return (
    <Select
      data-testid={datatestid}
      value={value}
      options={franchiseSelectOptions}
      onChange={handleOnChange}
      allowClear={allowClear}
      showSearch
      filterOption={selectOptionsSearch}
      disabled={disabled || isPending}
      placeholder={placeholder}
      className={`${classes.franchiseSelect} ${className || ''}`}
      showArrow={showArrow}
      {...otherProps}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.FRANCHISE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectFranchise);

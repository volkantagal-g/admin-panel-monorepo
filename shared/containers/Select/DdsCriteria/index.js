import { useState, useEffect, useCallback } from 'react';
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
import { getDdsCriteriaSelector } from './redux/selectors';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyles from './styles';

const SelectDdsCriteria = ({
  value,
  onChange,
  disabled,
  allowClear = true,
  isMultiple = false,
  isFirstOptionSelected = false,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const ddsCriteriaList = useSelector(getDdsCriteriaSelector.getData);
  const isPending = useSelector(getDdsCriteriaSelector.getIsPending);

  const [ddsCriteriaSelectOptions, setDdsCriteriaSelectOptions] = useState([]);
  const [otherProps, setOtherProps] = useState({});

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getDdsCriteriaRequest());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  const checkFirstOption = useCallback(options => {
    if (isFirstOptionSelected) {
      const firstOption = first(options);
      onChange(firstOption?.value);
    }
  }, [isFirstOptionSelected, onChange]);

  useEffect(() => {
    const options = convertSelectOptions(ddsCriteriaList, {
      valueKey: 'id',
      labelKey: 'name',
      isTranslation: true,
      isData: true,
    });
    setDdsCriteriaSelectOptions(options);
    checkFirstOption(options);
  }, [ddsCriteriaList, checkFirstOption]);

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

  return (
    <Select
      value={value}
      options={ddsCriteriaSelectOptions}
      onChange={onChange}
      allowClear={allowClear}
      showSearch
      filterOption={selectOptionsSearch}
      disabled={disabled || isPending}
      placeholder={t('global:FILTER')}
      className={classes.wrapper}
      {...otherProps}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.DDS_CRITERIA;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectDdsCriteria);

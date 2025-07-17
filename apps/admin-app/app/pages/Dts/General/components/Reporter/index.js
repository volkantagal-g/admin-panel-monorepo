import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { compose } from 'redux';

import { orderBy, uniqBy } from 'lodash';

import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { REDUX_KEY } from '@shared/shared/constants';
import { selectOptionsSearch, convertSelectOptions } from '@shared/utils/common';
import { t } from '@shared/i18n';
import useStyles from './styles';
import { reportersSelector } from './redux/selectors';

const SelectReporters = ({
  value,
  onChange,
  isDisabled,
  allowClear = true,
  isMultiple = false,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const reporters = useSelector(reportersSelector.getData);
  const isPending = useSelector(reportersSelector.getIsPending);

  const [reportersSelectOptions, setReportersSelectOptions] = useState([]);
  const [mode, setMode] = useState('');

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getReportersRequest());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    let options = convertSelectOptions(reporters, { valueKey: 'workEmail', labelKey: 'fullName' });
    options = uniqBy(orderBy(options, ['label'], ['asc']), 'label');
    setReportersSelectOptions(options);
  }, [reporters]);

  useEffect(() => {
    if (isMultiple) {
      setMode('multiple');
    }
  }, [isMultiple]);

  return (
    <Select
      value={value}
      options={reportersSelectOptions}
      onChange={onChange}
      mode={mode}
      showSearch
      filterOption={selectOptionsSearch}
      disabled={isDisabled || isPending}
      allowClear={allowClear}
      placeholder={t('global:FILTER')}
      className={classes.warehouseSelect}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.REPORTERS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectReporters);

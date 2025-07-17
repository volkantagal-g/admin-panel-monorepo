import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Select } from 'antd';
import { first } from 'lodash';

import { selectOptionsSearch, convertSelectOptions } from '@shared/utils/common';
import { Creators } from './redux/actions';
import { getCrisesTopicsSelector } from './redux/selectors';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { t } from '@shared/i18n';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import injectReducer from '@shared/utils/injectReducer';
import useStyles from './styles';

const SelectCrisisTopic = ({
  value,
  onChange,
  disabled,
  allowClear = true,
  isFirstOptionSelected = false,
  placeholder,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const crisisTopicsData = useSelector(getCrisesTopicsSelector.getData);
  const isPending = useSelector(getCrisesTopicsSelector.getIsPending);

  const [crisisTopicsOptions, setCrisisTopicsOptions] = useState([]);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getCrisisTopicsRequest());
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    const options = convertSelectOptions(crisisTopicsData, { valueKey: '_id', labelKey: 'name', isTranslation: true });
    setCrisisTopicsOptions(options);
    if (isFirstOptionSelected) {
      const firstOption = first(options);
      onChange(firstOption?.value);
    }
  }, [crisisTopicsData, isFirstOptionSelected, onChange]);

  return (
    <Select
      value={value}
      className={classes.topicSelection}
      showSearch
      options={crisisTopicsOptions}
      allowClear={allowClear}
      onChange={onChange}
      disabled={disabled || isPending}
      filterOption={selectOptionsSearch}
      placeholder={placeholder || t('FILTER')}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.CRISIS_TOPIC;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

SelectCrisisTopic.defaultProps = {
  value: '',
  onChange: () => undefined,
  disabled: undefined,
  allowClear: undefined,
  isFirstOptionSelected: undefined,
  placeholder: undefined,
};

SelectCrisisTopic.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  allowClear: PropTypes.bool,
  isFirstOptionSelected: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default compose(withReducer, withSaga)(SelectCrisisTopic);

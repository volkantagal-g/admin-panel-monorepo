import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Select } from 'antd';
import { compose } from 'redux';
import { get, orderBy, uniqBy } from 'lodash';

import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { ruleSelector } from './redux/selector';
import { REDUX_KEY } from '@shared/shared/constants';
import { convertSelectOptions } from '@shared/utils/common';
import { t } from '@shared/i18n';
import useStyles from './styles';

const SelectRule = ({
  value,
  onChangeCallback,
  disabled,
  fieldName,
  formik = {},
  isMultiple = false,
  allowClear = false,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const rules = useSelector(ruleSelector.getData);
  const isPending = useSelector(ruleSelector.getIsPending);

  const [ruleSelectOptions, setRuleSelectOptions] = useState([]);
  const [mode, setMode] = useState('');
  const { errors } = formik;

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getRuleRequest());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    let options = convertSelectOptions(rules, { valueKey: '_id', labelKey: 'ruleNumber', isData: true });
    options = uniqBy(orderBy(options, ['label'], ['asc']), 'label');
    setRuleSelectOptions(options);
  }, [rules]);

  useEffect(() => {
    if (isMultiple) {
      setMode('multiple');
    }
  }, [isMultiple]);

  const selectOptionsNumberSearch = (input, option) => {
    return option.label.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Form.Item
      help={get(errors, fieldName)}
      validateStatus={get(errors, fieldName) ? 'error' : 'success'}
      name={fieldName}
      className={get(errors, fieldName) ? '' : 'mb-2'}
    >
      <Select
        value={value}
        options={ruleSelectOptions}
        onChange={onChangeCallback}
        mode={mode}
        allowClear={allowClear}
        showSearch
        filterOption={selectOptionsNumberSearch}
        disabled={disabled || isPending}
        placeholder={t('global:FILTER')}
        className={classes.wrapper}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.DTS.GENERAL.SELECT_RULE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectRule);

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Select } from 'antd';
import { compose } from 'redux';
import { get } from 'lodash';

import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { feedbackSourceSelector } from './redux/selector';
import { REDUX_KEY } from '@shared/shared/constants';
import { selectOptionsSearch, convertSelectOptions } from '@shared/utils/common';
import { t } from '@shared/i18n';
import useStyles from './styles';

const SelectFeedbackSource = ({
  value,
  onChangeCallback,
  disabled,
  fieldName,
  formik = {},
  isMultiple = false,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const feedbackSources = useSelector(feedbackSourceSelector.getData);
  const isPending = useSelector(feedbackSourceSelector.getIsPending);

  const [feedbackSourceSelectOptions, setFeedbackSourceSelectOptions] = useState([]);
  const [mode, setMode] = useState('');
  const { errors } = formik;

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getFeedbackSourceRequest());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    const options = convertSelectOptions(feedbackSources, { valueKey: '_id', labelKey: 'title', isTranslation: true });
    setFeedbackSourceSelectOptions(options);
  }, [feedbackSources]);

  useEffect(() => {
    if (isMultiple) {
      setMode('multiple');
    }
  }, [isMultiple]);

  return (
    <Form.Item
      help={get(errors, fieldName)}
      validateStatus={get(errors, fieldName) ? 'error' : 'success'}
      name={fieldName}
      className={get(errors, fieldName) ? '' : 'mb-2'}
    >
      <Select
        value={value}
        options={feedbackSourceSelectOptions}
        onChange={onChangeCallback}
        mode={mode}
        filterOption={selectOptionsSearch}
        disabled={disabled || isPending}
        placeholder={t('global:FILTER')}
        className={classes.wrapper}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.DTS.GENERAL.SELECT_FEEDBACK_SOURCE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectFeedbackSource);

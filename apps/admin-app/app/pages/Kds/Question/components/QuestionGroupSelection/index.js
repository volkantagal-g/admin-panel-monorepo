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
import { getQuestionGroupListSelector } from './redux/selectors';
import { REDUX_KEY } from '@shared/shared/constants';
import { selectOptionsSearch, convertSelectOptions } from '@shared/utils/common';
import { t } from '@shared/i18n';
import useStyles from './styles';

const SelectKdsQuestionGroup = ({
  value,
  onChangeCallback,
  disabled,
  fieldName,
  formik,
}) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const questionGroupList = useSelector(getQuestionGroupListSelector.getData);
  const isPending = useSelector(getQuestionGroupListSelector.getIsPending);

  const [questionGroupSelectOptions, setQuestionGroupSelectOptions] = useState([]);

  const { errors } = formik;

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getQuestionGroupListRequest());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    const options = convertSelectOptions(questionGroupList, { valueKey: '_id', labelKey: 'name', isTranslation: true });
    setQuestionGroupSelectOptions(options);
  }, [questionGroupList]);

  return (
    <Form.Item
      help={get(errors, fieldName)}
      validateStatus={get(errors, fieldName) ? 'error' : 'success'}
      name={fieldName}
      className={get(errors, fieldName) ? '' : 'mb-2'} >
      <Select
        value={value}
        options={questionGroupSelectOptions}
        onChange={onChangeCallback}
        showSearch
        filterOption={selectOptionsSearch}
        disabled={disabled || isPending}
        placeholder={t("global:FILTER")}
        className={classes.wrapper}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.KDS.QUESTION.SELECT_QUESTION_GROUP;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectKdsQuestionGroup);

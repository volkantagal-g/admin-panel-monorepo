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
import { scoreMappingSelector } from './redux/selectors';
import { REDUX_KEY } from '@shared/shared/constants';
import { selectOptionsSearch, convertSelectOptions } from '@shared/utils/common';
import { t } from '@shared/i18n';
import useStyles from './styles';

const SelectScoreMapping = ({
  value,
  disabled,
  name,
  formik,
  questionType,
  domainType,
}) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const scoreMappingList = useSelector(scoreMappingSelector.getData);
  const isPending = useSelector(scoreMappingSelector.getIsPending);

  const [scoreMappingSelectOptions, setScoreMappingSelectOptions] = useState([]);
  const { errors, setFieldValue } = formik;

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getScoreMappingListRequest({ questionType }));
  }, [dispatch, questionType]);

  useEffect(() => {
    const options = convertSelectOptions(scoreMappingList[domainType], { valueKey: 'id', labelKey: 'name', isTranslation: true });
    setScoreMappingSelectOptions(options);
  }, [scoreMappingList, questionType, domainType]);

  return (
    <Form.Item
      help={get(errors, `scoreMapping.${domainType}`)}
      validateStatus={get(errors, `scoreMapping.${domainType}`) ? 'error' : 'success'}
      className={get(errors, `scoreMapping.${domainType}`) ? '' : 'mb-2'} >
      <Select
        name={name}
        value={value}
        options={scoreMappingSelectOptions}
        onChange={value => setFieldValue(`scoreMapping[${domainType}]`, value)}
        filterOption={selectOptionsSearch}
        disabled={disabled || isPending}
        placeholder={t("global:FILTER")}
        className={classes.wrapper}
        showSearch
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.KDS.QUESTION.SELECT_SCORE_MAPPING;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectScoreMapping);

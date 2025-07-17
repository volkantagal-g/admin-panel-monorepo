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
import { auditFormTypeSelector } from './redux/selectors';
import { REDUX_KEY } from '@shared/shared/constants';
import { selectOptionsSearch, convertSelectOptions } from '@shared/utils/common';
import { t } from '@shared/i18n';
import useStyles from './styles';

const SelectAuditFormType = ({
  value,
  onChangeCallback,
  disabled,
  fieldName,
  formik = {},
  isMultiple = false,
  dataTestId,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const auditFormTypes = useSelector(auditFormTypeSelector.getData);
  const isPending = useSelector(auditFormTypeSelector.getIsPending);

  const [auditFormTypeSelectOptions, setAuditFormTypeSelectOptions] = useState([]);
  const [mode, setMode] = useState('');
  const { errors } = formik;

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getAuditFormTypeRequest());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    const options = convertSelectOptions(auditFormTypes, { valueKey: '_id', labelKey: 'name', isTranslation: true });
    setAuditFormTypeSelectOptions(options);
  }, [auditFormTypes]);

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
        options={auditFormTypeSelectOptions}
        onChange={onChangeCallback}
        mode={mode}
        filterOption={selectOptionsSearch}
        disabled={disabled || isPending}
        placeholder={t('global:FILTER')}
        className={classes.wrapper}
        data-testid={dataTestId}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.KDS.SELECT_AUDIT_FORM_TYPE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectAuditFormType);

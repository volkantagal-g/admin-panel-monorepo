import { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Select, Spin } from 'antd';
import { compose } from 'redux';
import { get, orderBy, uniqBy } from 'lodash';

import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { employeeSelector } from './redux/selector';
import { REDUX_KEY } from '@shared/shared/constants';
import { t } from '@shared/i18n';
import useStyles from './styles';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';

const SelectEmployee = ({
  value,
  onChangeCallback,
  disabled,
  fieldName,
  formik = {},
  isMultiple = false,
  allowClear = false,
}) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const classes = useStyles();
  const employees = useSelector(employeeSelector.getData);
  const isPending = useSelector(employeeSelector.getIsPending);

  const [employeeSelectOptions, setEmployeeSelectOptions] = useState([]);
  const { errors } = formik;

  useEffect(() => {
    dispatch(Creators.initContainer());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    const options = uniqBy(orderBy(employees, ['name'], ['asc']), '_id');

    setEmployeeSelectOptions(options);
  }, [employees]);

  useEffect(() => {
    if (employeeSelectOptions.length === 0 && value) {
      dispatch(Creators.getEmployeeRequest({ id: value }));
    }
  }, [dispatch, employeeSelectOptions.length, value]);

  const employeeOptions = employeeSelectOptions.map(employee => (
    <Option key={employee._id} value={employee._id}>
      <b>{employee.name}</b> #
      <span className={classes.selectOptionId}>{employee._id}</span>
    </Option>
  ));

  const help = get(errors, fieldName);

  const handleSearch = useCallback(
    name => {
      if (name?.trim?.()?.length < 3) return;
      dispatch(Creators.getEmployeeRequest({ name }));
    },
    [dispatch],
  );

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({
    callback: handleSearch,
    delay: 1000,
  });
  return (
    <Form.Item
      help={help}
      validateStatus={help ? 'error' : 'success'}
      name={fieldName}
      className={help ? '' : 'mb-2'}
    >
      <Select
        value={value}
        onChange={onChangeCallback}
        mode={isMultiple ? 'multiple' : undefined}
        showSearch
        onSearch={debouncedHandleSearch}
        filterOption={false}
        notFoundContent={isPending ? <Spin size="small" /> : null}
        disabled={disabled}
        placeholder={t('dts:EMPLOYEE_PLACEHOLDER')}
        className={classes.wrapper}
        allowClear={allowClear}
      >
        {employeeOptions}
      </Select>
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.DTS.GENERAL.SELECT_EMPLOYEE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectEmployee);

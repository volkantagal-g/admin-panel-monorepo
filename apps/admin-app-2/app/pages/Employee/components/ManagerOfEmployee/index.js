import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { get, isEmpty } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { isValidObjectId } from '@shared/utils/common';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { getManagerOfEmployeeSelector } from './redux/selectors';

const reduxKey = REDUX_KEY.EMPLOYEE.MANAGER_OF_EMPLOYEE;
const MANAGER_SELECT_FIELDS = ['_id', 'fullName', 'workEmail', 'supervisor'];

const ManagerOfEmployee = ({ employeeId }) => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const managerOfEmployee = useSelector(getManagerOfEmployeeSelector.getData);
  const isPending = useSelector(getManagerOfEmployeeSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initContainer());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isValidObjectId(employeeId)) {
      dispatch(Creators.getManagerOfEmployeeRequest({ employeeId, fields: MANAGER_SELECT_FIELDS }));
    }
    else if (get(employeeId, 'value')) { // meaning that the employeeId field is actually a populated object not an id
      dispatch(Creators.getManagerOfEmployeeRequest({ employeeId: employeeId.value, fields: MANAGER_SELECT_FIELDS }));
    }
  }, [dispatch, employeeId]);

  if (isPending) return <Spin size="small" />;
  if (!managerOfEmployee || isEmpty(managerOfEmployee)) return null;
  return <p className="m-0">{managerOfEmployee.fullName}</p>;
};

export default ManagerOfEmployee;

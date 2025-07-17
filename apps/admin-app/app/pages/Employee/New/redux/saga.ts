import { all, cancel, cancelled, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { isFunction as _isFunction } from 'lodash';
import axios, { CancelTokenSource } from 'axios';

import { t } from '@shared/i18n';
import {
  checkWorkEmailUsedBefore as checkWorkEmailUsedBeforeAPI,
  checkUniqueIdentifierUsedBefore as checkUniqueIdentifierUsedBeforeAPI,
  createNewEmployee as createNewEmployeeAPI,
} from '@shared/api/employee';
import { toFakeLocalDate } from '@shared/utils/dateHelper';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { FormValues } from '../types';
import { Types, Creators } from './actions';
import { IEmployee } from '@app/pages/Employee/types';

type ActionWithTypeType<T> = {
  type: string;
} & T;

const formatEmployeeForCreate = (employeeObj: FormValues) => {
  const {
    workGSMNumber,
    workGSMDialCode,
    personalGSMNumber,
    personalGSMDialCode,
    seniorityStartDate,
    annualLeaveCalculationStartDate,
    ...employee
  } = employeeObj;

  return {
    ...employee,
    ...(
      workGSMNumber && {
        workGSM: {
          number: workGSMNumber?.toString(),
          dialCode: workGSMDialCode?.toString(),
        },
      }
    ),
    ...(
      personalGSMNumber && {
        personalGSM: {
          number: personalGSMNumber?.toString(),
          dialCode: personalGSMDialCode?.toString(),
        },
      }
    ),
    ...(
      employee.emergencyContact?.gsm && {
        emergencyContact: {
          ...employee.emergencyContact,
          gsm: employee?.emergencyContact?.gsm.toString(),
        },
      }
    ),
    businessCountryCodes: employee.businessCountryCodes?.includes('global') ? [] : employee.businessCountryCodes,
    // @ts-ignore
    workStartDate: toFakeLocalDate(employee.workStartDate.startOf('day').valueOf()).toISOString(),
    // @ts-ignore
    birthdate: toFakeLocalDate(employee.birthdate.startOf('day').valueOf()).toISOString(),
    // @ts-ignore
    ...(seniorityStartDate && { seniorityStartDate: toFakeLocalDate(seniorityStartDate.startOf('day').valueOf()).toISOString() }),
    ...(
      annualLeaveCalculationStartDate && // @ts-ignore
      { annualLeaveCalculationStartDate: toFakeLocalDate(annualLeaveCalculationStartDate.startOf('day').valueOf()).toISOString() }
    ),
  };
};

type createEmployeeRequestPropsType = ActionWithTypeType<{
  employee: FormValues;
  onSuccess: Function;
}>;
function* createEmployee({ employee, onSuccess }: createEmployeeRequestPropsType) : Generator {
  const cancelSource = axios.CancelToken.source() as CancelTokenSource;
  let employeeData = {} as IEmployee;
  try {
    const data = formatEmployeeForCreate(employee);

    // @ts-ignore
    employeeData = yield call(createNewEmployeeAPI, { employee: data, cancelSource });
    yield put(Creators.createEmployeeSuccess({}));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createEmployeeFailure({ error }));
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
  if (_isFunction(onSuccess) && employeeData?.id) {
    onSuccess(employeeData?.id);
  }
}

type checkEmailUsedStatusRequestPropsType = ActionWithTypeType<{
  email: string;
  onSuccess: Function;
  onError: Function;
}>;
function* checkEmailUsedStatus({
  email,
  onSuccess,
  onError,
}: checkEmailUsedStatusRequestPropsType) : Generator {
  const cancelSource = axios.CancelToken.source() as CancelTokenSource;

  try {
    // @ts-ignore
    const { isUsed } = yield call(checkWorkEmailUsedBeforeAPI, { email, cancelSource });
    if (_isFunction(onSuccess)) {
      onSuccess(isUsed);
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    if (_isFunction(onError)) {
      onError();
    }
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

type checkUniqueIdentifierUsedStatusRequestPropsType = ActionWithTypeType<{
  uniqueIdentifier: string;
  onSuccess: Function;
  onError: Function;
}>;
function* checkUniqueIdentifierUsedStatus({
  uniqueIdentifier,
  onSuccess,
  onError,
}: checkUniqueIdentifierUsedStatusRequestPropsType) : Generator {
  const cancelSource = axios.CancelToken.source() as CancelTokenSource;

  try {
    // @ts-ignore
    const { isUsed } = yield call(checkUniqueIdentifierUsedBeforeAPI, { uniqueIdentifier, cancelSource });
    if (_isFunction(onSuccess)) {
      onSuccess(isUsed);
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    if (_isFunction(onError)) {
      onError();
    }
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

function* watchCreateEmployeeRequest() {
  yield takeLatest(Types.CREATE_EMPLOYEE_REQUEST, createEmployee);
}

function* watchCheckEmailUsedStatusRequest() {
  yield takeLatest(Types.CHECK_EMAIL_USED_STATUS_REQUEST, checkEmailUsedStatus);
}

function* watchCheckUniqueIdentifierUsedStatusRequest() {
  yield takeLatest(Types.CHECK_UNIQUE_IDENTIFIER_USED_STATUS_REQUEST, checkUniqueIdentifierUsedStatus);
}

export default function* employeeNewPageRootSaga(): Generator {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks: unknown = yield all([
      fork(watchCreateEmployeeRequest),
      fork(watchCheckEmailUsedStatusRequest),
      fork(watchCheckUniqueIdentifierUsedStatusRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    // @ts-ignore
    yield all(backgroundTasks.map(task => cancel(task)));
  }
}

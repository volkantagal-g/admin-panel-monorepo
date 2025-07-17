import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import * as yup from 'yup';
import { isEmpty } from 'lodash';

import {
  bulkInactivateExternalCustomerServicesAccounts as bulkInactivateExternalCustomerServicesAccountsApi,
  bulkCreateTeleperformanceUsers as bulkCreateTeleperformanceUsersApi,
  bulkCreateConcentrixUsersTurkey as bulkCreateConcentrixUsersTurkeyApi,
  bulkCreateAssisttUsers as bulkCreateAssisttUsersApi,
} from '@shared/api/user';
import { Creators, Types } from './actions';
import { getLangKey } from '@shared/i18n';

const getUserSchema = ({ isCountryRequired, isSaleforceSSORequired = false }) => {
  return yup.object({
    ...(isCountryRequired ? { country: yup.mixed().oneOf(['TR', 'UK']).required() } : undefined),
    ...(isSaleforceSSORequired ? { saleforceSSO: yup.boolean().required() } : undefined),
    fullName: yup.string().required(),
    email: yup.string().required(),
    user: yup.string().required(),
    firstName: yup.string(),
    lastName: yup.string(),
    recoveryEmail: yup.string(),
    recoveryPhone: yup.string().matches(/^\+/),
    mobilePhone: yup.string().matches(/^\+/),
    displayName: yup.string(),
    outsourceFirm: yup.string(),
    positionGeography: yup.string(),
    payrollCountry: yup.string(),
    businessUnit: yup.string(),
    subDepartment1: yup.string(),
    title: yup.string(),
    profileName: yup.string(),
    teamLeadEmail: yup.string(),
    secondManagerEmail: yup.string(),
    permissionSet: yup.string(),
  });
};

const validateUsers = ({ users, domain, isCountryRequired = true, isSaleforceSSORequired = false }) => {
  const usersWithValidation = [];

  users.forEach((user, idx) => {
    const isEmailValid = user.email?.endsWith(domain);

    // PS: Line numbers are idx + 2 because the first line is the header
    try {
      // Validate methods throws error if the user object is not valid
      getUserSchema({ isCountryRequired, isSaleforceSSORequired }).validateSync(user, { strict: true, abortEarly: false });

      // Extra validation for email
      if (isEmailValid) {
        usersWithValidation.push({ lineNumber: idx + 2, isValid: true, user: { ...user, suspended: false } });
      }
      else {
        usersWithValidation.push({ lineNumber: idx + 2, isValid: false, user, errorPaths: ['email'] });
      }
    }
    catch (error) {
      let errorPaths = [];

      if (!isEmailValid) {
        errorPaths.push('email');
      }

      if (error instanceof yup.ValidationError) {
        errorPaths = [...errorPaths, ...error.inner.map(innerError => innerError.path)];
        usersWithValidation.push({ lineNumber: idx + 2, isValid: false, user, errorPaths });
      }
      else {
        usersWithValidation.push({ lineNumber: idx + 2, isValid: false, user, errorPaths: [...errorPaths, 'unknown'] });
      }
    }
  });

  const areAllUsersValid = usersWithValidation.every(({ isValid }) => isValid);

  return { usersWithValidation, areAllUsersValid };
};

const getErrorMessagesFromUserValidationObjects = ({ t, usersWithValidation }) => {
  const invalidUsersWithValidation = usersWithValidation.filter(({ isValid }) => !isValid);

  return invalidUsersWithValidation.map(({ lineNumber, errorPaths }) => {
    const errorMessagesForEachEntry = (
      errorPaths?.map(errorPath => t(`externalCustomerServicesPanelAccountManagementPage:UPLOAD_FIELD_ERRORS.${errorPath}`, {})).join(' ')
    );

    return `${t('global:LINE')} ${lineNumber}: ${errorMessagesForEachEntry}`;
  });
};

function* bulkInactivateExternalCustomerServicesAccounts({ mailAddressList }) {
  try {
    const data = yield call(bulkInactivateExternalCustomerServicesAccountsApi, { mailAddressList });
    yield put(Creators.bulkInactivateExternalCustomerServicesAccountsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.bulkInactivateExternalCustomerServicesAccountsFailure({ error }));
  }
}

function* watchBulkInactivateExternalCustomerServicesAccountsRequest() {
  yield takeLatest(Types.BULK_INACTIVATE_EXTERNAL_CUSTOMER_SERVICES_ACCOUNTS_REQUEST, bulkInactivateExternalCustomerServicesAccounts);
}

const MAX_USER_COUNT = 500;

function* bulkCreateTeleperformanceUsers({ t, users }) {
  try {
    const { usersWithValidation, areAllUsersValid } = validateUsers({ users, domain: '@teleperformance.getir.com' });

    if (isEmpty(usersWithValidation)) {
      yield put(Creators.bulkCreateTeleperformanceUsersSuccess({ data: { updatedCount: 0 } }));
      return;
    }

    if (usersWithValidation.length > MAX_USER_COUNT) {
      yield put(Creators.bulkCreateTeleperformanceUsersFailure({ error: t('externalCustomerServicesPanelAccountManagementPage:TOO_MANY_USERS') }));
      return;
    }

    if (!areAllUsersValid) {
      const errors = getErrorMessagesFromUserValidationObjects({ t, usersWithValidation });
      yield put(Creators.bulkCreateTeleperformanceUsersFailure({ error: errors }));
      return;
    }

    const validatedUsers = usersWithValidation.map(userWithValidation => userWithValidation.user);
    const data = yield call(bulkCreateTeleperformanceUsersApi, { users: validatedUsers });

    yield put(Creators.bulkCreateTeleperformanceUsersSuccess({ data: { ...data } }));
  }
  catch (error) {
    yield put(Creators.bulkCreateTeleperformanceUsersFailure({ error: error[getLangKey()] || error.message }));
  }
}

function* watchBulkCreateTeleperformanceUsers() {
  yield takeLatest(Types.BULK_CREATE_TELEPERFORMANCE_USERS_REQUEST, bulkCreateTeleperformanceUsers);
}

function* bulkCreateConcentrixUsersTurkey({ t, users }) {
  try {
    const { usersWithValidation, areAllUsersValid } = validateUsers({
      users,
      domain: '@concentrix.getir.com',
      isCountryRequired: false,
      isSaleforceSSORequired: true,
    });

    if (isEmpty(usersWithValidation)) {
      yield put(Creators.bulkCreateConcentrixUsersTurkeySuccess({ data: { updatedCount: 0 } }));
      return;
    }

    if (usersWithValidation.length > MAX_USER_COUNT) {
      yield put(Creators.bulkCreateConcentrixUsersTurkeyFailure({ error: t('externalCustomerServicesPanelAccountManagementPage:TOO_MANY_USERS') }));
      return;
    }

    if (!areAllUsersValid) {
      const errors = getErrorMessagesFromUserValidationObjects({ t, usersWithValidation });
      yield put(Creators.bulkCreateConcentrixUsersTurkeyFailure({ error: errors }));
      return;
    }

    const validatedUsers = usersWithValidation.map(userWithValidation => userWithValidation.user);
    const data = yield call(bulkCreateConcentrixUsersTurkeyApi, { users: validatedUsers });

    yield put(Creators.bulkCreateConcentrixUsersTurkeySuccess({ data: { ...data } }));
  }
  catch (error) {
    yield put(Creators.bulkCreateConcentrixUsersTurkeyFailure({ error: error[getLangKey()] || error.message }));
  }
}

function* watchBulkCreateConcentrixUsersTurkeyRequest() {
  yield takeLatest(Types.BULK_CREATE_CONCENTRIX_USERS_TURKEY_REQUEST, bulkCreateConcentrixUsersTurkey);
}

function* bulkCreateAssisttUsers({ t, users }) {
  try {
    const { usersWithValidation, areAllUsersValid } = validateUsers({ users, domain: '@assistt.getir.com' });

    if (isEmpty(usersWithValidation)) {
      yield put(Creators.bulkCreateAssisttUsersSuccess({ data: { updatedCount: 0 } }));
      return;
    }

    if (usersWithValidation.length > MAX_USER_COUNT) {
      yield put(Creators.bulkCreateAssisttUsersFailure({ error: t('externalCustomerServicesPanelAccountManagementPage:TOO_MANY_USERS') }));
      return;
    }

    if (!areAllUsersValid) {
      const errors = getErrorMessagesFromUserValidationObjects({ t, usersWithValidation });
      yield put(Creators.bulkCreateAssisttUsersFailure({ error: errors }));
      return;
    }

    const validatedUsers = usersWithValidation.map(userWithValidation => userWithValidation.user);
    const data = yield call(bulkCreateAssisttUsersApi, { users: validatedUsers });

    yield put(Creators.bulkCreateAssisttUsersSuccess({ data: { ...data } }));
  }
  catch (error) {
    yield put(Creators.bulkCreateAssisttUsersFailure({ error: error[getLangKey()] || error.message }));
  }
}

function* watchBulkCreateAssisttUsersRequest() {
  yield takeLatest(Types.BULK_CREATE_ASSISTT_USERS_REQUEST, bulkCreateAssisttUsers);
}

export default function* externalCustomerServicesPanelAccountManagementPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchBulkInactivateExternalCustomerServicesAccountsRequest),
      fork(watchBulkCreateTeleperformanceUsers),
      fork(watchBulkCreateConcentrixUsersTurkeyRequest),
      fork(watchBulkCreateAssisttUsersRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

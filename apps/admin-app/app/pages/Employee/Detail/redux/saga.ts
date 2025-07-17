import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
  cancelled,
  select,
  delay,
} from 'redux-saga/effects';
import axios, { CancelTokenSource } from 'axios';
import { isFunction as _isFunction } from 'lodash';
import moment from 'moment';

import { t } from '@shared/i18n';
import { toFakeLocalDate } from '@shared/utils/dateHelper';
import { uploadToS3 } from '@shared/api/upload';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { employeeSelector } from './selectors';
import {
  checkUniqueIdentifierUsedBefore as checkUniqueIdentifierUsedBeforeAPI,
  checkWorkEmailUsedBefore as checkWorkEmailUsedBeforeAPI,
  getEmployeeForEmployeeDetail as getEmployeeForEmployeeDetailAPI,
  updatePersonalInfoOfEmployee as updatePersonalInfoOfEmployeeAPI,
  updateContactInfoOfEmployee as updateContactInfoOfEmployeeAPI,
  updateEmployeeInfoOfEmployee as updateEmployeeInfoOfEmployeeAPI,
  updateOrganizationInfoOfEmployee as updateOrganizationInfoOfEmployeeAPI,
  updateCompanyInfoOfEmployee as updateCompanyInfoOfEmployeeAPI,
  addEducationInfoToEmployee as addEducationInfoToEmployeeAPI,
  removeEducationInfoToEmployee as removeEducationInfoToEmployeeAPI,
  updateEducationInfo as updateEducationInfoAPI,
  filterEmployeeEducations as filterEmployeeEducationsAPI,
  terminateEmployee as terminateEmployeeAPI,
  rehireEmployee as rehireEmployeeAPI,
  getEmployeeSurveyHistory as getEmployeeSurveyPermissionAPI,
  addSurveyInfoToEmployee as addSurveyInfoToEmployeeAPI,
  updateSurveyInfo as updateSurveyInfoAPI,
  getOrganizationalInfoLatestChangeLogsByEmployee as getOrganizationalInfoLatestChangeLogsByEmployeeAPI,
  getSignedURLForPicURLUpdate as getSignedURLForPicURLUpdateAPI,
} from '@shared/api/employee';
import { IPersonalInfoFormValues } from '@app/pages/Employee/Detail/types';
import {
  getConvertDotNotationToObject,
  getFormattedAddEducationRequestParams,
  getFormattedCompanyInfoRequestParams,
  getFormattedContactInfoRequestParams,
  getFormattedEmployeeInfoRequestParams,
  getFormattedOrganizationInfoRequestParams,
  getFormattedPersonalInfoRequestParams,
} from '@app/pages/Employee/Detail/utils';
import { EMPLOYEE_ONBOARDING_INFO_TYPES } from '../../constants';

type ActionWithTypeType<T> = {
  type: string;
} & T;

type getEmployeeRequestPropsType = ActionWithTypeType<{
  employeeId: MongoIDType;
}>;
function* getEmployee({ employeeId }: getEmployeeRequestPropsType) : Generator {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();
  try {
    const employee = yield call(getEmployeeForEmployeeDetailAPI, { employeeId, cancelSource });
    const logs = yield call(getOrganizationalInfoLatestChangeLogsByEmployeeAPI, { employeeId });
    yield put(Creators.getEmployeeSuccess({ employee, organizationalInfoChangeLogs: logs }));
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.getEmployeeFailure({}));
    yield delay(1600);
    window.location.replace('/');
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

type updateCompanyInfoRequestPropsType = ActionWithTypeType<{
  values: any;
  onSuccess: () => void;
}>;
function* updateCompanyInfo({
  values,
  onSuccess,
}: updateCompanyInfoRequestPropsType): Generator {
  try {
    const employee = (yield select(employeeSelector.getData)) as any;
    const params = getFormattedCompanyInfoRequestParams(values);
    yield call(updateCompanyInfoOfEmployeeAPI, { employeeId: employee._id, updateData: params });
    yield put(Creators.updateCompanyInfoSuccess({}));
    yield put(Creators.getEmployeeRequest({ employeeId: employee._id }));
    yield put(ToastCreators.success({ message: t('employeePage:UPDATE_PROCESS_SUCCESS') }));
    if (_isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.updateCompanyInfoFailure({ error }));
  }
}

type updateContactInfoRequestPropsType = ActionWithTypeType<{
  values: any;
  onSuccess: () => void;
}>;
function* updateContactInfo({
  values,
  onSuccess,
}: updateContactInfoRequestPropsType): Generator {
  try {
    const employee = (yield select(employeeSelector.getData)) as any;
    const params = getFormattedContactInfoRequestParams(values);
    yield call(updateContactInfoOfEmployeeAPI, { employeeId: employee._id, updateData: params });
    yield put(Creators.updateContactInfoSuccess({}));
    yield put(Creators.getEmployeeRequest({ employeeId: employee._id }));
    yield put(ToastCreators.success({ message: t('employeePage:UPDATE_PROCESS_SUCCESS') }));
    if (_isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.updateContactInfoFailure({ error }));
  }
}

type updateEmployeeInfoRequestPropsType = ActionWithTypeType<{
  values: any;
  onSuccess: () => void;
}>;
function* updateEmployeeInfo({
  values,
  onSuccess,
}: updateEmployeeInfoRequestPropsType): Generator {
  try {
    const employee = (yield select(employeeSelector.getData)) as any;
    const params = getFormattedEmployeeInfoRequestParams(values);
    yield call(updateEmployeeInfoOfEmployeeAPI, { employeeId: employee._id, updateData: params });
    yield put(Creators.updateEmployeeInfoSuccess({}));
    yield put(Creators.getEmployeeRequest({ employeeId: employee._id }));
    yield put(ToastCreators.success({ message: t('employeePage:UPDATE_PROCESS_SUCCESS') }));
    if (_isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.updateEmployeeInfoFailure({ error }));
  }
}

type updateOrganizationInfoRequestPropsType = ActionWithTypeType<{
  values: any;
  onSuccess: () => void;
  effectiveDateInformation: any,
}>;
function* updateOrganizationInfo({
  values,
  onSuccess,
  effectiveDateInformation,
}: updateOrganizationInfoRequestPropsType): Generator {
  try {
    const employee = (yield select(employeeSelector.getData)) as any;
    const params = getFormattedOrganizationInfoRequestParams(values);
    const formattedEffectiveDates = getConvertDotNotationToObject(effectiveDateInformation);
    if (formattedEffectiveDates.department || formattedEffectiveDates.subDepartments) {
      formattedEffectiveDates['subDepartments.firstLevelSub'] = (formattedEffectiveDates.department || formattedEffectiveDates.subDepartments);
    }
    yield call(updateOrganizationInfoOfEmployeeAPI, {
      employeeId: employee._id,
      updateData: params,
      effectiveDateInformation: formattedEffectiveDates,
    });

    yield put(Creators.updateOrganizationInfoSuccess({}));
    yield put(Creators.getEmployeeRequest({ employeeId: employee._id }));
    yield put(ToastCreators.success({ message: t('employeePage:UPDATE_PROCESS_SUCCESS') }));
    if (_isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.updateOrganizationInfoFailure({ error }));
  }
}

type updatePersonalInfoRequestPropsType = ActionWithTypeType<{
  values: IPersonalInfoFormValues;
  changedPicURL: string;
  imageType: string;
  onSuccess: () => void;
}>;
function* updatePersonalInfo({
  values,
  changedPicURL,
  imageType,
  onSuccess,
}: updatePersonalInfoRequestPropsType): Generator {
  try {
    const employee = (yield select(employeeSelector.getData)) as any;
    const params = getFormattedPersonalInfoRequestParams(values);

    if (changedPicURL && imageType) {
      // @ts-ignore
      const { url, cdnUrl } = yield call(getSignedURLForPicURLUpdateAPI, { employeeId: employee._id, imageType });
      // @ts-ignore
      yield call(uploadToS3, { signedUrl: url, data: changedPicURL });
      params.picURL = cdnUrl;
    }

    yield call(updatePersonalInfoOfEmployeeAPI, { employeeId: employee._id, updateData: params });
    yield put(Creators.updatePersonalInfoSuccess({}));
    yield put(Creators.getEmployeeRequest({ employeeId: employee._id }));
    yield put(ToastCreators.success({ message: t('employeePage:UPDATE_PROCESS_SUCCESS') }));
    if (_isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.updatePersonalInfoFailure({ error }));
  }
}

type addEducationRequestPropsType = ActionWithTypeType<{
  values: any;
  onSuccess: () => void;
}>;
function* addEducation({ values, onSuccess }: addEducationRequestPropsType): Generator {
  try {
    const employee = (yield select(employeeSelector.getData)) as any;
    const params = getFormattedAddEducationRequestParams(values);
    yield call(addEducationInfoToEmployeeAPI, { employeeId: employee._id, educationInfo: params });
    yield put(Creators.getEmployeeEducationsRequest({ employeeId: employee._id }));
    yield put(Creators.addEducationSuccess({}));
    if (_isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.addEducationFailure({ error }));
  }
}

type removeEducationRequestPropsType = ActionWithTypeType<{ educationId: MongoIDType; }>;
function* removeEducation({ educationId }: removeEducationRequestPropsType): Generator {
  try {
    const employee = (yield select(employeeSelector.getData)) as any;
    yield call(removeEducationInfoToEmployeeAPI, { educationId });
    yield put(Creators.getEmployeeEducationsRequest({ employeeId: employee._id }));
    yield put(Creators.removeEducationSuccess({}));
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.removeEducationFailure({ error }));
  }
}

type updateEducationRequestPropsType = ActionWithTypeType<{ educationId: MongoIDType; values: any, onSuccess: () => {} }>;
function* updateEducation({
  educationId,
  values,
}: updateEducationRequestPropsType): Generator {
  try {
    const params = getFormattedAddEducationRequestParams(values);
    yield call(updateEducationInfoAPI, { educationId, educationInfo: params });
    yield put(Creators.updateEducationSuccess({}));
    window.location.reload();
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.updateEducationFailure({ error }));
  }
}

type getEmployeeEducationsRequestPropsType = ActionWithTypeType<{ employeeId: MongoIDType, onSuccess: () => {} }>;
function* getEmployeeEducations({ employeeId, onSuccess }: getEmployeeEducationsRequestPropsType): Generator {
  try {
    // @ts-ignore
    const { educations = [] } = yield call(filterEmployeeEducationsAPI, { employeeId });
    yield put(Creators.getEmployeeEducationsSuccess({ data: educations }));
    if (_isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.getEmployeeEducationsFailure({}));
  }
}

type terminateEmployeeRequestPropsType = ActionWithTypeType<{
  values: any;
  onSuccess: () => void;
}>;
function* terminateEmployee({ values }: terminateEmployeeRequestPropsType): Generator {
  try {
    const employee = (yield select(employeeSelector.getData)) as any;
    const params = {
      employeeId: employee._id,
      workEndDate: toFakeLocalDate(values.workEndDate.startOf('day').valueOf()).toISOString(),
      ...(moment().isSame(values.workEndDate, 'day') && { shouldImmediatelyTerminate: values.shouldImmediatelyTerminate }),
    };
    yield call(terminateEmployeeAPI, params);
    yield put(Creators.terminateEmployeeSuccess({}));
    window.location.reload();
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.terminateEmployeeFailure({ error }));
  }
}

type rehireEmployeeRequestPropsType = ActionWithTypeType<{
  values: any;
  onSuccess: () => void;
}>;
function* rehireEmployee({ values }: rehireEmployeeRequestPropsType): Generator {
  try {
    const employee = (yield select(employeeSelector.getData)) as any;
    const params = {
      employeeId: employee._id,
      workStartDate: toFakeLocalDate(values.workStartDate.startOf('day').valueOf()).toISOString(),
    };
    yield call(rehireEmployeeAPI, params);
    yield put(Creators.rehireEmployeeSuccess({}));
    window.location.reload();
  }
  catch (error) {
    // @ts-ignore
    yield put(ToastCreators.error(error?.code ? t(`employeePage:EMPLOYEE_SERVICE_ERROR_CODE.${error?.code}`) : { error }));
    yield put(Creators.rehireEmployeeFailure({ error }));
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
    const { isUsed, employeeId } = yield call(checkWorkEmailUsedBeforeAPI, { email, cancelSource });
    if (_isFunction(onSuccess)) {
      onSuccess(isUsed, { employeeId });
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
    const { isUsed, employeeId } = yield call(checkUniqueIdentifierUsedBeforeAPI, { uniqueIdentifier, cancelSource });
    if (_isFunction(onSuccess)) {
      onSuccess(isUsed, { employeeId });
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

function* getEmployeeSurveyHistoryRequest({ values, onSuccess }: ActionWithTypeType<{ values: any, onSuccess: () => {} }>) {
  try {
    const { hasAccess, surveyHistory } = yield call(getEmployeeSurveyPermissionAPI, values);
    yield put(Creators.getEmployeeSurveyHistorySuccess({ data: { hasAccess, surveyHistory } }));
    if (_isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.getEmployeeSurveyHistoryFailure({ error }));
  }
}

function* addSurveyRequest({ values, onSuccess }: ActionWithTypeType<{ values: any, onSuccess: () => {} }>) {
  const employee = (yield select(employeeSelector.getData)) as any;
  try {
    yield call(addSurveyInfoToEmployeeAPI, {
      ...values,
      employeeId: employee._id,
      type: EMPLOYEE_ONBOARDING_INFO_TYPES.TERMINATE,
    });
    yield put(Creators.getEmployeeSurveyHistoryRequest({
      values:
        {
          employeeId: employee._id,
          type: EMPLOYEE_ONBOARDING_INFO_TYPES.TERMINATE,
        },
    }));
    yield put(Creators.addSurveySuccess({}));

    if (_isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.addSurveyFailure({ error }));
  }
}

function* updateSurveyRequest({ values, onSuccess, id }: ActionWithTypeType<{ values: any, onSuccess: () => {}, id: MongoIDType }>) {
  const employee = (yield select(employeeSelector.getData)) as any;
  try {
    yield call(updateSurveyInfoAPI, { id, ...values, employeeId: employee._id });
    yield put(Creators.updateSurveySuccess({}));
    window.location.reload();
    if (_isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.updateSurveyFailure({ error }));
  }
}

function* watchUpdateSurveyRequest() {
  yield takeLatest(Types.UPDATE_SURVEY_REQUEST, updateSurveyRequest);
}

function* watchAddSurveyRequest() {
  yield takeLatest(Types.ADD_SURVEY_REQUEST, addSurveyRequest);
}

function* watchGetEmployeeSurveyHistoryRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_SURVEY_HISTORY_REQUEST, getEmployeeSurveyHistoryRequest);
}

function* watchGetEmployeeRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_REQUEST, getEmployee);
}

function* watchUpdateCompanyInfoRequest() {
  yield takeLatest(Types.UPDATE_COMPANY_INFO_REQUEST, updateCompanyInfo);
}

function* watchUpdateContactInfoRequest() {
  yield takeLatest(Types.UPDATE_CONTACT_INFO_REQUEST, updateContactInfo);
}

function* watchUpdateEmployeeInfoRequest() {
  yield takeLatest(Types.UPDATE_EMPLOYEE_INFO_REQUEST, updateEmployeeInfo);
}

function* watchUpdateOrganizationInfoRequest() {
  yield takeLatest(Types.UPDATE_ORGANIZATION_INFO_REQUEST, updateOrganizationInfo);
}

function* watchUpdatePersonalInfoRequest() {
  yield takeLatest(Types.UPDATE_PERSONAL_INFO_REQUEST, updatePersonalInfo);
}

function* watchTerminateEmployeeRequest() {
  yield takeLatest(Types.TERMINATE_EMPLOYEE_REQUEST, terminateEmployee);
}

function* watchRehireEmployeeRequest() {
  yield takeLatest(Types.REHIRE_EMPLOYEE_REQUEST, rehireEmployee);
}

function* watchCheckEmailUsedStatusRequest() {
  yield takeLatest(Types.CHECK_EMAIL_USED_STATUS_REQUEST, checkEmailUsedStatus);
}

function* watchCheckUniqueIdentifierUsedStatusRequest() {
  yield takeLatest(Types.CHECK_UNIQUE_IDENTIFIER_USED_STATUS_REQUEST, checkUniqueIdentifierUsedStatus);
}

function* watchAddEducationRequestRequest() {
  yield takeLatest(Types.ADD_EDUCATION_REQUEST, addEducation);
}

function* watchRemoveEducationRequestRequest() {
  yield takeLatest(Types.REMOVE_EDUCATION_REQUEST, removeEducation);
}

function* watchUpdateEducationRequestRequest() {
  yield takeLatest(Types.UPDATE_EDUCATION_REQUEST, updateEducation);
}

function* watchGetEmployeeEducationsRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_EDUCATIONS_REQUEST, getEmployeeEducations);
}

export default function* root(): Generator {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks: unknown = yield all([
      fork(watchGetEmployeeRequest),
      fork(watchUpdateCompanyInfoRequest),
      fork(watchUpdateContactInfoRequest),
      fork(watchUpdateEmployeeInfoRequest),
      fork(watchUpdateOrganizationInfoRequest),
      fork(watchUpdatePersonalInfoRequest),
      fork(watchTerminateEmployeeRequest),
      fork(watchRehireEmployeeRequest),
      fork(watchCheckEmailUsedStatusRequest),
      fork(watchCheckUniqueIdentifierUsedStatusRequest),
      fork(watchAddEducationRequestRequest),
      fork(watchRemoveEducationRequestRequest),
      fork(watchUpdateEducationRequestRequest),
      fork(watchGetEmployeeEducationsRequest),
      fork(watchGetEmployeeSurveyHistoryRequest),
      fork(watchAddSurveyRequest),
      fork(watchUpdateSurveyRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    // @ts-ignore
    yield all(backgroundTasks.map(task => cancel(task)));
  }
}

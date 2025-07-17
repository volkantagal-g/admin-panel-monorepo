import {
  all,
  call,
  cancel,
  take,
  put,
  fork,
  takeLatest,
} from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getPersonDetail,
  updatePersonDetail,
  addPersonTraining,
  disableLoginOfCouriers,
  setMarketEmployer,
  unsetMarketEmployer,
  editMarketEmployer,
  changePassword,
  createCourierForPerson,
  createPickerForPerson,
  getAvatarSignedUrl,
  changeAvatar,
  activatePerson,
  deactivatePerson,
  addEmployeeDiscount,
  removeEmployeeDiscount,
  getGetirUpTrainings,
} from '@shared/api/person';
import { getFranchisesAreas } from '@shared/api/marketFranchise';
import { getContractListApi } from '@shared/api/personContractType';
import { filterCouriers } from '@shared/api/marketCouriers';
import { getNotes, updateNote, createNote } from '@shared/api/note';
import { uploadToS3 } from '@shared/api/upload';
import { filterPickers } from '@shared/api/picker';
import {
  AVATAR_FORMAT,
  BUCKET_FOLDER_PATH,
  CLIENT_SEGMENT_EMPLOYEE_DISCOUNT,
} from '../constants';
import { NO_CLIENT_WARNING_CODE } from '../../constants';
import { Types, Creators } from './actions';
import { removeRegionSubstringInUrl } from '../utils';
import { getLangKey } from '@shared/i18n';

export function* commonUpdateSteps({ updatedPerson }) {
  yield put(Creators.getCouriersSuccess({ data: [] }));
  yield put(Creators.getPickersSuccess({ data: [] }));
  yield put(Creators.getPersonDetailSuccess({ data: updatedPerson }));
  yield put(ToastCreators.success());
}

export function* personDetailRequest({ personId }) {
  try {
    const person = yield call(getPersonDetail, { personId });
    yield put(Creators.getPersonDetailSuccess({ data: person }));
  }
  catch (error) {
    yield put(Creators.getPersonDetailFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchPersonDetailRequest() {
  yield takeLatest(Types.GET_PERSON_DETAIL_REQUEST, personDetailRequest);
}

export function* updatePersonDetailRequest({ personId, updateData, onlyPerson }) {
  try {
    const updatedPerson = yield call(updatePersonDetail, {
      personId,
      updateData,
      onlyPerson,
    });
    yield put(Creators.updatePersonDetailSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.updatePersonDetailFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdatePersonDetailRequest() {
  yield takeLatest(
    Types.UPDATE_PERSON_DETAIL_REQUEST,
    updatePersonDetailRequest,
  );
}

export function* updatePersonalDetailRequest({
  personId,
  updateData,
  oldPersonalGsm,
  oldCountryCode,
  isActivated,
}) {
  try {
    const updateBody = { ...updateData };
    const { personalGsm, countryGsmCode, shouldAddEmployeeDiscount } = updateBody;
    if (((oldPersonalGsm && oldPersonalGsm !== personalGsm) || (oldCountryCode && oldCountryCode !== countryGsmCode)) || !shouldAddEmployeeDiscount) {
      yield call(removeEmployeeDiscount, {
        gsm: oldPersonalGsm,
        countryCode: oldCountryCode,
        segments: [CLIENT_SEGMENT_EMPLOYEE_DISCOUNT],
      });
    }
    if (isActivated && shouldAddEmployeeDiscount) {
      const {
        warning,
        warningCode,
      } = yield call(addEmployeeDiscount, { gsm: personalGsm, countryCode: countryGsmCode, segments: [CLIENT_SEGMENT_EMPLOYEE_DISCOUNT] });
      if (warning) {
        toast.info(warning[getLangKey()]);
      }
      if (warningCode === NO_CLIENT_WARNING_CODE) {
        updateBody.shouldAddEmployeeDiscount = false;
      }
    }
    const updatedPerson = yield call(updatePersonDetail, { personId, updateData: updateBody });
    yield put(Creators.updatePersonalDetailSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.updatePersonalDetailFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdatePersonalDetailRequest() {
  yield takeLatest(
    Types.UPDATE_PERSONAL_DETAIL_REQUEST,
    updatePersonalDetailRequest,
  );
}

export function* addPersonTrainingRequest({ person, trainingObj }) {
  try {
    const updatedPerson = yield call(addPersonTraining, {
      person,
      trainingObj,
    });
    yield put(Creators.addPersonTrainingSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.addPersonTrainingFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAddPersonTrainingRequest() {
  yield takeLatest(Types.ADD_PERSON_TRAINING_REQUEST, addPersonTrainingRequest);
}

export function* disableLoginOfCouriersRequest({
  id,
  courierDisableReason,
  isLoginDisabled,
}) {
  try {
    const updatedPerson = yield call(disableLoginOfCouriers, {
      id,
      courierDisableReason,
      isLoginDisabled,
    });
    yield put(Creators.disableLoginOfCouriersSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.disableLoginOfCouriersFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDisableLoginOfCouriersRequest() {
  yield takeLatest(
    Types.DISABLE_LOGIN_OF_COURIERS_REQUEST,
    disableLoginOfCouriersRequest,
  );
}

export function* getPersonNotesRequest({ data }) {
  try {
    const { notes } = yield call(getNotes, data);
    yield put(Creators.getPersonNotesSuccess({ data: notes }));
  }
  catch (error) {
    yield put(Creators.getPersonNotesFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPersonNotesRequest() {
  yield takeLatest(Types.GET_PERSON_NOTES_REQUEST, getPersonNotesRequest);
}

export function* updatePersonNoteRequest({ data }) {
  try {
    yield call(updateNote, data);
    yield put(Creators.updatePersonNoteSuccess());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updatePersonNoteFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdatePersonNoteRequest() {
  yield takeLatest(Types.UPDATE_PERSON_NOTE_REQUEST, updatePersonNoteRequest);
}

export function* createPersonNoteRequest({ data }) {
  try {
    yield call(createNote, data);
    yield put(Creators.createPersonNoteSuccess());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.createPersonNoteFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreatePersonNoteRequest() {
  yield takeLatest(Types.CREATE_PERSON_NOTE_REQUEST, createPersonNoteRequest);
}

export function* addMarketEmployerRequest({ type, ...payload }) {
  try {
    const { person: updatedPerson } = yield call(setMarketEmployer, payload);
    yield put(Creators.addMarketEmployerSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.addMarketEmployerFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAddMarketEmployerRequest() {
  yield takeLatest(Types.ADD_MARKET_EMPLOYER_REQUEST, addMarketEmployerRequest);
}

export function* editMarketEmployerRequest({ type, ...payload }) {
  try {
    const updatedPerson = yield call(editMarketEmployer, payload);
    yield put(Creators.editMarketEmployerSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.editMarketEmployerFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchEditMarketEmployerRequest() {
  yield takeLatest(Types.EDIT_MARKET_EMPLOYER_REQUEST, editMarketEmployerRequest);
}

export function* removeMarketEmployerRequest({ person, franchise }) {
  try {
    const { person: updatedPerson } = yield call(unsetMarketEmployer, {
      person,
      franchise,
    });
    yield put(Creators.removeMarketEmployerSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.removeMarketEmployerFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchRemoveMarketEmployerRequest() {
  yield takeLatest(
    Types.REMOVE_MARKET_EMPLOYER_REQUEST,
    removeMarketEmployerRequest,
  );
}

export function* changePasswordRequest({ id, password }) {
  try {
    const updatedPerson = yield call(changePassword, { id, password });
    yield put(Creators.changePasswordSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.changePasswordFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchChangePasswordRequest() {
  yield takeLatest(Types.CHANGE_PASSWORD_REQUEST, changePasswordRequest);
}

export function* getCouriersRequest({ courierIds, fields }) {
  try {
    const { couriers } = yield call(filterCouriers, { courierIds, fields });
    yield put(Creators.getCouriersSuccess({ data: couriers }));
  }
  catch (error) {
    yield put(Creators.getCouriersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCouriersRequest() {
  yield takeLatest(Types.GET_COURIERS_REQUEST, getCouriersRequest);
}

export function* getPickersRequest({ pickerIds, fields }) {
  try {
    const { pickers } = yield call(filterPickers, { pickerIds, fields });
    yield put(Creators.getPickersSuccess({ data: pickers }));
  }
  catch (error) {
    yield put(Creators.getPickersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPickersRequest() {
  yield takeLatest(Types.GET_PICKERS_REQUEST, getPickersRequest);
}

export function* createCourierForPersonRequest({ id, courierTypes }) {
  try {
    const updatedPerson = yield call(createCourierForPerson, {
      id,
      courierTypes,
    });
    yield put(Creators.createCourierForPersonSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.createCourierForPersonFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateCourierForPersonRequest() {
  yield takeLatest(
    Types.CREATE_COURIER_FOR_PERSON_REQUEST,
    createCourierForPersonRequest,
  );
}

export function* createPickerForPersonRequest({ id, pickerTypes }) {
  try {
    const updatedPerson = yield call(createPickerForPerson, {
      id,
      pickerTypes,
    });
    yield put(Creators.createPickerForPersonSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.createPickerForPersonFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreatePickerForPersonRequest() {
  yield takeLatest(
    Types.CREATE_PICKER_FOR_PERSON_REQUEST,
    createPickerForPersonRequest,
  );
}

export function* changeAvatarRequest({ id, name, data }) {
  try {
    const { fileName, url } = yield call(getAvatarSignedUrl, {
      fileName: name,
      contentType: AVATAR_FORMAT,
    });
    const formattedUrl = removeRegionSubstringInUrl({ url });
    yield call(uploadToS3, { signedUrl: formattedUrl, data });
    const updatedPerson = yield call(changeAvatar, {
      id,
      fileName: BUCKET_FOLDER_PATH + fileName,
    });

    yield put(Creators.changeAvatarSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.changeAvatarFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchChangeAvatarRequest() {
  yield takeLatest(Types.CHANGE_AVATAR_REQUEST, changeAvatarRequest);
}

export function* activatePersonRequest({ id, gsm, countryCode, shouldAddEmployeeDiscount }) {
  try {
    const updatedPerson = yield call(activatePerson, { id });
    if (shouldAddEmployeeDiscount) {
      yield call(addEmployeeDiscount, {
        gsm,
        countryCode,
        segments: [CLIENT_SEGMENT_EMPLOYEE_DISCOUNT],
      });
    }
    yield put(Creators.activatePersonSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.activatePersonFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchActivatePersonRequest() {
  yield takeLatest(Types.ACTIVATE_PERSON_REQUEST, activatePersonRequest);
}

export function* deactivatePersonRequest({ id, gsm, countryCode }) {
  try {
    const updatedPerson = yield call(deactivatePerson, { id });
    yield call(removeEmployeeDiscount, {
      gsm,
      countryCode,
      segments: [CLIENT_SEGMENT_EMPLOYEE_DISCOUNT],
    });
    yield put(Creators.deactivatePersonSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.deactivatePersonFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDeactivatePersonRequest() {
  yield takeLatest(Types.DEACTIVATE_PERSON_REQUEST, deactivatePersonRequest);
}

export function* addEmployeeDiscountRequest({ gsm, countryCode }) {
  try {
    const updatedPerson = yield call(addEmployeeDiscount, {
      gsm,
      countryCode,
      segments: [CLIENT_SEGMENT_EMPLOYEE_DISCOUNT],
    });
    yield put(Creators.addEmployeeDiscountSuccess());
    yield commonUpdateSteps({ updatedPerson });
  }
  catch (error) {
    yield put(Creators.addEmployeeDiscountFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAddEmployeeDiscountRequest() {
  yield takeLatest(
    Types.ADD_EMPLOYEE_DISCOUNT_REQUEST,
    addEmployeeDiscountRequest,
  );
}

export function* getPersonContractRequest({ countryCode }) {
  try {
    const data = yield call(getContractListApi, { countryCode });
    yield put(Creators.getPersonContractSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPersonContractFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchContractTypeRequest() {
  yield takeLatest(Types.GET_PERSON_CONTRACT_REQUEST, getPersonContractRequest);
}

export function* getGetirUpTrainingsRequest({ personId }) {
  try {
    const data = yield call(getGetirUpTrainings, { personId });
    yield put(Creators.getGetirUpTrainingsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getGetirUpTrainingsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetGetirUpTrainingsRequest() {
  yield takeLatest(
    Types.GET_GETIR_UP_TRAININGS_REQUEST,
    getGetirUpTrainingsRequest,
  );
}

export function* getFranchisesAreasRequest({ franchiseIds }) {
  try {
    const data = yield call(getFranchisesAreas, { franchiseIds });
    yield put(Creators.getFranchisesAreasSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchisesAreasFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFranchisesAreasRequest() {
  yield takeLatest(
    Types.GET_FRANCHISES_AREAS_REQUEST,
    getFranchisesAreasRequest,
  );
}

export default function* personDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPersonDetailRequest),
      fork(watchUpdatePersonDetailRequest),
      fork(watchAddPersonTrainingRequest),
      fork(watchDisableLoginOfCouriersRequest),
      fork(watchGetPersonNotesRequest),
      fork(watchUpdatePersonNoteRequest),
      fork(watchCreatePersonNoteRequest),
      fork(watchAddMarketEmployerRequest),
      fork(watchEditMarketEmployerRequest),
      fork(watchRemoveMarketEmployerRequest),
      fork(watchChangePasswordRequest),
      fork(watchGetCouriersRequest),
      fork(watchGetPickersRequest),
      fork(watchCreateCourierForPersonRequest),
      fork(watchCreatePickerForPersonRequest),
      fork(watchChangeAvatarRequest),
      fork(watchActivatePersonRequest),
      fork(watchDeactivatePersonRequest),
      fork(watchAddEmployeeDiscountRequest),
      fork(watchUpdatePersonalDetailRequest),
      fork(watchContractTypeRequest),
      fork(watchGetGetirUpTrainingsRequest),
      fork(watchGetFranchisesAreasRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

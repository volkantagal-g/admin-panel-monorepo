import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { addEmployeeDiscount, createPerson, updatePersonDetail } from '@shared/api/person';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';
import { getNewPersonRequestParams } from '../utils';
import { CLIENT_SEGMENT_EMPLOYEE_DISCOUNT } from '../../Detail/constants';
import { getLangKey } from '@shared/i18n';
import { NO_CLIENT_WARNING_CODE } from '../../constants';

function* createPersonRequest({ requestBody }) {
  try {
    const body = getNewPersonRequestParams(requestBody);
    const data = yield call(createPerson, body);
    const { _id, personalGsm, countryGsmCode } = data;
    if (requestBody.shouldAddEmployeeDiscount) {
      const {
        warning,
        warningCode,
      } = yield call(addEmployeeDiscount, { gsm: personalGsm, countryCode: countryGsmCode, segments: [CLIENT_SEGMENT_EMPLOYEE_DISCOUNT] });
      if (warning) {
        toast.info(warning[getLangKey()]);
      }
      if (warningCode === NO_CLIENT_WARNING_CODE) {
        yield call(updatePersonDetail, { personId: _id, updateData: { shouldAddEmployeeDiscount: false } });
      }
    }
    yield put(Creators.createPersonSuccess());
    const path = ROUTE.PERSON_DETAIL.path.replace(':id', _id);
    history.push(path);
  }
  catch (error) {
    yield put(Creators.createPersonFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreatePersonRequest() {
  yield takeLatest(Types.CREATE_PERSON_REQUEST, createPersonRequest);
}

export default function* personNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchCreatePersonRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

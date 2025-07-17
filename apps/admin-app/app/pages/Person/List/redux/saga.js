import { all, call, cancel, take, put, fork, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getPersonList, getPersonListExcel } from '@shared/api/person';
import { Types, Creators } from './actions';

export function* personListRequest({
  query,
  sort,
  fields,
  limit,
  offset,
}) {
  try {
    const { people, total } = yield call(getPersonList, {
      query,
      sort,
      fields,
      limit,
      offset,
    });
    yield put(Creators.getPersonListSuccess({ people, total }));
  }
  catch (error) {
    yield put(Creators.getPersonListFailure());
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchPersonListRequest() {
  yield takeLatest(Types.GET_PERSON_LIST_REQUEST, personListRequest);
}

export function* personListExcelRequest({
  query,
  sort,
  fields,
}) {
  try {
    const { url } = yield call(getPersonListExcel, {
      query,
      sort,
      fields,
    });
    yield put(Creators.getPersonListExcelSuccess());
    window.open(url);
  }
  catch (error) {
    yield put(Creators.getPersonListExcelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchPersonListExcelRequest() {
  yield takeLatest(Types.GET_PERSON_LIST_EXCEL_REQUEST, personListExcelRequest);
}

export default function* personListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPersonListRequest),
      fork(watchPersonListExcelRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

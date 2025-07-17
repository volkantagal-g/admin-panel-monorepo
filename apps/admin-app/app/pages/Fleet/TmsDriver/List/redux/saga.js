import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { filterTmsDrivers } from '@shared/api/fleet';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from '@app/pages/Fleet/TmsDriver/List/redux/actions';
import { getLimitAndOffset } from '@shared/utils/common';
import { LIST_PAGE_FIELDS } from '@app/pages/Fleet/TmsDriver/List/constants';
import { formatRequestParameters } from '../utils';

export function* filterTmsDriversRequest({ currentPage, rowsPerPage, filters }) {
  try {
    const { limit, offset } = getLimitAndOffset({ rowsPerPage, currentPage });
    const requestParameters = formatRequestParameters(filters);
    const { couriers, totalCount } = yield call(filterTmsDrivers, { limit, offset, ...requestParameters, fields: LIST_PAGE_FIELDS });
    yield put(Creators.filterTmsDriversSuccess({ data: couriers, totalCount }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.filterTmsDriversFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchFilterTmsDriversRequest() {
  yield takeLatest(Types.FILTER_TMS_DRIVERS_REQUEST, filterTmsDriversRequest);
}

export default function* tmsDriversListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFilterTmsDriversRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import history from '@shared/utils/history';
import { createBrand } from '@shared/api/brand';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

export function* createBrandRequest({ body }) {
  try {
    const data = yield call(createBrand, { body });
    yield put(ToastCreators.success());
    const brandId = _.get(data, '_id', '');
    const path = ROUTE.BRAND_DETAIL.path.replace(':id', brandId);
    history.push(path);
    yield put(Creators.createBrandSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createBrandFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateBrandRequest() {
  yield takeLatest(Types.CREATE_BRAND_REQUEST, createBrandRequest);
}

export default function* brandNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateBrandRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import { createMarketProductMasterCategory } from '@shared/api/marketProductMasterCategory';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

function* createMarketProductMasterCategoryRequest({ body }) {
  try {
    const data = yield call(createMarketProductMasterCategory, { body });
    yield put(Creators.createMarketProductMasterCategorySuccess({ data }));
    const masterCategoryId = _.get(data, '_id', '');
    const path = ROUTE.MARKET_PRODUCT_MASTER_CATEGORY_DETAIL.path.replace(':id', masterCategoryId);
    history.push(path);
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createMarketProductMasterCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateMarketProductMasterCategoryRequest() {
  yield takeLatest(Types.CREATE_MARKET_PRODUCT_MASTER_CATEGORY_REQUEST, createMarketProductMasterCategoryRequest);
}

export default function* marketProductCategoryNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateMarketProductMasterCategoryRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

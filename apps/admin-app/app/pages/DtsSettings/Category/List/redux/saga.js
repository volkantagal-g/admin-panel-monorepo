import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getDtsCategories } from '@shared/api/dts';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getDtsCategorySettingListRequest({ limit, offset }) {
  try {
    const { dtsRuleCategories: data, totalCount: total } = yield call(getDtsCategories, { limit, offset });

    yield put(Creators.getDtsCategorySettingListSuccess({ data, total }));
  }
  catch (error) {
    yield put(Creators.getDtsCategorySettingListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* dtsCategorySettingListRequest() {
  yield takeLatest(Types.GET_DTS_CATEGORY_SETTING_LIST_REQUEST, getDtsCategorySettingListRequest);
}

export default function* dtsCategorySettingListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(dtsCategorySettingListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

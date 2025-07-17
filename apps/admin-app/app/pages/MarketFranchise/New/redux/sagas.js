import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createMarketFranchise } from '@shared/api/marketFranchise';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

function* createMarketFranchiseRequest({ requestBody }) {
  try {
    const data = yield call(createMarketFranchise, { requestBody });
    yield put(ToastCreators.success());
    const franchiseId = _.get(data, '_id', '');
    const path = ROUTE.MARKET_FRANCHISE_DETAIL.path.replace(':id', franchiseId);
    history.push(path);
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchCreateMarketFranchiseRequest() {
  yield takeLatest(Types.CREATE_MARKET_FRANCHISE_REQUEST, createMarketFranchiseRequest);
}

export default function* marketFranchisesRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateMarketFranchiseRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

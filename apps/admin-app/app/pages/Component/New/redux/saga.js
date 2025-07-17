import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import history from '@shared/utils/history';
import { createComponent } from '@shared/api/component';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

function* createComponentRequest({ body }) {
  try {
    const data = yield call(createComponent, { body });
    yield put(Creators.createComponentSuccess({ data }));
    yield put(ToastCreators.success());
    const componentId = _.get(data, '_id', '');
    const path = ROUTE.COMPONENT_DETAIL.path.replace(':id', componentId);
    history.push(path);
  }
  catch (error) {
    yield put(Creators.createComponentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreatePageRequest() {
  yield takeLatest(Types.CREATE_COMPONENT_REQUEST, createComponentRequest);
}

export default function* pageNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreatePageRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import history from '@shared/utils/history';
import { createPage } from '@shared/api/page';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';
import { getLangKey } from '@shared/i18n';

function* createPageRequest({ body }) {
  try {
    const data = yield call(createPage, { body });
    yield put(Creators.createPageSuccess({ data }));
    yield put(ToastCreators.success());
    const pageId = _.get(data, '_id', '');
    const path = ROUTE.PAGE_DETAIL.path.replace(':id', pageId);
    history.push(path);
  }
  catch (error) {
    let errorMessage = error.response.data.data;
    if (errorMessage?.tr || errorMessage?.en) {
      errorMessage = errorMessage[getLangKey()];
    }

    yield put(Creators.createPageFailure({ error }));
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchCreatePageRequest() {
  yield takeLatest(Types.CREATE_PAGE_REQUEST, createPageRequest);
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

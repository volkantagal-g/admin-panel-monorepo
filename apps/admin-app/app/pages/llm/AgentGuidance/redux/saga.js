import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { t } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getAgentGuidanceContent,
  updateAgentGuidanceContent,
} from '@shared/api/agentGuidance';

function* getAgentGuidanceContentRequest({ filters }) {
  try {
    const { data } = yield call(getAgentGuidanceContent, {
      ...filters,
      level: Number(filters.level),
    });
    yield put(Creators.getAgentGuidanceContentSuccess({ data }));
  }
  catch (error) {
    const errorMessage = t('agentGuidancePage:NO_LLM_CONTENT_PLACEHOLDER');
    yield put(Creators.getAgentGuidanceContentFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* updateAgentGuidanceContentRequest({ data, onSuccess }) {
  try {
    yield call(updateAgentGuidanceContent, data);
    yield put(Creators.updateAgentGuidanceContentSuccess());
    yield put(Creators.getAgentGuidanceContentSuccess({ data: data?.content }));
    if (onSuccess) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.updateAgentGuidanceContentFailure({ error }));
  }
}

function* setFilters({ filters }) {
  try {
    yield put(Creators.setFilters({ filters }));
  }
  catch (error) {
    yield put(ToastCreators.error());
  }
}

function* watchGetAgentGuidanceContentRequest() {
  yield takeLatest(
    Types.GET_AGENT_GUIDANCE_CONTENT_REQUEST,
    getAgentGuidanceContentRequest,
  );
}
function* watchUpdateAgentGuidanceContentRequest() {
  yield takeLatest(
    Types.UPDATE_AGENT_GUIDANCE_CONTENT_REQUEST,
    updateAgentGuidanceContentRequest,
  );
}

function* watchSetFilters() {
  yield take(
    Types.SET_FILTERS,
    setFilters,
  );
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAgentGuidanceContentRequest),
      fork(watchUpdateAgentGuidanceContentRequest),
      fork(watchSetFilters),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

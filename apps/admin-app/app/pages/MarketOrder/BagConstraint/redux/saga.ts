import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  createBagConstraint,
  getBagConstraints,
  getBagExclusions,
  updateBagConstraint,
} from '@shared/api/bag';
import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getMasterCategoriesByLevel } from '@shared/api/marketProductMasterCategory';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';
import { BagConstraint } from '../types';

export function* getBagConstraintsRequest(): Generator<any, any, any> {
  try {
    const data = yield call(getBagConstraints);
    yield put(Creators.getBagConstraintsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getBagConstraintsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getBagExclusionsRequest(): Generator<any> {
  try {
    const data = yield call(getBagExclusions);
    yield put(Creators.getBagExclusionsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getBagExclusionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMasterCategoriesRequest({ level }: {level?: number}): Generator<any, any, any> {
  try {
    const data = yield call(getMasterCategoriesByLevel, { level });
    yield put(Creators.getMasterCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMasterCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* createBagConstraintRequest({
  left,
  right,
  match = true,
  isActive = true,
  description,
  version,
}: BagConstraint): Generator<any, any, any> {
  try {
    const data = yield call(createBagConstraint, {
      left,
      right,
      match,
      isActive,
      description,
      version,
    });
    yield put(Creators.createBagConstraintSuccess({ data }));
    yield put(ToastCreators.success());
    history.push(ROUTE.GETIR_MARKET_BAG_CONSTRAINTS.path);
  }
  catch (error) {
    yield put(Creators.createBagConstraintFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* updateBagConstraintRequest({
  left,
  right,
  match = true,
  isActive = true,
  description,
  _id = '',
  version,
  onSuccess,
}: BagConstraint & {onSuccess: () => void | undefined}): Generator<any, any, any> {
  try {
    yield call(updateBagConstraint, {
      left,
      right,
      match,
      isActive,
      description,
      _id,
      version,
    });
    yield put(Creators.updateBagConstraintSuccess({
      data: {
        left,
        right,
        match,
        isActive,
        description,
        _id,
        version,
      },
    }));
    yield put(ToastCreators.success());
    if (onSuccess) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.updateBagConstraintFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* setSelectedBagConstraint() {
  while (true) {
    const { bagConstraint } = yield take(Types.SET_SELECTED_BAG_CONSTRAINT);
    yield put({ type: Types.SET_SELECTED_BAG_CONSTRAINT, bagConstraint });
  }
}

function* watchGetBagConstraintsRequest() {
  yield takeLatest(Types.GET_BAG_CONSTRAINTS_REQUEST, getBagConstraintsRequest);
}
function* watchGetBagExclusionsRequest() {
  yield takeLatest(Types.GET_BAG_EXCLUSIONS_REQUEST, getBagExclusionsRequest);
}
function* watchGetMasterCategoriesRequest() {
  yield takeLatest(
    Types.GET_MASTER_CATEGORIES_REQUEST,
    getMasterCategoriesRequest,
  );
}
function* watchUpdateBagConstraintRequest() {
  yield takeLatest(
    Types.UPDATE_BAG_CONSTRAINT_REQUEST,
    updateBagConstraintRequest,
  );
}
function* watchCreateBagConstraintRequest() {
  yield takeLatest(
    Types.CREATE_BAG_CONSTRAINT_REQUEST,
    createBagConstraintRequest,
  );
}

export default function* root() {
  const backgroundTasks: Generator<any, any, any> = yield all([
    fork(watchGetBagConstraintsRequest),
    fork(watchGetBagExclusionsRequest),
    fork(watchGetMasterCategoriesRequest),
    fork(watchUpdateBagConstraintRequest),
    fork(watchCreateBagConstraintRequest),
    fork(setSelectedBagConstraint),
  ]);
  yield take(Types.DESTROY_PAGE);
  yield cancel(backgroundTasks);
}

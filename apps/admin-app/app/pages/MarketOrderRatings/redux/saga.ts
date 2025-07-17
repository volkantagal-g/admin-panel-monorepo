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
  getRatingTags,
  createRatingTag,
  multiUpdateRatingTags,
  updateRatingTag,
  deleteRatingTag,
  updateRatingPlaceholder,
  createRatingPlaceholder,
  PlaceholderPayload,
  Tag,
} from '@shared/api/marketOrderRatings';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getRatingTagsRequest({ domainType }: {
  domainType: string;
}): Generator<any> {
  try {
    const data = yield call(getRatingTags, { domainType });
    yield put(Creators.getRatingTagsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRatingTagsFailure({ error }));
    yield put(ToastCreators.error({ message: error }));
  }
}
function* createRatingTagRequest({ body }: {
  body: Tag;
}): Generator<any> {
  try {
    const { ratingTag }: any = yield call(createRatingTag, { body });
    yield put(Creators.createRatingTagSuccess({ data: { ...ratingTag, rating: body?.rating } }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createRatingTagFailure({ error }));
    yield put(ToastCreators.error({ message: error }));
  }
}
function* updateRatingTagRequest({ body }: {
  body: Tag;
}): Generator<any> {
  try {
    const { ratingTag }: any = yield call(updateRatingTag, { body });
    yield put(Creators.updateRatingTagSuccess({ data: ratingTag }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateRatingTagFailure({ error }));
    yield put(ToastCreators.error({ message: error }));
  }
}
function* createRatingPlaceholderRequest({ body }: {
  body: PlaceholderPayload;
}): Generator<any> {
  try {
    const { placeholder } : any = yield call(createRatingPlaceholder, { body });
    yield put(Creators.createRatingPlaceholderSuccess({ data: placeholder }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createRatingPlaceholderFailure({ error }));
    yield put(ToastCreators.error({ message: error }));
  }
}
function* updateRatingPlaceholderRequest({ body }: {
  body: PlaceholderPayload;
}): Generator<any> {
  try {
    const { placeholder }: any = yield call(updateRatingPlaceholder, { body });
    yield put(Creators.updateRatingPlaceholderSuccess({ data: placeholder }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateRatingPlaceholderFailure({ error }));
    yield put(ToastCreators.error({ message: error }));
  }
}
function* deleteRatingTagRequest({ id }: { id: string }) {
  try {
    yield call(deleteRatingTag, { id });
    yield put(Creators.deleteRatingTagSuccess({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateRatingTagFailure({ error }));
    yield put(ToastCreators.error({ message: error }));
  }
}

function* multiUpdateRatingTagsRequest({
  tags,
  rating,
}: {
  tags: Tag[];
  rating: { rating: number; domainType: number };
}): Generator<any> {
  const body = tags.map((tag: Tag) => ({
    id: tag.id,
    priority: tag.priority,
    rating: rating.rating,
    domainType: Number(rating.domainType),
    reason: tag?.reason || 'Tag reason',
    title: tag.title,
  }));
  try {
    yield call(multiUpdateRatingTags, { body });
    yield put(
      Creators.multiUpdateRatingTagsSuccess({ data: { tags, rating } }),
    );
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.multiUpdateRatingTagsFailure({ error }));
    yield put(ToastCreators.error({ message: error }));
  }
}

export function* watchGetRatingTagsRequest() {
  yield takeLatest(Types.GET_RATING_TAGS_REQUEST, getRatingTagsRequest);
}

function* watchCreateRatingTagRequest() {
  yield takeLatest(Types.CREATE_RATING_TAG_REQUEST, createRatingTagRequest);
}

function* watchUpdateRatingTagRequest() {
  yield takeLatest(Types.UPDATE_RATING_TAG_REQUEST, updateRatingTagRequest);
}
function* watchUpdateRatingPlaceholderRequest() {
  yield takeLatest(
    Types.UPDATE_RATING_PLACEHOLDER_REQUEST,
    updateRatingPlaceholderRequest,
  );
}
function* watchCreateRatingPlaceholderRequest() {
  yield takeLatest(
    Types.CREATE_RATING_PLACEHOLDER_REQUEST,
    createRatingPlaceholderRequest,
  );
}

function* watchDeleteRatingTagRequest() {
  yield takeLatest(Types.DELETE_RATING_TAG_REQUEST, deleteRatingTagRequest);
}

function* watchMultiUpdateRatingTagsRequest() {
  yield takeLatest(
    Types.MULTI_UPDATE_RATING_TAGS_REQUEST,
    multiUpdateRatingTagsRequest,
  );
}

export default function* ratingsListRoot() {
  const backgroundTasks = yield all([
    fork(watchGetRatingTagsRequest),
    fork(watchCreateRatingTagRequest),
    fork(watchMultiUpdateRatingTagsRequest),
    fork(watchUpdateRatingTagRequest),
    fork(watchUpdateRatingPlaceholderRequest),
    fork(watchCreateRatingPlaceholderRequest),
    fork(watchDeleteRatingTagRequest),
  ]);

  yield take(Types.DESTROY_PAGE);
  yield cancel(backgroundTasks);
}

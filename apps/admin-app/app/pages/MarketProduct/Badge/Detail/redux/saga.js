import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import { updateBadge, getBadge, createBadgeImageUrl } from '@shared/api/marketProductBadge';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { uploadToS3SignedUrl } from '@shared/api/public';

export function* getBadgeRequest({ id }) {
  try {
    const data = yield call(getBadge, { id });
    yield put(Creators.getBadgeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getBadgeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateBadgeRequest({ id, body }) {
  try {
    const data = yield call(updateBadge, { id, body });
    yield put(Creators.updateBadgeSuccess({ data }));
    yield put(Creators.getBadgeRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateBadgeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateBadgeImageUrlRequest({ id, loadedImage, extension, body, imagePath, isAppliedToOtherLanguanges }) {
  try {
    const { signedUrl, cdnUrl } = yield call(createBadgeImageUrl, { extension });
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedImage });
    yield call(_.set, body, imagePath, cdnUrl);
    if (isAppliedToOtherLanguanges) {
      const imageUrlObj = body.picUrl;
      Object.keys(imageUrlObj).forEach(key => {
        imageUrlObj[key] = cdnUrl;
      });
      _.set(body, imageUrlObj);
    }
    yield put(Creators.updateBadgeRequest({ id, body }));
    yield put(Creators.updateBadgeImageUrlSuccess());
  }
  catch (error) {
    yield put(Creators.updateBadgeImageUrlFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetBadgeRequest() {
  yield takeLatest(Types.GET_BADGE_REQUEST, getBadgeRequest);
}

export function* watchUpdateBadgeRequest() {
  yield takeLatest(Types.UPDATE_BADGE_REQUEST, updateBadgeRequest);
}

export function* watchUpdateBadgeImageUrlRequest() {
  yield takeLatest(Types.UPDATE_BADGE_IMAGE_URL_REQUEST, updateBadgeImageUrlRequest);
}

export default function* badgeDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchGetBadgeRequest), fork(watchUpdateBadgeRequest), fork(watchUpdateBadgeImageUrlRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

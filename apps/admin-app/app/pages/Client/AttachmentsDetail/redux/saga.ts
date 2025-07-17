import { AllEffect, CallEffect, CancelEffect, ForkEffect, PutEffect, TakeEffect, all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { Task } from 'redux-saga';

import { getAttachmentURL as getAttachmentURLApi } from '@shared/api/clientAttachments';
import { Types, Creators } from './actions';
import { GetAttachmentURLResponseType } from '@shared/api/clientAttachments/types';

export type GetAttachmentURLParamType = {
  sessionId: string;
  attachmentId: string;
};

function* getAttachmentURL({
  sessionId,
  attachmentId,
}: GetAttachmentURLParamType): Generator<
  CallEffect<GetAttachmentURLResponseType> | PutEffect,
  void
> {
  try {
    const data = yield call(getAttachmentURLApi, { sessionId, attachmentId });
    yield put(Creators.getAttachmentURLSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAttachmentURLFailure({ error }));
  }
}

function* watchGetAttachmentUrlRequest(): Generator<
  ForkEffect,
  void
  > {
  // unfortunately, reduxsauce actions are untyped
  yield takeLatest(Types.GET_ATTACHMENT_URL_REQUEST as any, getAttachmentURL);
}

export default function* root(): Generator<
  CancelEffect | AllEffect<ForkEffect<void>> | TakeEffect,
  void
  > {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAttachmentUrlRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks as Task);
  }
}

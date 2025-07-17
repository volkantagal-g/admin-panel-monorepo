import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { getCampaigns } from '@shared/api/water';
import { Types, Creators } from './actions';

function* getCampaignsRequest({ data }) {
  try {
    const formData = yield call(getCampaigns, {
      startDate: data.startDate,
      endDate: data.endDate,
      searchWord: data.searchWord,
    });

    let campaigns = formData.data;
    if (data.status) {
      campaigns = formData.data.filter(item => item.status === data.status);
    }

    yield put(Creators.getCampaignsSuccess({ data: campaigns }));
  }
  catch (error) {
    yield put(Creators.getCampaignsFailure({ error }));
  }
}

function* watchGetCampaignsRequest() {
  yield takeLatest(Types.GET_CAMPAIGNS_REQUEST, getCampaignsRequest);
}

export default function* campaignsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchGetCampaignsRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

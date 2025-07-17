import { all, call, put, takeEvery } from 'redux-saga/effects';
import { isFunction as _isFunction } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getCities as getCitiesAPI } from '@shared/api/countryInfo';
import { Types } from './actions';

type getCitiesRequestPropsType = {
  type: string;
  filters: {
    countryId: MongoIDType;
    fields?: string[];
    limit: number;
    offset: number;
  };
  onSuccess: Function;
  onError: Function;
};

function* getCities({ filters: { countryId }, onSuccess, onError }: getCitiesRequestPropsType): Generator {
  try {
    const requestBody = { countryId };

    // @ts-ignore
    const cities = yield call(getCitiesAPI, requestBody);
    if (_isFunction(onSuccess)) {
      onSuccess(cities);
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    if (_isFunction(onError)) {
      onError();
    }
  }
}

function* watchGetCitiesRequest() {
  yield takeEvery(Types.GET_CITIES_REQUEST, getCities);
}

export default function* rootSaga(): Generator {
  yield all([
    watchGetCitiesRequest(),
  ]);
}

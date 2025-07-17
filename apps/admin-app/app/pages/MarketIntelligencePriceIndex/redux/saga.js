import { call, put, takeLatest, select } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getCategories, getSubCategories, fetchCompetitorList, postIndexByData } from '@shared/api/marketIntelligencePriceIndex';
import { exportMarketIntelligencePriceIndex } from '@app/pages/MarketIntelligencePriceIndex/utils/excelExport';
import { Types, Creators } from '@app/pages/MarketIntelligencePriceIndex/redux/actions';
import { stateSelector } from '@app/pages/MarketIntelligencePriceIndex/redux/selectors';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { DOMAIN_TYPE_LIST } from '@app/pages/MarketIntelligencePriceIndex/constants';

export function* getCategoriesSaga() {
  try {
    const country = yield select(stateSelector.country);
    const data = yield call(getCategories, { country });
    yield put(Creators.getCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getSubCategoriesSaga() {
  try {
    const country = yield select(stateSelector.country);
    const data = yield call(getSubCategories, { country });
    yield put(Creators.getSubCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSubCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* fetchCompetitorListSaga({ afterSuccess }) {
  try {
    let country = yield select(getSelectedCountryV2);
    country = country?.code?.alpha2;
    const data = yield call(fetchCompetitorList, { country });
    let competitorList = [];
    if (data.result.length > 0) {
      data.result.forEach(competitor => (
        competitor.includes(country) &&
          !competitor.includes(DOMAIN_TYPE_LIST.GETIR) &&
          !competitor.includes(DOMAIN_TYPE_LIST['GETIR MORE']) ? competitorList.push(competitor[0]) : ''));
    }
    competitorList = competitorList.sort((a, b) => a.localeCompare(b));
    yield put(Creators.fetchCompetitorListSuccess({ competitorList }));
    if (afterSuccess) afterSuccess(competitorList);
  }
  catch (error) {
    yield put(Creators.fetchCompetitorListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* postIndexByDataSaga({ fetchData, indexBy }) {
  try {
    yield put(Creators.setInitialTable());
    const data = yield call(postIndexByData, { fetchData, indexBy });
    yield put(Creators.postIndexByDataSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.postIndexByDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportPriceIndexSaga({ data }) {
  try {
    exportMarketIntelligencePriceIndex(data);
    yield put(Creators.exportPriceIndexSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportPriceIndexFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export default function* marketIntelligencePriceIndexSagaRoot() {
  yield takeLatest(Types.GET_CATEGORIES_REQUEST, getCategoriesSaga);
  yield takeLatest(Types.GET_SUB_CATEGORIES_REQUEST, getSubCategoriesSaga);
  yield takeLatest(Types.FETCH_COMPETITOR_LIST_REQUEST, fetchCompetitorListSaga);
  yield takeLatest(Types.POST_INDEX_BY_DATA_REQUEST, postIndexByDataSaga);
  yield takeLatest(Types.EXPORT_PRICE_INDEX_REQUEST, exportPriceIndexSaga);
}

import { put, takeLatest, select, call } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { exportMarketIntelligenceProducts } from '@app/pages/MarketIntelligenceProducts/utils/excelExport';
import { getCompetitorList, postProductMatchData } from '@shared/api/marketIntelligenceProducts';
import { Types, Creators } from '@app/pages/MarketIntelligenceProducts/redux/actions';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

export function* getCompetitorListSaga() {
  try {
    let country = yield select(getSelectedCountry);
    country = country.code.alpha2;
    const data = yield call(getCompetitorList);
    const currentCompetitorList = [];
    if (data) {
      data.result.map(competitor => {
        if (
          competitor.includes(country) &&
          !competitor.includes('GETIR_MORE')
        ) {
          currentCompetitorList.push(competitor[0]);
        }
        return currentCompetitorList;
      });
    }
    yield put(Creators.getCompetitorListSuccess({ data: currentCompetitorList }));
  }
  catch (error) {
    yield put(Creators.getCompetitorListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* postProductMatchDataSaga({ crawlDate, competitorName }) {
  try {
    const data = yield call(postProductMatchData, { crawlDate, competitorName });
    yield put(Creators.postProductMatchDataSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.postProductMatchDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* exportProductsSaga({ data }) {
  try {
    exportMarketIntelligenceProducts(data);
    yield put(Creators.exportProductsSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export default function* marketIntelligencePriceIndexSagaRoot() {
  yield takeLatest(Types.GET_COMPETITOR_LIST_REQUEST, getCompetitorListSaga);
  yield takeLatest(Types.POST_PRODUCT_MATCH_DATA_REQUEST, postProductMatchDataSaga);
  yield takeLatest(Types.EXPORT_PRODUCTS_REQUEST, exportProductsSaga);
}

import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  getCompetitorListPriceReco,
  getRecommendationData,
  getSimulateIndex,
  getPricingRulesData,
} from '@shared/api/marketIntelligencePriceRecommendation';

import { Types, Creators } from './actions';
import { isValidate } from '../utils/common';
import { calculateBundleIndex } from '../utils/calculate';
import { exportExcel } from '@shared/utils/common';
import { stateSelector } from './selectors';

export function* getRecommendationDataSaga({ domainType }) {
  try {
    const integrationType = yield select(stateSelector.integrationType);
    const data = yield call(getRecommendationData, { domainType, integrationType });
    const tempData = { ...data?.data, data: [] };
    data?.data?.forEach(element => {
      if (
        element &&
        isValidate(element?.price) &&
        isValidate(element?.wholesaleprice)
      ) {
        const tempElement = { ...element };
        tempElement.price_change = 0;
        tempElement.family_id = (element.family_id)?.toString();
        tempElement.new_price = element.price;
        tempElement.recommended_price_percentage =
          element.final_alert || !isValidate(element?.final_result)
            ? 0
            : (100 * (element.final_result - element.price)) / element.price;

        tempElement.margin = parseFloat(
          ((element.price - element.wholesaleprice) / element.price) * 100,
          3,
        );
        tempElement.new_margin = parseFloat(
          ((element.price - element.wholesaleprice) / element.price) * 100,
          3,
        );
        if (element.bundle_product_infos &&
          element.bundle_product_infos !== '' &&
          element.bundle_product_infos?.length > 0) {
          element.bundle_product_infos.map((bundleData, index) => {
            tempElement.bundle_product_infos[index] = {
              ...bundleData,
              bundle_index: calculateBundleIndex(bundleData, element.price),
            };
            return tempElement.bundle_product_infos[index];
          });
        }
        tempData.data.push(tempElement);
      }
    });
    yield put(
      Creators.getRecommendationDataSuccess({ data: { data: tempData, columns: data.columns } }),
    );
  }
  catch (error) {
    yield put(Creators.getRecommendationDataFailure({ error }));
  }
}

export function* getSimulateIndexSaga({
  productList,
  competitorList,
  domainType,
  baseCompetitor,
  indexType,
  priorityList,
}) {
  try {
    const integrationType = yield select(stateSelector.integrationType);
    const data = yield call(getSimulateIndex, {
      productList,
      competitorList,
      domainType,
      baseCompetitor,
      indexType,
      priorityList,
      integrationType,
    });
    yield put(Creators.getSimulateIndexSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSimulateIndexFailure({ error }));
  }
}

export function* getPricingRulesDataSaga({ domainType }) {
  try {
    const data = yield call(getPricingRulesData, { domainType });
    yield put(Creators.getPricingRulesDataSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPricingRulesDataFailure({ error }));
  }
}

export function* getCompetitorListSaga({ domainType }) {
  try {
    const data = yield call(getCompetitorListPriceReco, { domainType });
    yield put(
      Creators.getCompetitorListSuccess({ competitorList: data.result }),
    );
  }
  catch (error) {
    yield put(Creators.getCompetitorListFailure({ error }));
  }
}

function* exportPriceRecommendationRequest({ rows, fileName, columns }) {
  try {
    const tempRows = rows && Object.entries(rows).map(([key, value]) => ({ key, title: value, default: '' }));
    exportExcel(columns, fileName, tempRows);
    yield put(Creators.exportPriceRecommendationSuccess());
  }
  catch (error) {
    yield put(Creators.exportPriceRecommendationFailure({ error }));
  }
}
export default function* priceRecommendationSaga() {
  yield takeLatest(
    Types.GET_RECOMMENDATION_DATA_REQUEST,
    getRecommendationDataSaga,
  );
  yield takeLatest(Types.GET_SIMULATE_INDEX_REQUEST, getSimulateIndexSaga);
  yield takeLatest(Types.GET_COMPETITOR_LIST_REQUEST, getCompetitorListSaga);
  yield takeLatest(
    Types.GET_PRICING_RULES_DATA_REQUEST,
    getPricingRulesDataSaga,
  );
  yield takeLatest(
    Types.EXPORT_PRICE_RECOMMENDATION_REQUEST,
    exportPriceRecommendationRequest,
  );
}

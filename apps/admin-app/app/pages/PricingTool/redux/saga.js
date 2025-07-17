import { call, put, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { exportPricingTool } from '../utils/excelExport';
import { Types, Creators } from './actions';
import { getSimulateIndex, getElasticityData } from '@shared/api/pricingTool';

export function* getElasticityDataSaga() {
  try {
    const data = yield call(getElasticityData);
    const tempData = { ...data?.data, data: [] };

    data?.data?.forEach(element => {
      const tempElement = { ...element };
      tempElement.price_change = 0;
      tempElement.new_price = element.price;

      tempElement.aandm_gross = element.aandm * element.total_sales;
      tempElement.new_aandm_product = element.aandm;
      tempElement.new_aandm_gross = tempElement.aandm_gross;

      tempElement.difference_aandm_product = 0;
      tempElement.difference_aandm_gross = 0;
      tempElement.difference_aandm_percentage = 0;

      tempElement.new_ssr = element.current_ssr * 100;

      tempElement.weekly_sales_predicted = element.total_sales;
      tempElement.weekly_sales_predicted_percentage = 0;

      tempElement.weekly_sales_basket = element.price * element.total_sales;

      tempElement.weekly_total_basket_predicted = element.total_sales * element.price;
      tempElement.weekly_total_basket_predicted_percentage = 0;

      tempElement.margin_current_product = element.price - element.wholesaleprice;
      tempElement.margin_current_product_percentage = (100 * (element.price - element.wholesaleprice)) / element.price;
      tempElement.margin_current_gross = (element.price - element.wholesaleprice) * element.total_sales;

      tempElement.margin_new_product = tempElement.new_price - element.wholesaleprice;
      tempElement.margin_new_product_percentage = (100 * (tempElement.new_price - element.wholesaleprice)) / tempElement.new_price;
      tempElement.margin_new_gross = (tempElement.new_price - element.wholesaleprice) * tempElement.weekly_sales_predicted;

      tempElement.struck_price_margin_difference = tempElement.margin_new_product_percentage - tempElement.margin_current_product_percentage;

      tempElement.margin_difference_product = 0;
      tempElement.margin_difference_product_percentage = 0;
      tempElement.margin_difference_gross = 0;
      tempElement.margin_difference_gross_percentage = 0;

      tempData.data.push(tempElement);
    });
    yield put(Creators.getElasticityDataSuccess({ data: { data: tempData, competitorList: data.competitor_list }, showAandM: true }));
  }
  catch (error) {
    yield put(Creators.getElasticityDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getSimulateIndexSaga({ productList }) {
  try {
    const data = yield call(getSimulateIndex, { productList });
    yield put(Creators.getSimulateIndexSuccess({ data: data?.index?.data }));
  }
  catch (error) {
    yield put(Creators.getSimulateIndexFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportPricingToolRequest({ data }) {
  try {
    exportPricingTool(data);
    yield put(Creators.exportPricingToolSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportPricingToolFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export default function* elasticitySagaRoot() {
  yield takeLatest(
    Types.GET_ELASTICITY_DATA_REQUEST,
    getElasticityDataSaga,
  );
  yield takeLatest(
    Types.EXPORT_PRICING_TOOL_REQUEST,
    exportPricingToolRequest,
  );
  yield takeLatest(
    Types.GET_SIMULATE_INDEX_REQUEST,
    getSimulateIndexSaga,
  );
}

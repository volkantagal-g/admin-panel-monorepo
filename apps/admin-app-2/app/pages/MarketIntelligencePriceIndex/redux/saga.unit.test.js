import { testSaga } from 'redux-saga-test-plan';

import { getCategories, getSubCategories, postIndexByData } from '@shared/api/marketIntelligencePriceIndex';
import { getCategoriesSaga, getSubCategoriesSaga, postIndexByDataSaga } from '@app/pages/MarketIntelligencePriceIndex/redux/saga';
import { Creators } from '@app/pages/MarketIntelligencePriceIndex/redux/actions';
import { stateSelector } from '@app/pages/MarketIntelligencePriceIndex/redux/selectors';

const mockedFetchData = {
  exclude_category: [],
  exclude_subcategory: [],
  country_code: 'TR',
  base_competitor: 'A101',
  category: null,
  competitor_list: ['A101', 'BANABI', 'CARREFOUR', 'FILE', 'ISTEGELSIN', 'MIGROS_HEMEN', 'MIGROS_SANALMARKET', 'SOK'],
  domain_type: 'GETIR_10',
  index_type: 1,
  subcategory: null,
};

const fakeRequestData = {
  fetchData: mockedFetchData,
  indexBy: 'price_index_categories_data',
};

describe('PriceIndex redux saga testing', () => {
  describe('saga #getCategoriesRequest', () => {
    it('should call the getCategoriesRequest (success)', () => {
      testSaga(getCategoriesSaga)
        .next()
        .select(stateSelector.country)
        .next('TR')
        .call(getCategories, { country: 'TR' })
        .next()
        .put(Creators.getCategoriesSuccess({ data: undefined }))
        .next()
        .isDone();
    });
  });
  describe('saga #getSubCategoriesSaga', () => {
    it('should call the getSubCategoriesSaga (success)', () => {
      testSaga(getSubCategoriesSaga)
        .next()
        .select(stateSelector.country)
        .next('TR')
        .call(getSubCategories, { country: 'TR' })
        .next()
        .put(Creators.getSubCategoriesSuccess({ data: undefined }))
        .next()
        .isDone();
    });
  });
  describe('saga #postIndexByDataSaga', () => {
    it('should call the postIndexByData (success)', () => {
      testSaga(postIndexByDataSaga, fakeRequestData)
        .next()
        .put(Creators.setInitialTable())
        .next()
        .call(postIndexByData, fakeRequestData)
        .next()
        .put(Creators.postIndexByDataSuccess({ data: undefined }))
        .next()
        .isDone();
    });
  });
});

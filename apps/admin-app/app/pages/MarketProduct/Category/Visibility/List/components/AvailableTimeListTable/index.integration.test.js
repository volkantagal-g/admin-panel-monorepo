import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import AvailableTimeListTable from './index';
import {
  mockedFilteredWareHouses,
  mockedGetCities,
  mockedMarketProductCategories,
  mockedMarketProductCategoryAvailableTimes,
} from '@shared/api/marketProductCategory/index.mock.data';
import { getMarketProductCategoryAvailableTimesSelector } from '@app/pages/MarketProduct/Category/Visibility/List/redux/selectors';
import {
  getCitiesSelector,
  getFilteredWarehousesSelector,
  getMarketProductCategoriesSelector,
} from '@shared/redux/selectors/common';

describe('MarketProduct/Category/Visibility/List', () => {
  afterAll(cleanup);
  describe('AvailableTimeListTable', () => {
    it('should render component without error', async () => {
      const spyGetMarketProductCategoryAvailableTimesSelector = jest.spyOn(getMarketProductCategoryAvailableTimesSelector, 'getData');
      spyGetMarketProductCategoryAvailableTimesSelector.mockReturnValue(mockedMarketProductCategoryAvailableTimes);

      const spyGetFilteredWareHousesSelector = jest.spyOn(getFilteredWarehousesSelector, 'getData');
      spyGetFilteredWareHousesSelector.mockReturnValue(mockedFilteredWareHouses);

      const spyGetCitiesSelector = jest.spyOn(getCitiesSelector, 'getData');
      spyGetCitiesSelector.mockReturnValue(mockedGetCities);

      const spyGetMarketProductCategoriesSelector = jest.spyOn(getMarketProductCategoriesSelector, 'getData');
      spyGetMarketProductCategoriesSelector.mockReturnValue(mockedMarketProductCategories);
      await renderComponent({
        ui: (
          <AvailableTimeListTable />
        ),
      });
    });
  });
});

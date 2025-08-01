import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import renderComponent from '@test/publicUtils/renderComponent';
import WeekMinPickerInfo from './index';
import {
  getCitiesSelector,
  getFilteredWarehousesSelector,
  getMarketProductCategoriesSelector, getMarketProductSubCategoriesSelector,
} from '@shared/redux/selectors/common';
import { mockedGetCities, mockedMarketProductCategories, mockedMarketProductSubCategories } from '@shared/api/marketProductCategory/index.mock.data';
import { mockedWarehouses } from '@shared/api/warehouse/index.mock.data';
import { getMarketProductSubCategoriesMock } from '@shared/api/marketProductCategory/index.mock.handler';

describe('MarketProduct/Category/Visibility/New', () => {
  afterAll(cleanup);
  describe('WeekMinPickerInfo', () => {
    it('should render component without error', async () => {
      mockApiPerTestCase(getMarketProductSubCategoriesMock);
      const spyGetCitiesSelector = jest.spyOn(getCitiesSelector, 'getData');
      spyGetCitiesSelector.mockReturnValue(mockedGetCities);

      const spyGetFilteredWarehousesSelector = jest.spyOn(getFilteredWarehousesSelector, 'getData');
      spyGetFilteredWarehousesSelector.mockReturnValue(mockedWarehouses);

      const spyGetMarketProductCategoriesSelector = jest.spyOn(getMarketProductCategoriesSelector, 'getData');
      spyGetMarketProductCategoriesSelector.mockReturnValue(mockedMarketProductCategories);

      const spyGetMarketProductSubCategoriesSelector = jest.spyOn(getMarketProductSubCategoriesSelector, 'getData');
      spyGetMarketProductSubCategoriesSelector.mockReturnValue(mockedMarketProductSubCategories);

      await renderComponent({
        ui: (
          <WeekMinPickerInfo />
        ),
      });

      const [citySelect] = screen.getAllByRole('combobox');
      userEvent.click(citySelect);
      const [citySelectAllButton] = screen.getAllByText(/Select All/i);
      userEvent.click(citySelectAllButton);
      const [cityUnselectAllButton] = screen.getAllByText(/Unselect All/i);
      userEvent.click(cityUnselectAllButton);
      expect(citySelectAllButton).toBeInTheDocument();

      const [, wareHouseSelect] = screen.getAllByRole('combobox');
      userEvent.click(wareHouseSelect);
      const [, wareHouseSelectAllButton] = screen.getAllByText(/Select All/i);
      userEvent.click(wareHouseSelectAllButton);
      const [wareHouseUnselectAllButton] = screen.getAllByText(/Unselect All/i);
      userEvent.click(wareHouseUnselectAllButton);
      expect(wareHouseSelectAllButton).toBeInTheDocument();

      const [, , categorySelect] = screen.getAllByRole('combobox');
      userEvent.click(categorySelect);
      const [, , categorySelectAllButton] = screen.getAllByText(/Select All/i);
      userEvent.click(categorySelectAllButton);

      const [, , , subCategorySelect] = screen.getAllByRole('combobox');
      userEvent.click(subCategorySelect);
      const [, , , subCategorySelectAllButton] = screen.getAllByText(/Select All/i);
      userEvent.click(subCategorySelectAllButton);
      const [, subCategoryUnselectAllButton] = screen.getAllByText(/Unselect All/i);
      userEvent.click(subCategoryUnselectAllButton);
      expect(subCategorySelectAllButton).toBeInTheDocument();

      const [, , , , domainTypeSelect] = screen.getAllByRole('combobox');
      userEvent.click(domainTypeSelect);
      const [, , , , domainTypeSelectAllButton] = screen.getAllByText(/Select All/i);
      userEvent.click(domainTypeSelectAllButton);
      const [, domainTypeUnselectAllButton] = screen.getAllByText(/Unselect All/i);
      userEvent.click(domainTypeUnselectAllButton);
      expect(domainTypeSelectAllButton).toBeInTheDocument();

      const categoryUnselectAllButton = screen.getByText(/Unselect All/i);
      userEvent.click(categorySelect);
      userEvent.click(categoryUnselectAllButton);
      expect(categorySelectAllButton).toBeInTheDocument();

      const [, , , , , tableSelectAllButton] = screen.getAllByText(/Select All/i);
      userEvent.click(tableSelectAllButton);
      const tableUnselectAllButton = screen.getByText(/Unselect All/i);
      userEvent.click(tableUnselectAllButton);
      expect(tableSelectAllButton).toBeInTheDocument();
    });
  });
});

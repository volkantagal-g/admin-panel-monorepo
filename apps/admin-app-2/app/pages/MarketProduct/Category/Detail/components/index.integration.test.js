import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import AdditionalInfoForm from '@app/pages/MarketProduct/Category/Detail/components/AdditionalInfoForm';
import MarketProductCategoryDetailForm from '@app/pages/MarketProduct/Category/Detail/components/Form';
import Header from '@app/pages/MarketProduct/Category/Detail/components/Header';
import ImageInfo from '@app/pages/MarketProduct/Category/Detail/components/ImageInfo';
import ParentCategoryTable from '@app/pages/MarketProduct/Category/Detail/components/ParentCategoryTable';
import SubCategoryTable from '@app/pages/MarketProduct/Category/Detail/components/SubCategoryTable';
import { getMarketProductCategoryByIdSelector } from '@app/pages/MarketProduct/Category/Detail/redux/selectors';
import { mockedMarketProductCategory } from '@shared/api/marketProductCategory/index.mock.data';

describe('MarketProductCategoryDetail Components', () => {
  afterAll(cleanup);
  describe('MarketProductCategoryDetail Page', () => {
    it('should render ParentCategoryTable without error', async () => {
      const spyGetMarketProductCategoryByIdSelector = jest.spyOn(getMarketProductCategoryByIdSelector, 'getData');
      spyGetMarketProductCategoryByIdSelector.mockReturnValue(mockedMarketProductCategory);
      await renderComponent({
        ui: (
          <ParentCategoryTable />
        ),
      });
    });
    it('should render AdditionalInfoForm without error', async () => {
      await renderComponent({
        ui: (
          <AdditionalInfoForm />
        ),
      });
    });
    it('should render MarketProductCategoryDetailForm without error', async () => {
      await renderComponent({
        ui: (
          <MarketProductCategoryDetailForm />
        ),
      });
    });
    it('should render Header without error', async () => {
      await renderComponent({
        ui: (
          <Header />
        ),
      });
    });
    it('should render ImageInfo without error', async () => {
      await renderComponent({
        ui: (
          <ImageInfo />
        ),
      });
    });
    it('should render SubCategoryTable without error', async () => {
      await renderComponent({
        ui: (
          <SubCategoryTable />
        ),
      });
    });
  });
});

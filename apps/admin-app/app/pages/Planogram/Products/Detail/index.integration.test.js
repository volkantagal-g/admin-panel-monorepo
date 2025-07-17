import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';

import { getPlanogramProductDetailsSelector } from '@app/pages/Planogram/Products/redux/selectors';
import PageComponent from '@app/pages/Planogram/Products/Detail/index';
import GeneralInfoForm from '@app/pages/Planogram/Products/Detail/components/GeneralInfoForm';
import { mockProductDetail, mockProductDetailTable } from '@app/pages/Planogram/Products/index.mock.data';

const setIsFormEditable = jest.fn();

describe('Product Detail Page', () => {
  const initialUrl = '/planogram/product/detail/testId';
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PLANOGRAM_PRODUCT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe('For page features', () => {
    beforeEach(() => {
      setIsFormEditable.mockReset();
    });

    it('should have back button', () => {
      expect(screen.getByText('Back')).toBeInTheDocument();
    });
    it('should have correct general info form content', async () => {
      const getPlanogramProductDetailProductSpy = jest.spyOn(getPlanogramProductDetailsSelector, 'getProductData');
      getPlanogramProductDetailProductSpy.mockReturnValue(mockProductDetail);

      const getAssignedWarehousesSpy = jest.spyOn(getPlanogramProductDetailsSelector, 'getAssignedWarehousesData');
      getAssignedWarehousesSpy.mockReturnValue(mockProductDetailTable);

      await renderComponent({
        ui: (
          <GeneralInfoForm
            isFormEditable={false}
            setIsFormEditable={setIsFormEditable}
          />
        ),
      });
      expect(screen.getByText('Product Name')).toBeInTheDocument();
      expect(screen.getByText('Product Id')).toBeInTheDocument();
      expect(screen.getByText('Warehouse Type')).toBeInTheDocument();
      expect(screen.getByText('Domain')).toBeInTheDocument();
      expect(screen.getByText('Demography')).toBeInTheDocument();
      expect(screen.getByText('Size')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Enabled')).toBeInTheDocument();
    });
  });
});

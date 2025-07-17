import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';

import { getPlanogramWarehouseDetailsSelector } from '@app/pages/Planogram/Warehouses/redux/selectors';

import PageComponent from '@app/pages/Planogram/Warehouses/Convert/index';
import GeneralInfoForm from '@app/pages/Planogram/Warehouses/Convert/components/GeneralInfoForm';

describe('Warehouse Convert Page', () => {
  const initialUrl = '/planogram/warehouses/convert/testId';

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PLANOGRAM_WAREHOUSE_CONVERT,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe('For page features', () => {
    it('should have back button', () => {
      expect(screen.getByText('Back')).toBeInTheDocument();
    });
    it('should have correct general info form content', async () => {
      const getPlanogramWarehouseDetailWarehouseSpy = jest.spyOn(getPlanogramWarehouseDetailsSelector, 'getWarehouseData');
      getPlanogramWarehouseDetailWarehouseSpy.mockReturnValue([]);

      const getPlanogramWarehouseDetailProductSpy = jest.spyOn(getPlanogramWarehouseDetailsSelector, 'getProductData');
      getPlanogramWarehouseDetailProductSpy.mockReturnValue([]);

      await renderComponent({ ui: <GeneralInfoForm /> });
      expect(screen.getByText('Warehouse Name')).toBeInTheDocument();
      expect(screen.getByText('Warehouse Id')).toBeInTheDocument();
      expect(screen.getByText('Warehouse Type')).toBeInTheDocument();
      expect(screen.getByText('Domain')).toBeInTheDocument();
      expect(screen.getByText('City')).toBeInTheDocument();
      expect(screen.getByText('Region')).toBeInTheDocument();
      expect(screen.getByText('Demography')).toBeInTheDocument();
      expect(screen.getByText('Size')).toBeInTheDocument();
    });
    it('should be enable demography/size/reference and info fileds', async () => {
      expect(screen.getByText('Demography')).toBeEnabled();
      expect(screen.getByText('Size')).toBeEnabled();
    });
  });
});

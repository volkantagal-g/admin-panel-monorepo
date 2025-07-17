import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';

import { getPlanogramWarehouseDetailsSelector } from '@app/pages/Planogram/Warehouses/redux/selectors';
import GeneralInfoForm from '@app/pages/Planogram/Warehouses/Detail/components/GeneralInfoForm';
import PageComponent from '@app/pages/Planogram/Warehouses/Detail/index';

const setIsFormEditable = jest.fn();

describe('Warehouse Detail Page', () => {
  const initialUrl = '/planogram/warehouses/detail/testId';

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PLANOGRAM_WAREHOUSES_DETAIL,
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
      const getPlanogramWarehouseDetailsProductSpy = jest.spyOn(
        getPlanogramWarehouseDetailsSelector,
        'getProductData',
      );
      getPlanogramWarehouseDetailsProductSpy.mockReturnValue([]);

      const getPlanogramWarehouseDetailsWarehouseSpy = jest.spyOn(
        getPlanogramWarehouseDetailsSelector,
        'getWarehouseData',
      );
      getPlanogramWarehouseDetailsWarehouseSpy.mockReturnValue([]);

      await renderComponent({
        ui: (
          <GeneralInfoForm
            isFormEditable={false}
            setIsFormEditable={setIsFormEditable}
          />
        ),
      });
      expect(screen.getByText('Warehouse Name')).toBeInTheDocument();
      expect(screen.getByText('Warehouse Id')).toBeInTheDocument();
      expect(screen.getByText('Warehouse Type')).toBeInTheDocument();
      expect(screen.getByText('Domain')).toBeInTheDocument();
      expect(screen.getByText('City')).toBeInTheDocument();
      expect(screen.getByText('Region')).toBeInTheDocument();
      expect(screen.getByText('Demography')).toBeInTheDocument();
      expect(screen.getByText('Size')).toBeInTheDocument();
    });
    it('should change disable/enable fields after click edit', async () => {
      const editButton = await screen.findByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
      expect(screen.getByText('Demography')).toBeEnabled();
      expect(screen.getByText('Size')).toBeEnabled();
    });
  });
});

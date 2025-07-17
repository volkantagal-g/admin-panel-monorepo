import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';

import { expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';
import DataTable from './components/DataTable';
import Filter from './components/Filter';

const initialUrl = '/getirWater/slotConfig';

describe('In Getir Water Slot Config Page:', () => {
  describe('For slot config page', () => {
    it('should render successfully ', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_GETIR_WATER_SLOT_CONFIG,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Getir Water Slot Config');
    });
  });
  describe('For Filters', () => {
    it('Should render filters', async () => {
      await renderComponent({ ui: <Filter /> });
      const applyFilterBtn = screen.getByText(/Apply Filters/);
      expect(applyFilterBtn).toBeInTheDocument();
    });

    it('should be able to select warehouse filter', async () => {
      const warehouseSelect = screen.getByText('Select Warehouse');
      await waitFor(() => {
        expect(warehouseSelect).toBeEnabled();
      });
      userEvent.click(warehouseSelect);
    });
  });

  describe('<DataTable /> Component', () => {
    it('Should render table', async () => {
      await renderComponent({ ui: <DataTable /> });
      const slotConfigTable = screen.getByText(/Slot End/);
      expect(slotConfigTable).toBeInTheDocument();
    });
    it('should be able to select update slot capacity button', async () => {
      const updateSlotCapacity = screen.getByText('Update Slot Capacity');
      await waitFor(() => {
        expect(updateSlotCapacity).toBeEnabled();
      });
      userEvent.click(updateSlotCapacity);
    });
  });
});

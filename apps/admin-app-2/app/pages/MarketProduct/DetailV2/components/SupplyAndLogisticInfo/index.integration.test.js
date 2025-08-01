import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import SupplyAndLogistic from './index';
import {
  getMarketProductAllPriceSelector, createSupplyLogisticInfoSelector, updateSupplyLogisticInfoSelector,
  getSupplyLogisticInfoSelector, getMasterCategoriesV2Selector, getSupplyBrandsSelector, updateMarketProductPricingSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

describe('Market Product/Detail/Pricing Info', () => {
  beforeAll(() => {
    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue([]);

    const updateSupplyLogisticInfoPending = jest.spyOn(updateSupplyLogisticInfoSelector, 'getIsPending');
    const updateSupplyLogisticInfoError = jest.spyOn(updateSupplyLogisticInfoSelector, 'getError');
    const updateSupplyLogisticInfoData = jest.spyOn(updateSupplyLogisticInfoSelector, 'getData');
    updateSupplyLogisticInfoPending.mockReturnValue(false);
    updateSupplyLogisticInfoError.mockReturnValue(false);
    updateSupplyLogisticInfoData.mockReturnValue([]);

    const createSupplyLogisticInfoPending = jest.spyOn(createSupplyLogisticInfoSelector, 'getIsPending');
    createSupplyLogisticInfoPending.mockReturnValue(false);

    const getSupplyLogisticInfoSPending = jest.spyOn(getSupplyLogisticInfoSelector, 'getIsPending');
    const getSupplyLogisticInfoSData = jest.spyOn(getSupplyLogisticInfoSelector, 'getData');
    getSupplyLogisticInfoSPending.mockReturnValue(false);
    getSupplyLogisticInfoSData.mockReturnValue([]);

    const getMasterCategoriesV2Pending = jest.spyOn(getMasterCategoriesV2Selector, 'getIsPending');
    const getMasterCategoriesV2Data = jest.spyOn(getMasterCategoriesV2Selector, 'getData');
    getMasterCategoriesV2Pending.mockReturnValue(false);
    getMasterCategoriesV2Data.mockReturnValue([]);

    const getSupplyBrandsPending = jest.spyOn(getSupplyBrandsSelector, 'getIsPending');
    const getSupplyBrandsData = jest.spyOn(getSupplyBrandsSelector, 'getData');
    getSupplyBrandsPending.mockReturnValue(false);
    getSupplyBrandsData.mockReturnValue([
      {
        _id: '643988b14510c59f64562989',
        name: 'Marka 1',
        isActive: false,
        updatedBy: '60b3eb099a6ee71f03c5f8a2',
        updatedAt: '2023-04-14T17:09:05.893Z',
        createdAt: '2023-04-14T17:09:05.893Z',
      },
    ]);

    const updateMarketProductPricingPending = jest.spyOn(updateMarketProductPricingSelector, 'getIsPending');
    const updateMarketProductPricingError = jest.spyOn(updateMarketProductPricingSelector, 'getError');
    const updateMarketProductPricingData = jest.spyOn(updateMarketProductPricingSelector, 'getData');
    updateMarketProductPricingPending.mockReturnValue(false);
    updateMarketProductPricingError.mockReturnValue(false);
    updateMarketProductPricingData.mockReturnValue({});
  });
  afterAll(cleanup);

  describe('Supply And Logistic Info Tab', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <SupplyAndLogistic />
        ),
      });
      await screen.findByText('Segments');
      await screen.findByText('Transfer Info');
      await screen.findByText('Demand & Storage Info');
      await screen.findByText('General Info');
      await screen.findByText('Expiry Date Info');
      await screen.findByText('Packaging Info');
    });
    it('should edit/cancel Brand Info correctly', async () => {
      const [editBtn] = await screen.findAllByRole('button', { name: /edit/i });
      userEvent.click(editBtn);
      const [brandSelect] = await screen.findAllByRole('combobox');
      userEvent.click(brandSelect);
      expect(await screen.findByText('Cancel')).toBeInTheDocument();
      expect(await screen.findByText('Save')).toBeInTheDocument();
      const cancelBtn = await screen.findByRole('button', { name: /cancel/i });
      userEvent.click(cancelBtn);
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
      expect(screen.queryByText('Save')).not.toBeInTheDocument();
    });
  });
});

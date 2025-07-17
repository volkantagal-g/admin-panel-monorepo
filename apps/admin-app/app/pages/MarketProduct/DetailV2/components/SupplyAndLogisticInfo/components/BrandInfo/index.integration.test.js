import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import { BrandInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/BrandInfo/index';

import renderComponent from '@test/publicUtils/renderComponent';

import {
  createSupplyLogisticInfoSelector, getSupplyBrandsSelector,
  getSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

describe('Market Product/Detail/Supply & Logistic Info/BrandInfo', () => {
  beforeAll(() => {
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
  });
  afterAll(cleanup);

  describe('BrandInfo', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <BrandInfo />
        ),
      });
    });
    it('should have correct form content', async () => {
      expect(screen.getByText('Brand')).toBeInTheDocument();
    });
  });
});

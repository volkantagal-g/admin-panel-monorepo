import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { MasterCategoryV2Info } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/MasterCategoryV2Info/index';

import renderComponent from '@test/publicUtils/renderComponent';

import {
  createSupplyLogisticInfoSelector, getMasterCategoriesV2Selector,
  getSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

describe('Market Product/Detail/Supply & Logistic Info/ MasterCategoryV2Info', () => {
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

    const getMasterCategoryV2Pending = jest.spyOn(getMasterCategoriesV2Selector, 'getIsPending');
    const getMasterCategoryV2Data = jest.spyOn(getMasterCategoriesV2Selector, 'getData');
    getMasterCategoryV2Pending.mockReturnValue(false);
    getMasterCategoryV2Data.mockReturnValue([
      {
        _id: '6156af869883dce26caa1f95',
        name: {
          tr: 'SADE PROBIYOTIK YOĞURT',
          en: 'SADE PROBIYOTIK YOĞURT',
        },
        countryCode: 'TR',
        country: '55999ad00000010000000000',
        parent: {
          _id: '6156af7f9883dce26caa1edd',
          name: {
            tr: 'PROBIYOTIK YOĞURT',
            en: 'PROBIYOTIK YOĞURT',
          },
          country: '55999ad00000010000000000',
          countryCode: 'TR',
          status: 1,
          level: 30,
          parent: {
            _id: '6156af7c9883dce26caa1ec1',
            name: {
              tr: 'SÜT & KAHVALTI',
              en: 'SÜT & KAHVALTI',
            },
            country: '55999ad00000010000000000',
            countryCode: 'TR',
            status: 1,
            level: 20,
            parent: {
              _id: '6156af7a9883dce26caa1ebd',
              name: {
                tr: 'KAHVALTILIK',
                en: 'KAHVALTILIK',
              },
              country: '55999ad00000010000000000',
              countryCode: 'TR',
              status: 0,
              level: 10,
              createdAt: '2021-10-01T00:00:00.000Z',
              updatedAt: '2023-04-09T16:09:56.227Z',
              description: 'string',
              pickingOrder: 5,
            },
            createdAt: '2021-10-01T00:00:00.000Z',
            updatedAt: '2021-10-01T00:00:00.000Z',
          },
          createdAt: '2021-10-01T00:00:00.000Z',
          updatedAt: '2021-10-01T00:00:00.000Z',
          pickingOrder: 169,
        },
        status: 1,
        level: 40,
      },
    ]);
  });
  afterAll(cleanup);

  describe('MasterCategoryV2Info', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <MasterCategoryV2Info />
        ),
      });
    });
  });
});

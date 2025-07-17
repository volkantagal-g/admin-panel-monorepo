import { find as _find } from 'lodash';

import * as MOCKS from './index.mock.data';
import * as WAREHOUSE_MOCKS from '../warehouse/index.mock.data';
import * as COURIER_MOCKS from '../courier/index.mock.data';
import { getRandomNumber } from '@shared/utils/common';

const getOrdersByFilters = {
  url: '/marketOrderAnalytics/getOrdersByFilters',
  successData: MOCKS.mockedMarketOrders,
};

const getActiveOrdersForCustomerServices = {
  url: '/marketOrderAnalytics/getActiveOrdersForCustomerServices',
  method: 'post',
  handler: req => {
    const mockResponse = { ...MOCKS.getActiveOrdersForCustomerServicesMock };
    const { warehouseIds, courierId } = req.body;

    mockResponse.orders = mockResponse.orders.map(order => {
      const randomNumber = getRandomNumber({ max: (warehouseIds?.length ?? 1) - 1 });
      const warehouseData = warehouseIds?.length && _find(WAREHOUSE_MOCKS.mockedWarehouses, { _id: warehouseIds[randomNumber] });
      const courierData = courierId && _find(COURIER_MOCKS.findCouriersByNameMockOptions, { _id: courierId });

      return {
        ...order,
        ...(warehouseIds?.length && {
          warehouse: {
            warehouse: {
              _id: warehouseData._id,
              name: warehouseData.name,
            },
          },
        }),
        ...(courierData && {
          courier: {
            courier: {
              _id: courierData._id,
              name: courierData.name,
            },
          },
        }),
      };
    });

    return { data: mockResponse };
  },
};

const getActiveOrdersForOperation = {
  url: '/marketOrderAnalytics/getActiveOrdersForOperation',
  successData: MOCKS.getActiveOrdersForOperationMock,
};

const getActiveOrdersForManagement = {
  url: '/marketOrderAnalytics/getActiveOrdersForManagementV2',
  successData: MOCKS.getActiveOrdersForManagementMock,
};

const getActiveOrdersExecutiveStats = {
  url: '/marketOrderAnalytics/getActiveOrdersExecutiveStats',
  successData: MOCKS.getActiveOrdersExecutiveStatsMock,
};

const getActiveOrdersProductsCount = {
  url: '/marketOrderAnalytics/getActiveOrdersProductsCount',
  successData: MOCKS.getActiveOrdersProductsCountMock,
};

const getClientsWhoHasActiveOrder = {
  url: '/marketOrderAnalytics/getClientsWhoHasActiveOrder',
  successData: MOCKS.getClientsWhoHasActiveOrderMock,
};

const getActiveOrderStatsByFilters = {
  url: '/marketOrderAnalytics/getActiveOrderStatsByFilters',
  successData: MOCKS.getActiveOrderStatsByFilters,
};

const getActiveOrdersExecutiveStatsManagement = {
  url: '/marketOrderAnalytics/getActiveOrdersExecutiveStatsManagement',
  successData: MOCKS.getActiveOrdersExecutiveStatsManagementMock,
};

export default [
  getOrdersByFilters,
  getActiveOrdersForCustomerServices,
  getActiveOrdersForOperation,
  getActiveOrdersForManagement,
  getClientsWhoHasActiveOrder,
  getActiveOrdersExecutiveStats,
  getActiveOrdersProductsCount,
  getActiveOrderStatsByFilters,
  getActiveOrdersExecutiveStatsManagement,
];

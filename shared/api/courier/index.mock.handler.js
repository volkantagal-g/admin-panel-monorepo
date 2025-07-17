import * as MOCKS from './index.mock.data';
import { getRandomNumber } from '@shared/utils/common';

const courierId = '61d578c24a90159d5ecf2e33';
const getWarehouseListURL = '/warehouse/getWarehouses';
const getFranchiseListURL = '/marketFranchise/getMarketFranchises';
const releaseCourierURL = '/courier/releaseCourier';
const setWarehouseToCourierURL = '/courier/setWarehouseToCourier';
const setDomainTypeURL = `/courier/setDomainType/${courierId}`;
const getOrderListURL = `/courier/marketOrder/${courierId}`;
const getCourierStatusLogsURL = '/courier/statusLogs/:courierId';
const getBusyOptionsURL = '/courier/getBusyOptions';
const courierFeedbackListURL = '/courier/feedback/list';
const courierStatusAndBusyListURL = '/courier/statusAndBusyList';
const courierLogsURL = `/courier/sendDeviceLogsNotification/${courierId}`;

const getWarehouseListConfigMock = {
  url: getWarehouseListURL,
  method: 'post',
  successData: MOCKS.warehouseListMock,
};

const getFranchiseListConfigMock = {
  url: getFranchiseListURL,
  method: 'post',
  successData: MOCKS.franchiseListMock,
};

const releaseCourierConfigMock = {
  url: releaseCourierURL,
  method: 'post',
  successData: MOCKS.releaseCourierMock,
};

const setWarehouseToCourierConfigMock = {
  url: setWarehouseToCourierURL,
  method: 'post',
  successData: MOCKS.setWarehouseToCourierMock,
};

const setDomainTypeConfigMock = {
  url: setDomainTypeURL,
  method: 'put',
  successData: MOCKS.setDomainTypeConfigMock,
};

const getOrderListConfigMock = {
  url: getOrderListURL,
  method: 'get',
  successData: MOCKS.getOrderListMock,
};

const getCourierStatusLogsMockOptions = {
  url: getCourierStatusLogsURL,
  method: 'get',
  successData: MOCKS.courierStatusLogsMock,
};
const getBusyOptionsMockOptions = {
  url: getBusyOptionsURL,
  method: 'post',
  successData: [],
};

const getInitialCouriersForLiveMapMock = {
  url: '/courier/getInitialCouriersForLiveMap',
  method: 'post',
  handler: req => {
    const { warehouseIds } = req.body;
    const mockResponse = MOCKS.getInitialCouriersForLiveMapMock.map(courier => {
      const randomNumber = getRandomNumber({ max: warehouseIds.length });
      return {
        ...courier,
        warehouse: warehouseIds[randomNumber],
      };
    });
    return { data: mockResponse };
  },
};

const findCouriersByNameMock = {
  url: '/courier/findCouriersByName',
  method: 'post',
  handler: req => {
    const { name } = req.body;
    const mockResponse = MOCKS.findCouriersByNameMockOptions.filter(courier => courier.name.toLowerCase().includes(name.toLowerCase()));
    return { data: mockResponse };
  },
};

const feedbackChartDataMock = {
  url: courierFeedbackListURL,
  method: 'post',
  successData: MOCKS.courierFeedbacksMockChartData,
};

const feedbackTableDataMock = {
  url: courierFeedbackListURL,
  method: 'post',
  successData: MOCKS.courierFeedbacksMockTableData,
};

const courierBusyAndStatusMock = {
  url: courierStatusAndBusyListURL,
  method: 'post',
  successData: MOCKS.courierStatusAndBusyData,
};

const getCourierLogsMock = {
  url: courierLogsURL,
  method: 'post',
  successData: { success: true },
};

export default [
  getWarehouseListConfigMock,
  getFranchiseListConfigMock,
  releaseCourierConfigMock,
  setWarehouseToCourierConfigMock,
  setDomainTypeConfigMock,
  getOrderListConfigMock,
  getCourierStatusLogsMockOptions,
  getBusyOptionsMockOptions,
  getInitialCouriersForLiveMapMock,
  findCouriersByNameMock,
  feedbackChartDataMock,
  feedbackTableDataMock,
  courierBusyAndStatusMock,
  getCourierLogsMock,
];

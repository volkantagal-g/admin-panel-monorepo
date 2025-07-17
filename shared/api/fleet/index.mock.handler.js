import * as MOCKS from './index.mock.data';

const getMockVehicleConstrains = {
  method: 'post',
  url: '/fleetManagement/filterVehicleConstraints',
  successData: MOCKS.mockedVehicleConstraints,
};

const getMockFranchise = {
  method: 'post',
  url: '/marketFranchise/getMarketFranchises',
  successData: MOCKS.mockedFranchise,
};

const getMockWarehouse = {
  method: 'post',
  url: '/warehouse/getWarehouses',
  successData: MOCKS.mockedWarehouse,
};

const getMockVehicles = {
  method: 'post',
  url: '/fleetManagement/filterVehicle',
  successData: MOCKS.mockedVehicles,
};

const getMockVehiclesV2 = {
  method: 'post',
  url: '/fleetManagement/filterVehicleV2',
  successData: MOCKS.mockedVehicles,
};

const getVehicleDetails = {
  method: 'post',
  url: '/fleetManagement/vehicleDetails',
  successData: MOCKS.mockedVehicleDetails,
};

const getMockTmsDrivers = {
  method: 'post',
  url: '/courierHandler/couriers/filter',
  successData: MOCKS.mockTmsDrivers,
};

const getMockTmsVehicleDetails = {
  method: 'post',
  url: '/fleetManagement/tms/getOne',
  successData: MOCKS.mockedTmsVehicleDetail,
};

const getMockTmsVehicleList = {
  method: 'post',
  url: '/fleetManagement/tms/filter',
  successData: MOCKS.mockTmsVehicleList,
};

export default [
  getMockVehicleConstrains,
  getMockFranchise,
  getMockWarehouse,
  getMockVehicles,
  getVehicleDetails,
  getMockTmsDrivers,
  getMockTmsVehicleDetails,
  getMockTmsVehicleList,
  getMockVehiclesV2,
];

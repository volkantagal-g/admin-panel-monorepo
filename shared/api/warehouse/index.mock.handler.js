import * as MOCKS from './index.mock.data';

// Warehouses

export const getWarehousesMockOptions = {
  url: '/warehouse/getWarehouses',
  successData: MOCKS.mockedWarehouses,
};
export const getFilteredWarehousesMockOptions = {
  url: '/warehouse/getFilteredWarehouses',
  handler: ({ body: { fields } }) => {
    let warehouses = [...MOCKS.mockedWarehouses];
    /* Warehouse service does not populate these geo objects if all of them not include in the fields' parameter,
    ref: warehouse-service - src/services/populate.js:167 */
    if (fields && !(fields.includes('city') && fields.includes('country') && fields.includes('region'))) {
      warehouses = MOCKS.mockedWarehouses.map(warehouse => ({
        ...warehouse,
        city: warehouse.city._id,
        country: warehouse.country._id,
        region: warehouse.region._id,
      }));
    }
    return { data: { totalCount: 42, warehouses } };
  },
};

const getMockWarehouseShipmentPreparations = {
  url: '/warehouse/getWarehouseShipmentPreparations',
  successData: { warehouses: MOCKS.mockShipmentPreparations },
};

const getMockWarehouseShipmentFrequencies = {
  url: '/warehouse/getWarehouseShipmentFrequencies',
  successData: { warehouses: MOCKS.mockShipmentFrequencies },
};

const getWarehouseByIdMockOptions = {
  url: '/warehouse/getWarehouse',
  handler: req => {
    const { id } = req.body;
    return { data: { ...MOCKS.mockedWarehouses[0], _id: id } };
  },
};

const getWarehouseInfoForWarehouseBasedLiveMapMockData = {
  url: '/warehouse/getWarehouseInfoForWarehouseBasedLiveMap',
  successData: { ...MOCKS.getWarehouseInfoForWarehouseBasedLiveMapMockData },
};

export const getWarehouseInfoForWarehouseBasedLiveMapErrorMockData = {
  url: '/warehouse/getWarehouseInfoForWarehouseBasedLiveMap',
  errorData: {
    tr: 'Deponun ülkesi ile kullanıcının ülkesi eşleşmiyor.',
    en: 'Warehouse country and user country is not matching.',
  },
};

const assignFranchiseArea = {
  url: '/warehouse/assign-franchise-area',
  successData: MOCKS.mockedWarehouses[0],
};

export default [
  getWarehousesMockOptions,
  getFilteredWarehousesMockOptions,
  getMockWarehouseShipmentFrequencies,
  getMockWarehouseShipmentPreparations,
  getWarehouseByIdMockOptions,
  getWarehouseInfoForWarehouseBasedLiveMapMockData,
  assignFranchiseArea,
];

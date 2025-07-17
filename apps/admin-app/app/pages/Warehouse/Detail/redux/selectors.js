import { createSelector } from 'reselect';
import _ from 'lodash';

import { getStateObject } from '@shared/utils/common';
import {
  BLOCK_LOCATION_TYPE,
  PICKING_BASKET_LOCATION_OPERATION_TYPE,
  REDUX_KEY,
  SECTION_LOCATION_TYPE,
  WAREHOUSE_SEGMENT_TYPES,
} from '@shared/shared/constants';

const reducerKey = REDUX_KEY.WAREHOUSE.DETAIL;

export const warehouseSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data }) => {
      return data;
    },
  ),
  getGeneralInfo: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return {
        name: _.get(data, 'name', ''),
        shortName: _.get(data, 'shortName', ''),
        fieldManagers: _.get(data, 'fieldManagers', []),
        warehouseGLN: _.get(data, 'warehouseGLN', 0),
        SAPReferenceCode: _.get(data, 'SAPReferenceCode', ''),
        dincerIntegrationId: _.get(data, 'dincerIntegrationId', ''),
      };
    },
  ),
  getAddressInfo: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return {
        address: _.get(data, 'address', ''),
        country: _.get(data, 'country._id', ''),
        city: _.get(data, 'city._id', ''),
        region: _.get(data, 'region._id', ''),
        postCode: _.get(data, 'postCode', 0),
        location: _.get(data, 'location', {}),
      };
    },
  ),
  getWarehouseType: state => {
    const { data = {} } = getStateObject(state, reducerKey, 'warehouse');
    return _.get(data, 'warehouseType', false);
  },
  getTestStatus: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'isTestWarehouse', false);
    },
  ),
  getAcceptReturns: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'acceptReturns', false);
    },
  ),
  getIsAllowedForNegativeStock: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'isAllowedForNegativeStock', undefined);
    },
  ),
  getDomainTypes: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'domainTypes', []);
    },
  ),
  getMainStore: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'mainStore', '');
    },
  ),
  getNonagreementWarehouse: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'nonagreementWarehouse', '');
    },
  ),
  getBudgetInfo: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'budgetItem', {});
    },
  ),
  getTransferReceiving: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'transferReceivingWindows', {});
    },
  ),
  getManHourFeeGroup: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'budgetItem.manHourFeeGroup');
    },
  ),
  getTransferGroup: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseTransferGroup');
    },
    ({ data = {} }) => {
      return _.get(data, 'transferGroup', '');
    },
  ),
  getSurfaceAreaInfo: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'surfaceArea', {});
    },
  ),
  getFranchise: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'franchise', '');
    },
  ),
  getFixtureInfo: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return { ovenCount: _.get(data, 'fixture.ovenCount', '') };
    },
  ),
  getFoodOrderSettings: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'businessDecision.foodOrder', {});
    },
  ),
  getDomainConfigs: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => data?.config || {},
  ),
  getCouriers: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'couriers', []);
    },
  ),
  getPickers: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'pickers', []);
    },
  ),
  getState: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'state', 100);
    },
  ),
  getStatus: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'status', 100);
    },
  ),
  getBaseWorkingHourType: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'baseWorkingHourType', 2);
    },
  ),
  getWorkingHours: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseWorkingHours');
    },
    ({ data = [] }) => {
      return data;
    },
  ),
  getPeakHours: state => state?.[reducerKey]?.warehousePeakHours?.data,
  getBasePeakHourType: state => state?.[reducerKey]?.warehouse?.data?.basePeakHourType,
  getWarehouseShipmentFrequencies: state => state?.[reducerKey]?.warehouseShipmentFrequencies.data,
  getWarehouseShipmentPreparations: state => state?.[reducerKey]?.warehouseShipmentPreparations.data,
  getShipmentFrequencies: state => state?.[reducerKey]?.shipmentFrequencies.data,
  getShipmentPreparations: state => state?.[reducerKey]?.shipmentPreparations.data,
  getTimezone: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = [] }) => {
      return _.get(data, 'city.timezone', '');
    },
  ),
  getBlockTemplates: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseLocationTemplates');
    },
    ({ data = [] }) => {
      return data.filter(locationTemplate => {
        return locationTemplate.locationType === BLOCK_LOCATION_TYPE;
      });
    },
  ),
  getPickerBasketTemplates: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseLocationTemplates');
    },
    ({ data = [] }) => {
      return data.filter(locationTemplate => {
        return locationTemplate.locationType === SECTION_LOCATION_TYPE &&
          locationTemplate.defaultValues.operationType === PICKING_BASKET_LOCATION_OPERATION_TYPE;
      });
    },
  ),
  getSectionTemplates: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseLocationTemplates');
    },
    ({ data = [] }) => {
      return data.filter(locationTemplate => {
        return locationTemplate.locationType === SECTION_LOCATION_TYPE &&
          locationTemplate.defaultValues.operationType !== PICKING_BASKET_LOCATION_OPERATION_TYPE;
      });
    },
  ),
  getSections: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseSections');
    },
    ({ data = [] }) => {
      return data.filter(section => {
        return section.operationType !== PICKING_BASKET_LOCATION_OPERATION_TYPE;
      });
    },
  ),
  getPickerBaskets: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseSections');
    },
    ({ data = [] }) => {
      return data.filter(picker => {
        return picker.operationType === PICKING_BASKET_LOCATION_OPERATION_TYPE;
      });
    },
  ),
  getAlgorithmConfig: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return JSON.stringify(_.get(data, ['assignment', 'algorithmConfig']));
    },
  ),
  getDeliveryFeeSegmentId: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = [] }) => {
      return _.get(data, 'deliveryFeeSegmentId', '');
    },
  ),
  getProductPricingSegmentId: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = [] }) => {
      return _.get(data, 'productPricingSegmentId', '');
    },
  ),
  getDeliveryFeeSegments: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseSegments');
    },
    ({ data = [] }) => {
      return data.filter(segmemt => {
        return segmemt.type === WAREHOUSE_SEGMENT_TYPES.DELIVERY_FEE;
      });
    },
  ),
  getProductPricingSegments: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseSegments');
    },
    ({ data = [] }) => {
      return data.filter(segmemt => {
        return segmemt.type === WAREHOUSE_SEGMENT_TYPES.PRODUCT_PRICING;
      });
    },
  ),
  getMainWarehouses: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'mainWarehouses', []);
    },
  ),
  getPromoAggressionLevel: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouse');
    },
    ({ data = {} }) => {
      return _.get(data, 'customAggressionLevel', 0);
    },
  ),
  getFranchiseAreaId: state => state[reducerKey]?.warehouse?.data?.franchiseAreaId,
  filteredWarehouses: state => state[reducerKey]?.filteredWarehouses?.data,
  getIsPending: state => state[reducerKey]?.warehouse?.isPending,
};

export const getEmployeesSelector = {
  getData: state => {
    const { data = [] } = getStateObject(state, reducerKey, 'employees');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'employees');
    return !!isPending;
  },
};

export const assignFranchiseAreaSelector = {
  getIsPending: state => state[reducerKey]?.assignFranchiseArea?.isPending,
  getIsSuccess: state => state[reducerKey]?.assignFranchiseArea?.isSuccess,
};

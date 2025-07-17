import {
  isDedicatedLocalsWarehouse,
  formatCourierPlanAndCountsData,
} from './utils';

import {
  MOCKED_DATA,
  MOCKED_WAREHOUSES,
  MOCKED_FORMATTED_DATA,
  MOCKED_LOCALS_WAREHOUSE,
} from '@shared/api/artisanLiveMap/index.mock.data';

describe('Courier Status Monitoring utils', () => {
  describe('#isDedicatedLocalsWarehouse', () => {
    it('should return true if warehouse domain type is locals ', () => {
      expect(isDedicatedLocalsWarehouse(MOCKED_LOCALS_WAREHOUSE)).toBeTruthy();
    });
  });

  describe('#formatCourierPlanAndCountsData', () => {
    it('should return courier status data', () => {
      expect(formatCourierPlanAndCountsData({ data: MOCKED_DATA, warehouses: MOCKED_WAREHOUSES })).toEqual(
        MOCKED_FORMATTED_DATA,
      );
    });
  });
});

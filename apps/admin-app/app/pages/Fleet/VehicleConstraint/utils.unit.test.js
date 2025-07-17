import {
  vehicleConstraintsFormatter,
  createVehicleConstraintRequestParams,
  vehicleConstraintFormatter,
  updateVehicleConstraintRequestParams,
  vehicleStatusObjectForTag,
  vehicleConstraintListRequestParams,
  getVehicleConstraintTagSelectOptions,
} from './utils';

jest.mock('@shared/i18n', () => ({ getLangKey: () => 'en' }));

jest.mock('@shared/shared/constants', () => ({
  TAG_COLORS: { success: 'green', danger: 'red' },
  VEHICLE_CONSTRAINT_STATUSES: { ACTIVE: 'active', INACTIVE: 'inactive' },
}));

jest.mock('@shared/shared/constantValues', () => ({
  vehicleConstraintStatuses: { active: { en: 'Active' }, inactive: { en: 'Inactive' } },
  marketVehicleTypes: { car: { en: 'Car' }, truck: { en: 'Truck' } },
}));

jest.mock('@shared/utils/common', () => ({
  convertConstantValuesToSelectOptions: jest.fn(),
  getLimitAndOffset: jest.fn().mockImplementation(() => ({ limit: 10, offset: 0 })),
}));

describe('Vehicle Constraints Module', () => {
  describe('vehicleConstraintsFormatter', () => {
    it('should format vehicle constraints data correctly', () => {
      const data = [
        {
          _id: '1',
          name: 'Vehicle 1',
          constraints: {
            weight: 100,
            volume: 200,
            longestEdge: 300,
            duration: 400,
            tags: ['tag1', 'tag2'],
          },
          type: 'Type1',
        },
      ];
      const formatted = vehicleConstraintsFormatter({ data });
      expect(formatted).toEqual([
        {
          type: 'Type1',
          constraints: {
            weight: 100,
            volume: 200,
            longestEdge: 300,
            duration: 400,
            tags: ['tag1', 'tag2'],
          },
          value: '1',
          label: 'Vehicle 1',
        },
      ]);
    });
  });

  describe('createVehicleConstraintRequestParams', () => {
    it('should create request params correctly', () => {
      const params = createVehicleConstraintRequestParams({
        name: 'Vehicle 1',
        reference: { type: 'Type1' },
        weight: 100,
      });
      expect(params).toEqual({
        name: 'Vehicle 1',
        constraints: { weight: 100 },
        vehicleType: 'Type1',
      });
    });
  });

  describe('vehicleConstraintFormatter', () => {
    it('should format vehicle constraint correctly', () => {
      const constraint = {
        name: 'Vehicle 1',
        type: 'Type1',
        constraints: {
          tags: ['tag1', 'tag2'],
          weight: 100,
          longestEdge: 300,
          volume: 200,
          duration: 400,
        },
      };
      const formatted = vehicleConstraintFormatter(constraint);
      expect(formatted).toEqual({
        name: 'Vehicle 1',
        type: 'Type1',
        tags: ['tag1', 'tag2'],
        weight: 100,
        longestEdge: 300,
        volume: 200,
        duration: 400,
      });
    });
  });

  describe('updateVehicleConstraintRequestParams', () => {
    it('should update vehicle constraint request params correctly', () => {
      const params = updateVehicleConstraintRequestParams({
        name: 'Vehicle Updated',
        type: 'TypeUpdated',
        weight: 150,
      });
      expect(params).toEqual({
        name: 'Vehicle Updated',
        constraints: { weight: 150 },
        vehicleType: 'TypeUpdated',
      });
    });
  });

  describe('vehicleStatusObjectForTag', () => {
    it('should return status object for tag correctly when active', () => {
      const statusObject = vehicleStatusObjectForTag({ status: 'active' });
      expect(statusObject).toEqual({
        label: 'Active',
        color: 'green',
      });
    });

    it('should return status object for tag correctly when inactive', () => {
      const statusObject = vehicleStatusObjectForTag({ status: 'inactive' });
      expect(statusObject).toEqual({
        label: 'Inactive',
        color: 'red',
      });
    });
  });

  describe('vehicleConstraintListRequestParams', () => {
    it('should create list request params correctly', () => {
      const params = vehicleConstraintListRequestParams({
        statuses: ['active'],
        types: ['Type1'],
        pagination: { page: 1, pageSize: 10 },
      });
      expect(params).toEqual({
        limit: 10,
        offset: 0,
        types: ['Type1'],
        statuses: ['active'],
      });
    });

    it('should create list request params correctly when no types and statuses', () => {
      const params = vehicleConstraintListRequestParams({
        statuses: [],
        types: [],
        pagination: { page: 1, pageSize: 10 },
      });
      expect(params).toEqual({
        limit: 10,
        offset: 0,
      });
    });
  });

  describe('getVehicleConstraintTagSelectOptions', () => {
    it('should return vehicle constraint tag select options correctly', () => {
      const t = key => key;
      const options = getVehicleConstraintTagSelectOptions(t);
      expect(options).toEqual([
        { value: 1, label: 'FORM.TAG_LABELS.FRAGILE' },
        { value: 2, label: 'FORM.TAG_LABELS.SENSITIVE' },
      ]);
    });
  });
});

import { vehicleListRequestParams } from './utils';

test('Return Parameters', () => {
  const param = {
    warehouseId: 'abc',
    franchiseId: 'abc',
    statuses: 200,
    plate: 'Pl123',
    vehicleConstraintId: '200',
    currentPage: 1,
    rowsPerPage: 10,
  };

  const result = {
    statuses: [200],
    plate: 'Pl123',
    offset: 0,
    limit: 10,
  };
  expect(vehicleListRequestParams(param)).toMatchObject(result);
});

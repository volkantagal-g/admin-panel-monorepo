import { courierListParams, createSegmentParams } from './utils';

// TODO: Fix the failing tests
test.skip('Return Parameters Courier Ids for Creation', () => {
  const param = {
    general: {
      city: ['abc123', 'def456'],
      warehouse: ['abc123', 'def456'],
      date: ['2022-09-01T07:20:52.040Z', '2022-09-10T07:20:52.040Z'],
    },
    totalOrderCount: { count: 100 },
    courierStarRating: { rating: 2.5 },
  };

  const result = {
    cityIds: ['abc123', 'def456'],
    warehouseIds: ['abc123', 'def456'],
    startDate: '2022-09-01T07:20:52.040Z',
    endDate: '2022-09-10T07:20:52.040Z',
    orderCountRange: 100,
    starRatingRange: 2.5,
  };
  expect(courierListParams(param)).toMatchObject(result);
});

test('Return Parameters to create a new Segment', () => {
  const param = {
    name: 'test',
    segmentType: 1,
    filter: {
      general: {
        city: ['abc123', 'def456'],
        warehouse: ['abc123', 'def456'],
        date: ['2022-09-01T07:20:52.040Z', '2022-09-10T07:20:52.040Z'],
      },
      totalOrderCount: { count: 100 },
      courierStarRating: { rating: 2.5 },
    },
    targetIds: [{ target: 'as465gh6', type: 1 }],
    client: 1,
  };

  const result = {
    name: 'test',
    targetIds: [{ target: 'as465gh6', type: 1 }],
    criteria: {
      general: {
        city: ['abc123', 'def456'],
        warehouse: ['abc123', 'def456'],
        date: ['2022-09-01T07:20:52.040Z', '2022-09-10T07:20:52.040Z'],
      },
      totalOrderCount: { count: 100 },
      courierStarRating: { rating: 2.5 },
    },
    type: 1,
    client: 1,
  };
  expect(createSegmentParams(param)).toMatchObject(result);
});

import moment from 'moment';

import { courierCSVToRequestObj, courierSlotCapacityCSVToRequestObj, storeAssistantCSVToRequestObj } from './utils';

test('courierCSVToRequestObj return parameters', () => {
  const t = key => key;

  const day = moment().format('YYYY-MM-DD');

  const param = [
    {
      warehouse_id: 'warehouseId',
      day,
      hour: 15,
      courier_type: 1,
      courier_plan: 1,
      forecast: 1,
      ttp_forecast: 1,
    },
  ];

  const checks = {
    courierTypes: { 1: '1' },
    warehouseIds: {
      warehouseId: {
        cityId: 'cityId',
        countryId: 'countryId',
        timezone: 'Europe/Istanbul',
      },
    },
  };

  const result = [
    {
      startDate: moment(day).startOf('day').add(15, 'hours').toISOString(),
      endDate: moment(day).startOf('day').add(16, 'hours').toISOString(),
      warehouseId: 'warehouseId',
      countryId: 'countryId',
      cityId: 'cityId',
      courierPlan: 1,
      courierType: 1,
      ttpForecast: 1,
      forecast: 1,
    },
  ];

  expect(courierCSVToRequestObj(param, checks, t)).toHaveProperty('courierPlans', result);
});

test('courierSlotCapacityCSVToRequestObj return parameters', () => {
  const t = key => key;

  const day = moment().format('YYYY-MM-DD');

  const param = [
    {
      warehouse_id: 'warehouseId',
      day,
      hour: 15,
      domain_type: 1,
      slot_capacity_count: 1,
    },
  ];

  const checks = {
    domainTypes: { 1: '1' },
    warehouseIds: {
      warehouseId: {
        cityId: 'cityId',
        countryId: 'countryId',
        timezone: 'Europe/Istanbul',
      },
    },
  };

  const result = [
    {
      startDate: moment.utc(day).startOf('day').add(15, 'hours').toISOString(),
      endDate: moment.utc(day).startOf('day').add(16, 'hours').toISOString(),
      warehouseId: 'warehouseId',
      domainType: 1,
      orderCapacity: 1,
    },
  ];

  expect(courierSlotCapacityCSVToRequestObj(param, checks, t)).toHaveProperty('courierPlans', result);
});

test('storeAssistantCSVToRequestObj return parameters', () => {
  const t = key => key;

  const day = moment().format('YYYY-MM-DD');

  const param = [
    {
      warehouse_id: 'warehouseId',
      day,
      hour: 15,
      sa_plan: 1,
    },
  ];

  const checks = {
    warehouseIds: {
      warehouseId: {
        cityId: 'cityId',
        countryId: 'countryId',
        timezone: 'Europe/Istanbul',
      },
    },
  };

  const result = [
    {
      startDate: moment(day).startOf('day').add(15, 'hours').toISOString(),
      startDateL: moment(day).startOf('day').add(18, 'hours').toISOString(),
      endDate: moment(day).startOf('day').add(16, 'hours').toISOString(),
      endDateL: moment(day).startOf('day').add(19, 'hours').toISOString(),
      pickerPlan: 1,
      warehouseId: 'warehouseId',
    },
  ];

  expect(storeAssistantCSVToRequestObj(param, checks, t)).toHaveProperty('pickerPlan', result);
});

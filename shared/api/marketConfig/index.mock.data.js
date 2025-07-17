export const numberMockedConfig = {
  _id: '62b419c19a6373629605ae4a',
  isCustomEnabled: false,
  key: 'co:locals-courier-scheduling:FEASIBILITY_ESTIMATION_COURIER_PLAN_OCCUPANCY_THRESHOLD',
  type: 'Number',
  value: 10,
};

export const objectMockedConfig = {
  _id: '62b8b60373e89f42d47f7cf4',
  isCustomEnabled: false,
  key: 'co:locals-courier-scheduling:SLOT_PLAN_EFFECTIVENESS_CONFIG',
  type: 'Object',
  value: {
    min_week: 0,
    max_week: 2,
  },
};

export const booleanMockedConfig = {
  _id: '62b58489d91e88b7bf703d0a',
  key: 'co:food:RESTAURANT_PERFORMANCE_SYSTEM_ENABLED',
  type: 'Boolean',
  value: true,
  isCustomEnabled: false,
  customValue: {},
};

export const stringMockedConfig = {
  _id: '62b32e108fb8f08b8daec047',
  key: 'co:payment-payout:water:apikey:WATER_API_KEY',
  type: 'String',
  // eslint-disable-next-line no-useless-escape
  value: '{\"VerticalType\":3,\"Country\":\"TR\"}',
  isCustomEnabled: false,
  customValue: {},
};

export const arrayMockedConfig = {
  _id: '62a0bcc8ee8d63bfd4113d0c',
  key: 'co:ANNOUNCEMENT_SERVICE_ALLOWED_SEGMENTS',
  type: 'Array',
  value: [
    22536,
  ],
  isCustomEnabled: false,
  customValue: {},
};

export const warnDiscountAmountConfig = {
  type: 'Number',
  value: 50,
  isCustomEnabled: true,
  customValue: { GB: 40 },
};

export const mockedConfigs = {
  configs: [
    numberMockedConfig,
    objectMockedConfig,
    booleanMockedConfig,
    stringMockedConfig,
    arrayMockedConfig,
  ],
};

export const domainTypeMockData = {
  _id: '61f93cdf8f0a689ca148b73a',
  key: 'co:panel:ACTIVE_DOMAIN_TYPES',
  type: 'Array',
  value: [
    1,
  ],
  isCustomEnabled: true,
  customValue: {
    TR: [
      1,
      2,
      3,
      4,
      6,
      7,
      8,
      9,
      12,
      11,
      14,
      15,
    ],
    GB: [
      1,
      3,
      17,
    ],
    DE: [
      1,
      17,
    ],
    ES: [
      1,
    ],
    XN: [
      1,
      17,
    ],
    NL: [
      1,
      17,
    ],
    XM: [
      1,
      17,
    ],
    XI: [
      1,
      17,
    ],
  },
};

export const integrationTypeMockData = {
  _id: '63f88bbd4be49fe9234c563e',
  key: 'co:panel:ACTIVE_INTEGRATION_TYPES',
  type: 'Array',
  value: [],
  isCustomEnabled: true,
  customValue: {
    DE: [
      'gorillas',
    ],
    GB: [
      'gorillas',
    ],
    NL: [
      'gorillas',
    ],
    TR: [
      'n11',
    ],
  },
  description: 'Active Integration types for countries',
  responsibleTeam: 'intra - business monitoring',
};

export const integrationTypeMockDataWithEmptyValue = {
  _id: '63f88bbd4be49fe9234c563e',
  key: 'co:panel:ACTIVE_INTEGRATION_TYPES',
  type: 'Array',
  value: [],
  isCustomEnabled: true,
  customValue: {},
  description: 'Active Integration types for countries',
  responsibleTeam: 'intra - business monitoring',
};

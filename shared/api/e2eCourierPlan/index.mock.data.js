export const detailId = '6322a50d98520c2c6c0a63a8';

export const listMock = {
  records: [
    {
      _id: detailId,
      properties: {
        warehouseDomainType: [[1], [6]],
        referenceDay1: ['2022-08-01T00:00:00.000Z', '2022-09-01T00:00:00.000Z'],
        referenceDay2: [],
        excludedDays: [],
        rate1: 1,
        rate2: 0,
        getirFoodRate: 1,
        getirLocalsRate: 1,
        country: '55999ad00000010000000000',
      },
      state: 1,
      name: '13sep1',
      planStartDate: '2022-09-13T00:00:00.000Z',
      planEndDate: '2022-09-13T00:00:00.000Z',
      steps: [
        { state: 3, prev: null, next: 2, key: 1, data: { input: { type: 1 } } },
        {
          state: 3,
          prev: 1,
          next: 3,
          key: 2,
          data: {
            input: {
              ttp: {
                maxTtp: 2,
                minTtp: 2,
                expandFactor: 1,
                useSameAllDay: false,
                warehouseDomainType: ['1', '6'],
                countryCode: 'TR',
                ttpType: 1,
                ttpRefStartDate: ['2022-09-13', '2022-09-13'],
              },
            },
          },
        },
        {
          state: 3,
          prev: 2,
          next: 4,
          key: 3,
          data: {
            input: {
              capDateRange: [
                '2022-08-28T14:34:25.611Z',
                '2022-09-06T14:34:25.611Z',
              ],
            },
          },
        },
        { state: 1, prev: 3, next: null, key: 4 },
      ],
      createdBy: {
        _id: '6241a20cecfc2214de909feb',
        email: 'rahul.kurup@getir.com',
      },
      __v: 0,
    },
    {
      _id: '631ee7e495807283431cbfa2',
      properties: {
        warehouseDomainType: [[1]],
        referenceDay1: ['2022-08-01T00:00:00.000Z', '2022-09-05T00:00:00.000Z'],
        referenceDay2: [],
        excludedDays: [],
        rate1: 1,
        rate2: 0,
        country: '55999ad00000010000000000',
      },
      state: 1,
      name: '12sep1',
      planStartDate: '2022-09-12T00:00:00.000Z',
      planEndDate: '2022-09-12T00:00:00.000Z',
      steps: [
        {
          state: 3,
          prev: null,
          next: 2,
          key: 1,
          data: {
            input: { type: 1, finalFile: '1662981816122_final file.xlsx' },
            output: { file: '1662981991103_step_1_plan_date_pre_foreca.xlsx' },
          },
        },
        {
          state: 3,
          prev: 1,
          next: 3,
          key: 2,
          data: {
            input: {
              ttp: {
                maxTtp: 5,
                minTtp: 2,
                expandFactor: 1,
                useSameAllDay: false,
                countryCode: 'TR',
                warehouseDomainType: '1',
                ttpType: 1,
                ttpRefStartDate: ['2022-08-01', '2022-09-05'],
              },
            },
            output: { file: '1662986712521_step_1_plan_date_ttp.xlsx.xlsx' },
          },
        },
        { state: 3, prev: 2, next: 4, key: 3 },
        { state: 1, prev: 3, next: null, key: 4 },
      ],
      createdBy: {
        _id: '6241a20cecfc2214de909feb',
        email: 'rahul.kurup@getir.com',
      },
      __v: 0,
    },
  ],
  totalCount: 56,
};

export const firstListItemMock = listMock.records[0];

export const detailResponseMock = {
  properties: {
    warehouseDomainType: [[4], [1, 3]],
    referenceDay1: ['2022-09-14T00:00:00.000Z', '2022-09-14T00:00:00.000Z'],
    referenceDay2: [],
    excludedDays: [],
    rate1: 1,
    rate2: 0,
    country: '55999ad00000010000000000',
  },
  state: 1,
  _id: detailId,
  name: '15sep1',
  planStartDate: '2022-09-15T00:00:00.000Z',
  planEndDate: '2022-09-15T00:00:00.000Z',
  steps: [
    { state: 1, prev: null, next: 2, key: 1 },
    { state: 1, prev: 1, next: 3, key: 2 },
    { state: 1, prev: 2, next: 4, key: 3 },
    { state: 1, prev: 3, next: 5, key: 4 },
  ],
  createdBy: {
    _id: '6241a20cecfc2214de909feb',
    email: 'rahul.kurup@getir.com',
  },
  __v: 0,
};

export const step1ResponseMock = {
  ...detailResponseMock,
  steps: detailResponseMock.steps.map((m, i) => (i === 0
    ? {
      ...m,
      next: 2,
      state: 3,
      key: 1,
      data: {
        input: {
          type: 1,
          file: '1662729593322_9sep1_updated_file.xlsx',
          finalFile: '1662729593322_9sep1_updated_file.xlsx',
        },
        output: { file: '1662971075512_step_1_plan_date_1662970827.xlsx' },
      },
    }
    : m)),
};

export const step2ResponseMock = {
  ...step1ResponseMock,
  steps: step1ResponseMock.steps.map((m, i) => (i === 1
    ? {
      ...m,
      next: 3,
      state: 3,
      key: 2,
      data: {
        input: {
          ttp: {
            maxTtp: 2,
            minTtp: 2,
            expandFactor: 1,
            useSameAllDay: false,
            warehouseDomainType: ['1', '6'],
            countryCode: 'TR',
            ttpType: 1,
            ttpRefStartDate: ['2022-09-13', '2022-09-13'],
          },
        },
      },
    }
    : m)),
};

export const step3ResponseMock = {
  ...step2ResponseMock,
  steps: step2ResponseMock.steps.map((m, i) => (i === 2
    ? {
      ...m,
      next: 4,
      state: 3,
      key: 3,
      data: { input: { capDateRange: ['2022-09-13', '2022-09-19'] } },
    }
    : m)),
};

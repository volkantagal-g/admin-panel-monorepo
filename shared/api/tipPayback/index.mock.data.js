import moment from 'moment';

export const mockedTipPaybackId = '6315e5583012906c1deb3e81';
export const mockedFailedTipPaybackId = '630f1112a134e66361fac2e1';
export const mockedDetailsTipPaybackId = '6329723fda37ac2a0b326d8f';

export const mockedTipPaybackSummary = {
  id: mockedTipPaybackId,
  startDate: '2020-01-01T00:00:00.000+00:00',
  finishDate: '2020-01-01T23:59:59.999+00:00',
  payoutSummaryStatus: 100,
  payoutSummaryKey: '61178f31-ee1e-4790-ba8c-e16960d8578a',
  createdAt: '2022-09-05T12:02:32.37',
  updatedAt: '2022-09-05T12:02:32.37',
  totalAmount: 0,
  totalCourier: 0,
};

export const mockedDetailsTipPaybackSummary = {
  content: [
    {
      id: '632972563a6c1b3655e71dae',
      payoutSummary: '6329723fda37ac2a0b326d8f',
      person: '60a6585b70c2fdc0d714f123',
      payoutSummaryDetailsKey: 'be1ca192-9be7-4f2d-b3d8-d4f793c7a29c-60a6585b70c2fdc0d714f123',
      tips:
      [
        '616effff82182a5c5634af42',
        '61a4d7b2c688baac135d6c0c',
        '61a64609c688ba63285d6c61',
        '61a89f3eaf9ce2328dc8eb18',
        '61d6e1aa6e434a673a983c25',
      ],
      payoutDate: null,
      totalAmount: 26,
      personName: 'Ecem Test2',
      iban: 'TR060006701000000069131793',
      payoutStatus: 100,
      payoutDescription: null,
      taxNum: '11223344556',
      payoutResponse: null,
      createdAt: '2022-09-20T07:57:10.946',
      updatedAt: '2022-09-20T07:57:10.946',
      payoutActivityId: 'be1ca192-9be7-4f2d-b3d8-d4f793c7a29c-60a6585b70c2fdc0d714f123',
    },
  ],
  totalAmount: 89851.7,
  totalPaidAmount: 100,
  payoutSummaryStatus: 100,
  totalUnpaidAmount: 89851.7,

};

export const mockedFailedTipPaybackSummary = {
  id: '6310a1f2a134e66361fac387',
  payoutSummary: '630f1112a134e66361fac2e1',
  person: '5c6d40e5e83aeb0001021644',
  tips:
  [
    '5e7a3c3a7b21daa8faa1177d',
    '5e7d1d9eb9bfb9c987aeb0d3',
  ],
  totalAmount: 13,
  personName: 'Test1',
  iban: 'TR121234123412341234',
  taxNum: '12312312312312',
  createdAt: '2022-08-30T00:00:53.413',
  transferUniqueId: null,
  errorDescription: 'Iban number is not correct',
};

export const mockedFilterValuesForDetailsPage = {
  currentPage: 1,
  payoutStatus: null,
  personName: 'Test Person',
  rowsPerPage: 25,
  person: '123456789',
  taxNum: '987654321',
};

export const mockedFilterValuesForFailsPage = {
  currentPage: 1,
  personName: '',
  rowsPerPage: 25,
  person: null,
  taxNum: null,
};
export const testDateRange = [
  '2022/06/26', '2022/07/26',
];

export const mockedFilterValuesForListingPage = {
  currentPage: 1,
  startDate: moment(testDateRange[0], 'YYYY/MM/DD').startOf('day').valueOf(),
  finishDate: moment(testDateRange[1], 'YYYY/MM/DD').endOf('day').valueOf(),
  rowsPerPage: 25,
};

export const mockedFailedCancel = {
  timestamp: '2022-09-20T13:51:43.376603',
  status: 400,
  error: null,
  message: `This payout summary does not exist. ID:${mockedTipPaybackId}`,
  errors: null,
};

export const mockedCalculate = {
  description: 'This calculate successfully processed',
  status: true,
};

export const mockedTipPaybackSummaries = { content: [mockedTipPaybackSummary] };
export const mockedFailedTipPaybackSummaries = { content: [mockedFailedTipPaybackSummary] };
export const mockedDetailsTipPaybackSummaries = {
  content: mockedDetailsTipPaybackSummary.content,
  totalAmount: mockedDetailsTipPaybackSummary.totalAmount,
  totalPaidAmount: mockedDetailsTipPaybackSummary.totalPaidAmount,
  totalUnpaidAmount: mockedDetailsTipPaybackSummary.totalUnpaidAmount,
  payoutSummaryStatus: mockedDetailsTipPaybackSummary.payoutSummaryStatus,

};

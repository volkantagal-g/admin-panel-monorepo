export const reconciliationReportId = '62bc655cf8d730031d7ca1f2';
export const reconciliationOrderId = '62cd23f120d73fe85ef2fad8';
export const transactionReconciliationReportId = 'f9bd864c-91ec-5e29-0bd8-a836dcc7f6c5';

export const mockedReconciliationReport = {
  totalPages: 1,
  reconciliations:
  [
    {
      id: '637b217b0422ce0e3e610eee',
      insertedDate: '2022-11-21T06:58:03.199Z',
      updatedDate: null,
      orderId: '637813f61d1db481756145e9',
      basketId: '637813ea308f7314d94b44cc',
      checkoutDate: '2022-11-18T23:23:34.737+00:00',
      checkDate: '2022-11-19T00:00:00Z',
      primaryPaymentChargedAmount: 164,
      primaryPaymentRefundAmount: 164,
      primaryPaymentToBeRefunded: 164,
      transactionTotalChargedAmount: 164,
      transactionTotalRefundAmount: 0,
      additionalPaymentChargedAmount: 0,
      additionalPaymentRefundAmount: 0,
      additionalPaymentToBeRefunded: 164,
      paymentMethod: 'MasterPass',
      domainType: 'GetirFood',
      transactionIds:
          [
            '637813ea308f7314d94b44cc',
          ],
      paymentTypes:
          [
            null,
          ],
      provisionNumbers:
          [
            '045856',
          ],
      transactions:
          [
            {
              id: '6f402140-e38a-5af0-9fe9-be7e014ca862',
              transactionId: '637813ea308f7314d94b44cc',
              currencyCode: 'TRY',
              amount: 164,
              originalTransactionType: 'TEK',
              transactionBehaviourType: 'Sales',
              transactionDate: '2022-11-19T02:23:34+00:00',
              paymentType: null,
              sourceOfStatement: 'VakifBank',
              countryCode: 'Turkey',
              belongTo: 'Order',
              externalPaymentToken: null,
              provisionNumber: '045856',
            },
          ],
      externalPaymentTokens:
          [],
      reconciliationResponse:
          {
            reasonsForDisagreement: 'AmountInTheOrderAndTransactionFromTheBankDoesNotMatch',
            allSuitableReasons:
              [
                'AmountInTheOrderAndTransactionFromTheBankDoesNotMatch',
              ],
            isReconciled: false,
            isRefundable: true,
            totalRefundableAmount: 164,
            refundableTransactions:
              [
                {
                  id: '6f402140-e38a-5af0-9fe9-be7e014ca862',
                  originalTransactionId: '637813ea308f7314d94b44cc',
                },
              ],
          },
      refundResponse: null,
      primaryRefundStatus: 'Pending',
      status: 'Delivered',
      posBank: 'VakifBank',
      sourceOfStatements:
          [
            'VakifBank',
          ],
      additionalRefundStatus: 'Pending',
    },
  ],
};

export const mockedTransactionReconciliationReport = {
  totalPages: 1,
  data: [
    {
      generatedTransactionId: '842e24e6-a7d5-59d8-b24b-251846b18685',
      rentId: 'f9bd864c-91ec-5e29-0bd8-a836dcc7f6c5',
      originalTransactionType: 'Refund_Type_2',
      transactionBehaviourType: 'Refund',
      originalTransactionId: 'ca07d6c1043030244615ae72',
      domainType: 'GetirDrive',
      sourceOfStatement: 'Garanti',
      paymentMethod: 'Masterpass',
      purchaseAmountFromSource: 1,
      purchaseAmountFromDomain: 2,
      refundAmountFromDomain: 406.8,
      refundAmountFromSource: 405.8,
      processedByReconciliation: false,
      transactionDate: '2022-06-19T17:20:01Z',
      checkDate: '2022-06-19T00:00:00Z',
      reconciliationResponse:
      {
        isReconciled: true,
        isRefundable: false,
        reasonsForDisagreement: null,
        allSuitableReasons: null,
      },
    },
  ],
};

export const mockedRefundReconciliation = 'Refund request received successfully.';

export const mockedRefundReconciliationExportCSV = {
  reconciliations:
  [
    {
      orderId: '637813f61d1db481756145e9',
      transactionIds: '637813ea308f7314d94b44cc',
      externalPaymentTokens: '',
      checkoutDate: '2022-11-18T23:23:34.737+00:00',
      checkDate: '2022-11-19T00:00:00Z',
      transactionTotalChargedAmount: 164,
      transactionTotalRefundAmount: 0,
      primaryPaymentChargedAmount: 164,
      primaryPaymentRefundAmount: 164,
      primaryPaymentToBeRefunded: 164,
      additionalPaymentChargedAmount: 0,
      additionalPaymentRefundAmount: 0,
      additionalPaymentToBeRefunded: 164,
      paymentMethod: 'MasterPass',
      paymentTypes: '',
      domainType: 'GetirFood',
      primaryRefundStatus: 'Pending',
      status: 'Delivered',
      posBank: 'VakifBank',
      isRefundable: true,
      totalRefundableAmount: 164,
      refundResponseStatus: null,
      additionalRefundStatus: 'Pending',
      basketId: '637813ea308f7314d94b44cc',
      provisionNumbers: '045856',
      sourceOfStatements:
          [
            'VakifBank',
          ],
    },
  ],
};

export const mockedReconciliationReportDetailItems = [
  {
    id: '62e1aa00cd00fc11e89921df',
    insertedDate: '2022-07-27T21:11:28.139Z',
    updatedDate: '2022-07-27T21:11:32.804Z',
    orderId: '62c95c224d8121d64c0b734d',
    checkoutDate: '2022-07-09T10:50:29.7+00:00',
    checkDate: '2022-07-12T00:00:00Z',
    transactionTotalChargedAmount: 498.45,
    chargedAmount: 466.45,
    refundAmount: null,
    paymentMethod: 'MasterPass',
    domainType: 'GetirLocal',
    transactionIds: [],
    transactions: [
      {
        id: 'c373c02d-955f-5d0d-8714-aee2608810dc',
        transactionId: '62c95c224d8121d64c0b734d',
        currencyCode: 'TRL',
        amount: 498.45,
        originalTransactionType: 'SATIS',
        transactionBehaviourType: 'Sales',
        transactionDate: '2022-07-12T09:54:17+00:00',
        sourceOfStatement: 'Akbank',
        countryCode: 'Turkey',
        belongTo: 'Order',
        externalPaymentToken: null,
      },
      {
        id: '1c2b6030-77f4-5933-beed-22ae75008c14',
        transactionId: '62c95c224d8121d64c0b734d',
        currencyCode: 'TRL',
        amount: 466.45,
        originalTransactionType: 'IADE',
        transactionBehaviourType: 'Refund',
        transactionDate: '2022-07-12T09:54:25+00:00',
        sourceOfStatement: 'Akbank',
        countryCode: 'Turkey',
        belongTo: 'Order',
        externalPaymentToken: null,
      },
    ],
    reconciliationResponse: {
      reasonsForDisagreement: 'AmountInTheOrderAndTransactionFromTheBankDoesNotMatch',
      allSuitableReasons: [
        'AmountInTheOrderAndTransactionFromTheBankDoesNotMatch',
      ],
      isReconciled: false,
      isRefundable: true,
    },
    refundResponse: {
      status: 'Failed',
      refundResponseDetails: [
        {
          transactionId: '62c95c224d8121d64c0b734d',
          refundStatus: 'Completed',
          errorMessage: null,
        },
        {
          transactionId: '62c95c224d8121d64c0b734d',
          refundStatus: 'Failed',
          errorMessage: 'order failed, test data!',
        },
      ],
    },
    status: 'Canceled by Admin',
    posBank: 'Akbank',
  },
];

export const mockedDailyReport = {
  data:
  [
    {
      source: 'Akbank',
      domain: 'GetirUnSpecified',
      statementDataStatus: 'RowsSeperated',
      checkDate: '2022-12-10T00:00:00',
      country: 'TR',
      dailyReportDetails:
          [],
    },
  ],
  totalCount: 1,
};

export const testDateRange = [
  '2022-06-26', '2022-07-26',
];

export const mockedFilterValues = {
  sourceOfStatements: [],
  transactionIds: [],
  externalPaymentTokens: [],
  orderIds: [],
  domainTypes: [],
  checkoutEndDate: null,
  checkoutStartDate: null,
  isRefundable: true,
  reconciliationCheckStartDate: testDateRange[0],
  reconciliationCheckEndDate: testDateRange[1],
  refundStatus: [],
  orderStatus: [],
  basketIds: [],
  page: 1,
  pageSize: 25,
};

export const mockedDailyReportFilterValues = {
  sourceOfStatements: [],
  domainTypes: [],
  reportCheckStartDate: testDateRange[0],
  reportCheckEndDate: testDateRange[1],
  reportRequestStartDate: null,
  reportRequestEndDate: null,
  page: 1,
  pageSize: 50,
};

export const mockedTransactionFilterValues = {
  rentId: 'f9bd864c-91ec-5e29-0bd8-a836dcc7f6c5',
  originalTransactionId: null,
  checkStartDate: null,
  checkEndDate: null,
  transactionStartDate: null,
  transactionEndDate: null,
  page: 1,
  pageSize: 25,
};
export const mockedSelectedOrderIds = [mockedReconciliationReport.reconciliations[0].orderId];
export const mockedSelectedBasketIds = [mockedReconciliationReport.reconciliations[0].basketId];

export const bankReconciliationSummaryDate = ['2022-04-13', '2022-05-13'];

export const mockedReconciliationSummaryReport = {
  message: 'Success',
  domainSummary: {
    title: 'GetirTest',
    orderCount: 15,
    paymentAmount: 628.72,
    refundAmount: 8.9,
    netAmount: 619.82,
  },
  posSummary: {
    title: 'Akbank',
    orderCount: 15,
    paymentAmount: 670.52,
    refundAmount: 4.5,
    netAmount: 666.02,
  },
  currency: 'TRL',
};

export const testDateRange = [
  '2022-06-26', '2022-07-26',
];

export const mockedFoodReport = {
  ErrorCode: 0,
  Message: '',
  Data:
    [
      {
        Vertical: 'Food',
        Country: 'TR',
        Bank: 'Garanti',
        BankIca: 2030,
        Received:
            {
              TotalCount: 93,
              TotalAmount: 56670.03,
            },
        InProgress:
            {
              Rate: '0',
              EftCount: 0,
              MoneyOrder: 0,
              TotalCount: 0,
              TotalAmount: 0,
            },
        Successful:
            {
              Rate: '8.60%',
              EftCount: 8,
              MoneyOrder: 0,
              TotalCount: 8,
              TotalAmount: 3311.32,
            },
        Errors:
            {
              Rate: '91.40%',
              EftCount: 11,
              MoneyOrder: 74,
              TotalCount: 85,
              TotalAmount: 53358.71,
              FailedRecordInDetails:
                [
                  {
                    ErrorExplanation: 'IBAN hatalı (banka kodu)',
                    StatusCode: '0432',
                    TotalCount: 11,
                    TotalAmount: 7637.11,
                  },
                  {
                    ErrorExplanation: 'TC Kimlik no formatı hatalı.',
                    StatusCode: '0430',
                    TotalCount: 11,
                    TotalAmount: 5974.86,
                  },
                  {
                    ErrorExplanation: 'IBAN hatalı.',
                    StatusCode: '0432',
                    TotalCount: 63,
                    TotalAmount: 39746.74,
                  },
                ],
            },
      },
    ],
  IsSuccess: true,
};

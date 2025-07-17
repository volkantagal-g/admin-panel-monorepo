export const mockedLegalAgreementList = {
  record: [
    {
      isEnable: false,
      _id: '650adf17c067c490d82f4915',
      fileName: 'mock.pdf',
      s3Key: '1694777228938_1_.pdf',
      createdAt: '2023-09-20T12:01:27.192Z',
      updatedAt: '2023-09-22T11:17:35.919Z',
      __v: 0,
    },
  ],
  total: 13,
};

export const mockedLegalAgreementDetail = {
  _id: '6512b59b4e0a7e2837ae6deb',
  isEnable: true,
  fileName: 'dummy 2_.pdf',
  s3Key: '1695724954668_dummy 2_.pdf',
  createdAt: '2023-09-26T10:42:35.284Z',
  updatedAt: '2023-09-26T10:42:46.008Z',
  __v: 0,
};

export const mockedLegalAcceptanceDetail = {
  data: [
    {
      agreementId: '6512b54b4e0a7e0385ae6dcf',
      franchiseId: '5e09ddbdfb2b2839e32238c0',
      franchise: 'ABC',
      status: 'Accepted' / true,
      createdAt: '2023-09-28T13:15:30.064Z',
    },
    {
      agreementId: '6512b54b4e0a7e0385ae6dcf',
      franchiseId: '5e0d8a1df0f1d572ab399aaa',
      franchise: 'DEF',
      status: 'Not-Accepted' / false,
      createdAt: '2023-09-26T14:54:28.209Z',
    },
  ],
  totalCount: 2,
};

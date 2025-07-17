import moment from 'moment';

export const courierListMock = {
  couriers: [
    {
      status: 200,
      isActivated: true,
      _id: '587c9e24a1a56d0004072d82',
      name: 'Fatih Sarıca',
      gsm: '5498140045',
      isLoggedIn: false,
    },
  ],
  totalCount: 30,
};

export const courierDetailMock = {
  location: {
    type: 'Point',
    coordinates: [
      29.004115,
      41.02111,
    ],
    acc: -1,
    time: '2022-01-05T10:53:54.953Z',
  },
  homeAddress: {
    location: {
      type: 'Point',
      coordinates: [
        29.004115,
        41.02111,
      ],
    },
    description: '453',
  },
  currentMarketEmployer: { updatedAt: '2022-07-19T08:35:34.844Z' },
  status: 200,
  serviceDomainTypes: [
    3,
  ],
  domainTypes: [1],
  _id: '61d578c24a90159d5ecf2e33',
  createdAt: '2022-01-05T10:53:54.949Z',
  name: 'Seçkin Özdemir',
  gsm: '5998470049',
  iban: 'TR11111111111',
  personalGsm: '5998470049',
  person: {
    _id: '61d578c24a90159d5ecf2e2e',
    username: 'seckin.özdemir.2',
    marketEmployers: [
      {
        createdAt: '2022-01-05T10:53:54.799Z',
        franchise: '5df8bef553c8ff542a33ecd3',
        workType: 1,
      },
    ],
    uniqueIdentifier: '1',
  },
  courierType: 9,
  safeRidingTrainingDate: '2021-12-28T09:00:00.000Z',
  financeDeliveryTrainingDate: '2021-12-28T09:00:00.000Z',
  employmentType: 5,
  mduDiagnosticLogInfo: {
    url: 'https://mdu-diagnostic-logs-development.s3.eu-west-1.amazonaws.com/111111111',
    expireDate: moment().add(3, 'days'),
  },
};

export const createFranchiseAnnouncementMock = {
  title: { native: 'title native' },
  description: { native: 'description native' },
  language: 'en',
  country: 'TR',
  active: true,
  createdBy: '5892277d2fbe51b3669a11b2',
  startDate: '2023-01-27T11:11:56.596Z',
  endDate: '2023-02-03T11:11:56.596Z',
  _id: '63d7ba31405e0f183b321f2b',
  createdAt: '2023-01-30T12:38:09.618Z',
  updatedAt: '2023-01-30T12:38:09.609Z',
  __v: 0,
};

export const getFranchiseAnnouncementDetailMock = {
  _id: '63dbd29c5311ea1759a5837c',
  title: { native: 'FranchiseTestSaf' },
  description: { native: 'FranchiseTestSaf' },
  language: 'en',
  country: 'TR',
  active: false,
  createdBy: '620f4f49f36774f77977e33c',
  startDate: '2023-03-02T15:10:57.852Z',
  endDate: '2023-03-09T15:10:57.852Z',
  createdAt: '2023-02-02T15:11:24.271Z',
  updatedAt: '2023-02-06T08:57:20.357Z',
  announcementType: 'franchise',
  franchises: [
    {
      franchise: '5892277d2fbe51b3669a11b2',
      name: 'tolgahan test',
    },
    {
      franchise: '5dee508adac9eb2ff4190baa',
      name: 'bahadırın test deposu1',
    },
  ],
  announcementFiles: [],
};

export const getFranchisesMock = {
  franchises: [
    {
      _id: '5df8bef553c8ff542a33ecd3',
      taxNumber: '2134124512321',
      taxOffice: 'vergi dairesi12',
      isActivated: true,
      isDeleted: false,
      name: 'Sukrunun bayisi',
      owners: [
        {
          _id: '619f2e42adddeacda1a673e9',
          name: "şükrü'sbayi",
          gsm: '555434',
        },
      ],
      updatedAt: '2021-02-01T12:39:20.567Z',
      createdAt: '2019-12-17T11:41:41.404Z',
      __v: 0,
      franchiseType: 2,
      companyId: '111111333333666666888888',
      countryCode: 'TR',
      countryId: '55999ad00000010000000000',
      warehouses: [
        {
          _id: '6093db3c2410f3d8ebd6a65b',
          name: 'Dilara Çarşı',
          country: {
            _id: '55999ad00000010000000000',
            name: {
              de: 'Türkei',
              en: 'Turkey',
              fr: 'Turquie',
              nl: 'Turkije',
              tr: 'Türkiye',
              es: 'Turquía',
              it: 'Turchia',
              pt: 'Turquia',
              'en-US': 'Turkey',
            },
          },
          region: {
            _id: '5dd84c500000010003000001',
            name: {
              tr: 'Ankara',
              en: 'Ankara',
            },
          },
          city: {
            _id: '5dd84c500000010003000000',
            name: {
              tr: 'Ankara',
              en: 'Ankara',
            },
          },
          domainTypes: [
            6,
          ],
          franchise: '5df8bef553c8ff542a33ecd3',
        },
        {
          _id: '611f51f4772733ca0dcec60a',
          name: 'sampleee',
          country: {
            _id: '55999ad00000010000000000',
            name: {
              de: 'Türkei',
              en: 'Turkey',
              fr: 'Turquie',
              nl: 'Turkije',
              tr: 'Türkiye',
              es: 'Turquía',
              it: 'Turchia',
              pt: 'Turquia',
              'en-US': 'Turkey',
            },
          },
          region: {
            _id: '5dd84c500000010003000001',
            name: {
              tr: 'Ankara',
              en: 'Ankara',
            },
          },
          city: {
            _id: '5dd84c500000010003000000',
            name: {
              tr: 'Ankara',
              en: 'Ankara',
            },
          },
          domainTypes: [
            1,
          ],
          franchise: '5df8bef553c8ff542a33ecd3',
        },
        {
          _id: '6184eac603b435ddb455dd85',
          name: 'factory warehouse tr ',
          country: {
            _id: '55999ad00000010000000000',
            name: {
              de: 'Türkei',
              en: 'Turkey',
              fr: 'Turquie',
              nl: 'Turkije',
              tr: 'Türkiye',
              es: 'Turquía',
              it: 'Turchia',
              pt: 'Turquia',
              'en-US': 'Turkey',
            },
          },
          region: {
            _id: '5ef5f2b00000010007000001',
            name: {
              tr: 'Antalya',
              en: 'Antalya',
            },
          },
          city: {
            _id: '5ef5f2b00000010007000000',
            name: {
              tr: 'Antalya',
              en: 'Antalya',
            },
          },
          domainTypes: [
            4,
          ],
          franchise: '5df8bef553c8ff542a33ecd3',
        },
      ],
    },
  ],
  totalCount: 1,
};

export const getAnnouncementsMock = {
  data: [
    {
      _id: '63dbd29c5311ea1759a5837c',
      announcementType: 'franchise',
      title: { native: 'FranchiseTestSaf' },
      description: { native: 'FranchiseTestSaf' },
      language: 'en',
      country: 'TR',
      active: false,
      createdBy: '620f4f49f36774f77977e33c',
      startDate: '2023-03-02T15:10:57.852Z',
      endDate: '2023-03-09T15:10:57.852Z',
      createdAt: '2023-02-02T15:11:24.271Z',
      updatedAt: '2023-02-06T08:57:20.357Z',
      __v: 0,
    },
    {
      _id: '63dbc3b47c5fcf2d6ad66800',
      announcementType: 'warehouse',
      active: true,
      country: 'TR',
      title: {
        en: 'test4',
        native: 'test44',
      },
      description: {
        en: 'test5',
        native: 'test55',
      },
      language: 'en',
      createdBy: '6284f8c7b9c24c846100f4da',
      createdAt: '2023-02-02T14:07:48.781Z',
      updatedAt: '2023-02-02T14:07:48.781Z',
      __v: 0,
    },
  ],
  count: 2,
};

export const getWarehouseAnnouncementsMock = {
  announcements: [
    {
      _id: '63dbc3b47c5fcf8025d66802',
      warehouse: '621394161cb79741478f8373',
      announcement: {
        _id: '63dbc3b47c5fcf2d6ad66800',
        active: true,
        country: 'TR',
        title: {
          en: 'test4',
          native: 'test44',
        },
        description: {
          en: 'test5',
          native: 'test55',
        },
        language: 'en',
        createdBy: '6284f8c7b9c24c846100f4da',
        createdAt: '2023-02-02T14:07:48.781Z',
        updatedAt: '2023-02-02T14:07:48.781Z',
        __v: 0,
      },
      createdBy: '6284f8c7b9c24c846100f4da',
      createdAt: '2023-02-02T14:07:48.788Z',
      __v: 0,
    },
    {
      _id: '63dbb3e27c5fcfe6f9d62f63',
      warehouse: '6346b36f5e82513433d011c7',
      announcement: {
        _id: '63dbb3e27c5fcf6d69d62f61',
        active: true,
        country: 'TR',
        title: {
          en: 'testDEpo',
          native: 'testDEpo',
        },
        description: {
          en: 'testDEpo',
          native: 'testDEpo',
        },
        language: 'tr',
        createdBy: '620f4f49f36774f77977e33c',
        createdAt: '2023-02-02T13:00:18.883Z',
        updatedAt: '2023-02-02T13:00:18.883Z',
        __v: 0,
      },
      createdBy: '620f4f49f36774f77977e33c',
      createdAt: '2023-02-02T13:00:18.902Z',
      __v: 0,
    },
  ],
  total: 2,
};

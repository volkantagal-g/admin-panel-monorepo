export const mockedMarketProductCategories = [
  {
    _id: '572788505d4d14030034343b',
    name: {
      en: "Mother's Day",
      tr: 'Anneler Günü',
    },
    status: 0,
    type: 1,
    description: 'Anneler Günü',
    domainTypes: [
      1,
      3,
    ],
    order: 116,
    isSubCategory: false,
    isPublic: false,
    showUnitPrice: true,
    country: '55999ad00000010000000000',
    countryCode: 'TR',
    createdAt: '2020-12-01T17:25:59.463Z',
  },
];

export const mockedMarketProductSubCategories = [
  {
    _id: '572c49a8ed0ccf0300e4b53d',
    name: {
      en: 'example',
      tr: 'example',
    },
    status: 0,
    type: 1,
    description: 'Anneler Günü Alt Kategorı',
    domainTypes: [
      1,
      3,
    ],
    order: 7,
    isSubCategory: true,
    isPublic: false,
    parent: {
      _id: '572788505d4d14030034343b',
      createdAt: '2020-12-01T17:25:59.463Z',
      updatedAt: '2024-03-20T14:11:13.413Z',
      country: '55999ad00000010000000000',
      countryCode: 'TR',
      domainTypes: [
        1,
        3,
      ],
      status: 0,
      name: {
        en: "Mother's Day",
        tr: 'Anneler Günü',
      },
      description: 'Anneler Günü',
      order: 116,
      parentProductCategory: '572788505d4d14030034343b',
      isSubCategory: false,
      isMigrated: true,
      isPublic: false,
      showUnitPrice: true,
    },
    country: '55999ad00000010000000000',
    countryCode: 'TR',
    createdAt: '2020-12-01T17:25:59.497Z',
  },
  {
    _id: '6639109e06ea9c3376bc5e91',
    name: {
      tr: 'test123',
      en: 'test123',
    },
    status: 0,
    type: 1,
    description: 'test123',
    domainTypes: [
      4,
      3,
    ],
    isSubCategory: true,
    isPublic: false,
    showUnitPrice: false,
    parent: {
      _id: '572788505d4d14030034343b',
      createdAt: '2020-12-01T17:25:59.463Z',
      updatedAt: '2024-03-20T14:11:13.413Z',
      country: '55999ad00000010000000000',
      countryCode: 'TR',
      domainTypes: [
        1,
        3,
      ],
      status: 0,
      name: {
        en: "Mother's Day",
        tr: 'Anneler Günü',
      },
      description: 'Anneler Günü',
      picURL: {
        tr: 'http://cdn.getir.com/cat/572788505d4d14030034343b.png?v=3',
        en: 'http://cdn.getir.com/cat/572788505d4d14030034343b.png?v=3',
      },
      order: 116,
      parentProductCategory: '572788505d4d14030034343b',
      isSubCategory: false,
      isMigrated: true,
      isPublic: false,
      showUnitPrice: true,
    },
    country: '55999ad00000010000000000',
    countryCode: 'TR',
    createdAt: '2024-05-06T17:17:18.466Z',
  },
];
export const mockedMarketProductCategory = {
  _id: '5fe2253d0f7e3b0656708e70',
  name: {
    tr: 'Dairy',
    en: 'Dairy',
  },
  status: 0,
  type: 1,
  description: 'Dairy',
  domainTypes: [
    1,
  ],
  picURL: {
    tr: 'http://cdn.getir.com/cat/5fe2253d0f7e3b0656708e70_c1313eaa-9641-4ac1-8382-09c3c08ab48b.jpeg',
    en: 'http://cdn.getir.com/cat/5fe2253d0f7e3b0656708e70_c1313eaa-9641-4ac1-8382-09c3c08ab48b.jpeg',
  },
  order: 14,
  isSubCategory: false,
  isPublic: true,
  country: '55999ad00000020000000000',
  countryCode: 'GB',
  createdAt: '2020-12-22T16:56:29.238Z',
};

export const mockedGetCategoryPositions = [
  {
    _id: '5a16e6e9f729d8a44c7310b0',
    category: {
      _id: '55449fdf02632e11003c2da8',
      name: {
        tr: 'Ev Bakım',
        en: 'Home Care',
      },
      status: 1,
      order: 15,
      picURL: {
        en: 'http://cdn-dev.getir.com/cat/611b7534fbf0637700134cbc_61d0d193-6948-46f1-a316-7adec64dff10.png',
        tr: 'http://cdn-dev.getir.com/cat/611b7534fbf0637700134cbc_61d0d193-6948-46f1-a316-7adec64dff10.png',
      },
    },
    items: [],
    version: 91,
  },
  {
    _id: '5a16e6e9f729d8a44c7310b8',
    category: {
      _id: '551430043427d5010a3a5c5d',
      name: {
        tr: 'Yiyecek',
        en: 'Ready to Eat',
      },
      status: 1,
      order: 12,
      picURL: {
        en: 'https://market-product-images-cdn.marketdev.getirapi.com/category/3d65793a-dd70-4826-8e2c-c6a539bcaaa4.png',
        tr: 'https://market-product-images-cdn.marketdev.getirapi.com/category/3d65793a-dd70-4826-8e2c-c6a539bcaaa4.png',
      },
    },
    items: [],
    version: 87,
  },
  {
    _id: '5a16e6e9f729d8a44c7310a9',
    category: {
      _id: '56dfe03cf82055030022cdc0',
      name: {
        tr: 'Atıştırmalık',
        en: 'Snacks',
      },
      status: 1,
      order: 10,
      picURL: {
        en: 'https://market-product-images-cdn.marketdev.getirapi.com/category/9961a836-7a90-4ed7-8b1b-ac06ed152f35.png',
        tr: 'https://market-product-images-cdn.marketdev.getirapi.com/category/9961a836-7a90-4ed7-8b1b-ac06ed152f35.png',
      },
    },
    items: [],
    version: 142,
  },
  {
    _id: '5a16e6e9f729d8a44c7310af',
    category: {
      _id: '55449fdf02632e11003c2da8',
      name: {
        tr: 'Ev Bakım',
        en: 'Home Care',
      },
      status: 1,
      order: 15,
      picURL: {
        en: 'http://cdn-dev.getir.com/cat/611b7534fbf0637700134cbc_61d0d193-6948-46f1-a316-7adec64dff10.png',
        tr: 'http://cdn-dev.getir.com/cat/611b7534fbf0637700134cbc_61d0d193-6948-46f1-a316-7adec64dff10.png',
      },
    },
    items: [],
    version: 57,
  }];

export const mockedUpdateCategoryOrderBulk = [
  {
    order: 1,
    category: '63722a355b1388589e6aa4cd',
  },
  {
    order: 2,
    category: '642d7f6b846299f66fe90e7f',
  },
];

export const mockedGetMarketProductCategorySlugs = {
  categorySlugs: {
    categoryId: '572788505d4d14030034343b',
    slugs: {
      tr: 'anneler-gunu-u1DaP5400F',
      en: 'mother-s-day-QyTrB9vA2x',
    },
  },
};

export const mockedGetCities = [
  {
    id: '55999ad00000010001000000',
    name: {
      en: 'Istanbul',
      tr: 'İstanbul',
    },
    center: {
      type: 'Point',
      coordinates: [
        29,
        41,
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          29,
          41,
        ],
      },
      zoomRatio: 11,
    },
    timezone: 'Europe/Istanbul',
    operationalDomainTypes: [
      1,
      2,
      3,
      4,
    ],
    wasOperationalDomainTypes: [],
    operational: true,
    wasOperational: false,
    _id: '55999ad00000010001000000',
  },
  {
    id: '5dcf11d00000010002000000',
    name: {
      en: 'Izmir',
      tr: 'İzmir',
    },
    center: {
      type: 'Point',
      coordinates: [
        27.145,
        38.425,
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          27.145,
          38.425,
        ],
      },
      zoomRatio: 11,
    },
    timezone: 'Europe/Istanbul',
    operationalDomainTypes: [
      1,
    ],
    wasOperationalDomainTypes: [],
    operational: true,
    wasOperational: false,
    _id: '5dcf11d00000010002000000',
  },
  {
    id: '5dd84c500000010003000000',
    name: {
      en: 'Ankara',
      tr: 'Ankara',
    },
    center: {
      type: 'Point',
      coordinates: [
        32.77326103000007,
        39.93208425500006,
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          32.77326103000007,
          39.93208425500006,
        ],
      },
      zoomRatio: 12,
    },
    timezone: 'Europe/Istanbul',
    operationalDomainTypes: [
      1,
    ],
    wasOperationalDomainTypes: [],
    operational: true,
    wasOperational: false,
    _id: '5dd84c500000010003000000',
  },
  {
    id: '5de186d00000010004000000',
    name: {
      en: 'Bursa',
      tr: 'Bursa',
    },
    center: {
      type: 'Point',
      coordinates: [
        29.03645600200008,
        40.20133461300003,
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          29.03645600200008,
          40.20133461300003,
        ],
      },
      zoomRatio: 12,
    },
    timezone: 'Europe/Istanbul',
    operationalDomainTypes: [
      1,
    ],
    wasOperationalDomainTypes: [],
    operational: true,
    wasOperational: false,
    _id: '5de186d00000010004000000',
  },
  {
    id: '5df3fbd00000010005000000',
    name: {
      en: 'Kocaeli',
      tr: 'Kocaeli',
    },
    center: {
      type: 'Point',
      coordinates: [
        29.942045220000068,
        40.76751606600004,
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          29.942045220000068,
          40.76751606600004,
        ],
      },
      zoomRatio: 12,
    },
    timezone: 'Europe/Istanbul',
    operationalDomainTypes: [
      1,
    ],
    wasOperationalDomainTypes: [],
    operational: true,
    wasOperational: false,
    _id: '5df3fbd00000010005000000',
  },
];

export const mockedMarketProductCategoryAvailableTimes = [
  {
    _id: '63c65bfb08498f30c9c5fb4c',
    country: '55999ad00000010000000000',
    countryCode: 'TR',
    warehouse: '61a8a308cb5390d88e73d6c0',
    category: '56e014098d5ef80300398ad6',
    isSubCategory: true,
    domainType: 1,
    timezone: 'Europe/Istanbul',
    availableTimes: [
      {
        startMin: 0,
        endMin: 180,
      },
      {
        startMin: 1440,
        endMin: 1590,
      },
      {
        startMin: 2880,
        endMin: 2910,
      },
      {
        startMin: 3000,
        endMin: 3030,
      },
      {
        startMin: 4320,
        endMin: 4350,
      },
      {
        startMin: 5760,
        endMin: 5940,
      },
      {
        startMin: 7200,
        endMin: 7290,
      },
      {
        startMin: 8700,
        endMin: 8790,
      },
    ],
    isActive: true,
    updatedAt: '2023-07-11T09:11:00.661Z',
    createdAt: '2023-01-17T08:27:39.788Z',
  },
  {
    _id: '63c65bfb08498f30c9c5fb4d',
    country: '55999ad00000010000000000',
    countryCode: 'TR',
    warehouse: '61a8a308cb5390d88e73d6c0',
    category: '566ee745f9facb0f00b1c878',
    isSubCategory: false,
    domainType: 3,
    timezone: 'Europe/Istanbul',
    availableTimes: [
      {
        startMin: 0,
        endMin: 180,
      },
      {
        startMin: 1440,
        endMin: 1590,
      },
      {
        startMin: 2880,
        endMin: 2910,
      },
      {
        startMin: 3000,
        endMin: 3030,
      },
      {
        startMin: 5760,
        endMin: 5940,
      },
      {
        startMin: 7200,
        endMin: 7290,
      },
      {
        startMin: 8700,
        endMin: 8790,
      },
    ],
    isActive: true,
    updatedAt: '2023-01-17T08:27:39.788Z',
    createdAt: '2023-01-17T08:27:39.788Z',
  },
  {
    _id: '63c65bfb08498f30c9c5fb4f',
    country: '55999ad00000010000000000',
    countryCode: 'TR',
    warehouse: '61a8a308cb5390d88e73d6c0',
    category: '564c67f1d35e7d0c002bd2c3',
    isSubCategory: true,
    domainType: 3,
    timezone: 'Europe/Istanbul',
    availableTimes: [
      {
        startMin: 0,
        endMin: 180,
      },
      {
        startMin: 1440,
        endMin: 1590,
      },
      {
        startMin: 2880,
        endMin: 2910,
      },
      {
        startMin: 3000,
        endMin: 3030,
      },
      {
        startMin: 5760,
        endMin: 5940,
      },
      {
        startMin: 7200,
        endMin: 7290,
      },
      {
        startMin: 8700,
        endMin: 8790,
      },
    ],
    isActive: true,
    updatedAt: '2023-01-17T08:27:39.788Z',
    createdAt: '2023-01-17T08:27:39.788Z',
  },
  {
    _id: '63c65bfb08498f30c9c5fb54',
    country: '55999ad00000010000000000',
    countryCode: 'TR',
    warehouse: '61a8a308cb5390d88e73d6c0',
    category: '56e014098d5ef80300398ad6',
    isSubCategory: true,
    domainType: 3,
    timezone: 'Europe/Istanbul',
    availableTimes: [
      {
        startMin: 0,
        endMin: 180,
      },
      {
        startMin: 1440,
        endMin: 1590,
      },
      {
        startMin: 2880,
        endMin: 2910,
      },
      {
        startMin: 3000,
        endMin: 3030,
      },
      {
        startMin: 5760,
        endMin: 5940,
      },
      {
        startMin: 7200,
        endMin: 7290,
      },
      {
        startMin: 8700,
        endMin: 8790,
      },
    ],
    isActive: true,
    updatedAt: '2023-01-17T08:27:39.788Z',
    createdAt: '2023-01-17T08:27:39.788Z',
  },
  {
    _id: '63c69fa908498f30c9ce5255',
    country: '55999ad00000010000000000',
    countryCode: 'TR',
    warehouse: '5dc32e61734a192200caddfe',
    category: '559c071593be370c0063dd1c',
    isSubCategory: false,
    domainType: 1,
    timezone: 'Europe/Istanbul',
    availableTimes: [],
    isActive: true,
    updatedAt: '2023-01-17T13:18:22.515Z',
    createdAt: '2023-01-17T13:16:25.124Z',
  },
];

export const mockedFilteredWareHouses = {
  totalCount: 5,
  wareHouses: [
    {
      _id: '5dfa4a2e17b571cea40dff89',
      name: "Stock Kürşat'ın Deposu update 1",
      region: {
        _id: '55999ad00000010001000002',
        country: '55999ad00000010000000000',
        city: '55999ad00000010001000000',
        name: {
          tr: 'Bakırköy',
          en: 'Bakirkoy',
        },
        oldCode: 1300,
      },
      city: {
        _id: '55999ad00000010001000000',
        country: '55999ad00000010000000000',
        name: {
          en: 'Istanbul',
          tr: 'İstanbul',
        },
        center: {
          type: 'Point',
          coordinates: [
            29,
            41,
          ],
          acc: -1,
          time: '2019-12-13T21:00:00.000Z',
          zoomRatio: 11,
        },
        timezone: 'Europe/Istanbul',
        plate: '06',
      },
      country: {
        _id: '55999ad00000010000000000',
        name: {
          en: 'Turkey',
          de: 'Türkei',
          fr: 'Turquie',
          nl: 'Turkije',
          tr: 'Türkiye',
          es: 'Turquía',
          it: 'Turchia',
          pt: 'Turquia',
          'en-US': 'Turkey',
        },
        center: {
          type: 'Point',
          coordinates: [
            35,
            39,
          ],
          acc: -1,
          time: '2019-12-13T21:00:00.000Z',
        },
        code: {
          alpha2: 'TR',
          alpha3: 'TUR',
          numeric: 792,
        },
        currency: {
          code: {
            alpha: 'TRY',
            numeric: 949,
          },
          symbol: '₺',
          isSymbolFirst: true,
        },
        dialingCode: 90,
        timezones: [
          { timezone: 'Europe/Istanbul' },
        ],
        flag: '🇹🇷',
        defaultLanguageCode: 'tr',
        languageSortOrder: [
          'tr',
          'en',
        ],
        languages: {
          tr: { name: 'Türkçe' },
          en: { name: 'English' },
        },
      },
      id: '5dfa4a2e17b571cea40dff89',
    },
    {
      _id: '5dc15bc152caa9581e603145',
      name: "Oğuzhan'ın Deposu-cpy",
      region: {
        _id: '55999ad00000010001000002',
        country: '55999ad00000010000000000',
        city: '55999ad00000010001000000',
        name: {
          tr: 'Bakırköy',
          en: 'Bakirkoy',
        },
        oldCode: 1300,
      },
      country: {
        _id: '55999ad00000010000000000',
        name: {
          en: 'Turkey',
          de: 'Türkei',
          fr: 'Turquie',
          nl: 'Turkije',
          tr: 'Türkiye',
          es: 'Turquía',
          it: 'Turchia',
          pt: 'Turquia',
          'en-US': 'Turkey',
        },
        center: {
          type: 'Point',
          coordinates: [
            35,
            39,
          ],
          acc: -1,
          time: '2019-12-13T21:00:00.000Z',
        },
        code: {
          alpha2: 'TR',
          alpha3: 'TUR',
          numeric: 792,
        },
        currency: {
          code: {
            alpha: 'TRY',
            numeric: 949,
          },
          symbol: '₺',
          isSymbolFirst: true,
        },
        dialingCode: 90,
        timezones: [
          { timezone: 'Europe/Istanbul' },
        ],
        flag: '🇹🇷',
        defaultLanguageCode: 'tr',
        languageSortOrder: [
          'tr',
          'en',
        ],
        languages: {
          tr: { name: 'Türkçe' },
          en: { name: 'English' },
        },
      },
      city: {
        _id: '55999ad00000010001000000',
        country: '55999ad00000010000000000',
        name: {
          en: 'Istanbul',
          tr: 'İstanbul',
        },
        center: {
          type: 'Point',
          coordinates: [
            29,
            41,
          ],
          acc: -1,
          time: '2019-12-13T21:00:00.000Z',
          zoomRatio: 11,
        },
        timezone: 'Europe/Istanbul',
        plate: '06',
      },
      id: '5dc15bc152caa9581e603145',
    },
    {
      _id: '5db9759777a0c71180d7694c',
      name: 'ZincirlikuyuBüyük (DOKUNMA)',
      city: {
        _id: '55999ad00000010001000000',
        country: '55999ad00000010000000000',
        name: {
          en: 'Istanbul',
          tr: 'İstanbul',
        },
        center: {
          type: 'Point',
          coordinates: [
            29,
            41,
          ],
          acc: -1,
          time: '2019-12-13T21:00:00.000Z',
          zoomRatio: 11,
        },
        timezone: 'Europe/Istanbul',
        plate: '06',
      },
      country: {
        _id: '55999ad00000010000000000',
        name: {
          en: 'Turkey',
          de: 'Türkei',
          fr: 'Turquie',
          nl: 'Turkije',
          tr: 'Türkiye',
          es: 'Turquía',
          it: 'Turchia',
          pt: 'Turquia',
          'en-US': 'Turkey',
        },
        center: {
          type: 'Point',
          coordinates: [
            35,
            39,
          ],
          acc: -1,
          time: '2019-12-13T21:00:00.000Z',
        },
        code: {
          alpha2: 'TR',
          alpha3: 'TUR',
          numeric: 792,
        },
        currency: {
          code: {
            alpha: 'TRY',
            numeric: 949,
          },
          symbol: '₺',
          isSymbolFirst: true,
        },
        dialingCode: 90,
        timezones: [
          { timezone: 'Europe/Istanbul' },
        ],
        flag: '🇹🇷',
        defaultLanguageCode: 'tr',
        languageSortOrder: [
          'tr',
          'en',
        ],
        languages: {
          tr: { name: 'Türkçe' },
          en: { name: 'English' },
        },
      },
      region: {
        _id: '55999ad00000010001000001',
        country: '55999ad00000010000000000',
        city: '55999ad00000010001000000',
        name: {
          tr: 'Levent',
          en: 'Levent',
        },
        oldCode: 1000,
      },
      id: '5db9759777a0c71180d7694c',
    },
    {
      _id: '5db9759777a0c71180d7694c',
      name: 'ZincirlikuyuBüyük (DOKUNMA)',
      city: {
        _id: '55999ad00000010001000000',
        country: '55999ad00000010000000000',
        name: {
          en: 'Istanbul',
          tr: 'İstanbul',
        },
        center: {
          type: 'Point',
          coordinates: [
            29,
            41,
          ],
          acc: -1,
          time: '2019-12-13T21:00:00.000Z',
          zoomRatio: 11,
        },
        timezone: 'Europe/Istanbul',
        plate: '06',
      },
      country: {
        _id: '55999ad00000010000000000',
        name: {
          en: 'Turkey',
          de: 'Türkei',
          fr: 'Turquie',
          nl: 'Turkije',
          tr: 'Türkiye',
          es: 'Turquía',
          it: 'Turchia',
          pt: 'Turquia',
          'en-US': 'Turkey',
        },
        center: {
          type: 'Point',
          coordinates: [
            35,
            39,
          ],
          acc: -1,
          time: '2019-12-13T21:00:00.000Z',
        },
        code: {
          alpha2: 'TR',
          alpha3: 'TUR',
          numeric: 792,
        },
        currency: {
          code: {
            alpha: 'TRY',
            numeric: 949,
          },
          symbol: '₺',
          isSymbolFirst: true,
        },
        dialingCode: 90,
        timezones: [
          { timezone: 'Europe/Istanbul' },
        ],
        flag: '🇹🇷',
        defaultLanguageCode: 'tr',
        languageSortOrder: [
          'tr',
          'en',
        ],
        languages: {
          tr: { name: 'Türkçe' },
          en: { name: 'English' },
        },
      },
      region: {
        _id: '55999ad00000010001000001',
        country: '55999ad00000010000000000',
        city: '55999ad00000010001000000',
        name: {
          tr: 'Levent',
          en: 'Levent',
        },
        oldCode: 1000,
      },
      id: '5db9759777a0c71180d7694c',
    },
  ],
};

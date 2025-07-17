// TESTING_PRACTICE_EXAMPLE MOCK_DATA
export const mockedCountries =
  // Turkey, France, Massachusetts
  // TODO: add operation & operationalDomainTypes attributes when they are added to country-info-service
  // & will be used in one of the features to test.
  [
    {
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
      center: {
        type: 'Point',
        coordinates: [35, 39],
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
      timezones: [{ timezone: 'Europe/Istanbul' }],
      flag: '🇹🇷',
      defaultLanguageCode: 'tr',
      languageSortOrder: ['tr', 'en'],
      languages: {
        tr: { name: 'Türkçe' },
        en: { name: 'English' },
      },
      operational: true,
    },
    {
      _id: '6059b3a1252472aba0790d64',
      name: {
        de: 'Frankreich',
        en: 'France',
        fr: 'France',
        nl: 'Frankrijk',
        tr: 'Fransa',
        es: 'Francia',
        it: 'Francia',
        pt: 'França',
        'en-US': 'France',
      },
      center: {
        type: 'Point',
        coordinates: [2.336615, 48.856583],
        acc: -1,
        time: '2019-12-13T21:00:00.000Z',
      },
      code: {
        alpha2: 'FR',
        alpha3: 'FRA',
        numeric: 250,
      },
      currency: {
        code: {
          alpha: 'EUR',
          numeric: 978,
        },
        symbol: '€',
        isSymbolFirst: true,
      },
      dialingCode: 33,
      timezones: [{ timezone: 'Europe/Paris' }],
      flag: '🇫🇷',
      defaultLanguageCode: 'fr',
      languageSortOrder: ['fr', 'en', 'tr'],
      languages: {
        fr: { name: 'Français' },
        en: { name: 'English' },
        tr: { name: 'Türkçe' },
      },
      operational: true,
    },
    {
      _id: '61370da7a937eb4e96795fee',
      name: {
        en: 'Massachusetts',
        'en-US': 'Massachusetts',
        tr: 'Massachusetts',
        de: 'Massachusetts',
        nl: 'Massachusetts',
        fr: 'Massachusetts',
        it: 'Massachusetts',
        es: 'Massachusetts',
        pt: 'Massachusetts',
      },
      center: {
        type: 'Point',
        coordinates: [-71.059882, 42.35982],
        acc: -1,
        time: '2019-12-13T21:00:00.000Z',
      },
      code: {
        alpha2: 'XM',
        alpha3: 'XMA',
        numeric: 902,
      },
      currency: {
        code: {
          alpha: 'USD',
          numeric: 840,
        },
        symbol: '$',
        isSymbolFirst: true,
      },
      dialingCode: 1,
      timezones: [{ timezone: 'America/New_York' }],
      flag: '🇺🇸',
      defaultLanguageCode: 'en-US',
      languageSortOrder: ['en-US', 'en', 'tr'],
      languages: {
        'en-US': { name: 'English (US)' },
        tr: { name: 'Türkçe' },
        en: { name: 'English (UK)' },
      },
      operational: false,
      wasOperational: true,
    },
  ];

export const mockedCities = [
  {
    _id: '55999ad00000010001000000',
    country: '55999ad00000010000000000',
    operational: true,
    wasOperational: true,
    name: {
      tr: 'İstanbul',
      en: 'Istanbul',
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
    plate: '34',
  },
  {
    _id: '5dcf11d00000010002000000',
    country: '55999ad00000010000000000',
    operational: true,
    wasOperational: true,
    name: {
      tr: 'İzmir',
      en: 'Izmir',
    },
    center: {
      type: 'Point',
      coordinates: [
        27.145,
        38.425,
      ],
      acc: -1,
      time: '2019-12-13T21:00:00.000Z',
      zoomRatio: 11,
    },
    timezone: 'Europe/Istanbul',
    plate: '35',
  },
  {
    _id: '5dd84c500000010003000000',
    country: '55999ad00000010000000000',
    operational: true,
    wasOperational: true,
    name: {
      tr: 'Ankara',
      en: 'Ankara',
    },
    center: {
      type: 'Point',
      coordinates: [
        32.77326103000007,
        39.93208425500006,
      ],
      acc: -1,
      time: '2019-12-13T21:00:00.000Z',
      zoomRatio: 12,
    },
    timezone: 'Europe/Istanbul',
    plate: '06',
  },
  {
    _id: '5de186d00000010004000000',
    country: '55999ad00000010000000000',
    operational: true,
    wasOperational: true,
    name: {
      tr: 'Bursa',
      en: 'Bursa',
    },
    center: {
      type: 'Point',
      coordinates: [
        29.03645600200008,
        40.20133461300003,
      ],
      acc: -1,
      time: '2019-12-13T21:00:00.000Z',
      zoomRatio: 12,
    },
    timezone: 'Europe/Istanbul',
    plate: '16',
  },
];

export const mockedDivision = {
  id: '6156bf2e43901f311bf74074',
  name: {
    en: 'Eastern',
    tr: 'Eastern',
  },
  countries: [
    { id: '621762f6d3f4e9d6c6acefbe' }, // XF
    { id: '61370da7a937eb4e96795fec' }, // XN
    { id: '61370da7a937eb4e96795fee' }, // XM
  ],
};

export const mockedDivisions = {
  divisions: [
    {
      id: '6156b31e43901f72b2f7406c',
      name: {
        en: 'Pacific',
        tr: 'Pacific',
      },
      countries: [
        { id: '621755bad3f4e9ed22acefae' }, // XC
      ],
    },
    {
      id: '6156befa43901f2c22f7406e',
      name: {
        en: 'Mountain',
        tr: 'Mountain',
      },
      countries: [],
    },
    {
      id: '6156bf0e43901f6557f74071',
      name: {
        en: 'Central',
        tr: 'Central',
      },
      countries: [
        { id: '62176350d3f4e97396acefc1' }, // XW
        { id: '61370da7a937eb4e96795fed' },
      ],
    },
    mockedDivision,
  ],
};

export const mockedInfoCountries = mockedCountries;

export const getSelectedCountry = () => ({
  _id: '55999ad00000010000000000',
  name: {
    de: 'Türkei',
    en: 'Turkey',
    'en-US': 'Turkey',
    fr: 'Turquie',
    nl: 'Turkije',
    tr: 'Türkiye',
    es: 'Turquía',
    it: 'Turchia',
    pt: 'Turquia',
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
});

export const getSelectedCountryLanguages = () => ['en', 'tr'];

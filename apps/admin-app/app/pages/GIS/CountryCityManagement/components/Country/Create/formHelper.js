export const defaultValues = {
  name: {
    tr: '',
    en: '',
  },
  center: {
    geometry: {
      type: 'Point',
      coordinates: [
        0,
        0,
      ],
    },
  },
  code: {
    alpha2: '',
    alpha3: '',
    numeric: '',
  },
  currency: {
    code: {
      alpha: '',
      numeric: '',
    },
    symbol: '',
    isSymbolFirst: true,
  },
  dialingCode: 90,
  timezones: [
    { timezone: '' },
  ],
  flag: '',
  defaultLanguageCode: '',
  languageSortOrder: [
    '',
    '',
  ],
  languages: {
    en: { name: '' },
    tr: { name: '' },
  },
  operationalDomainTypes: [],
  wasOperationalDomainTypes: [],
};

import {
  getInitialSelectedPages,
  getInitialCountries,
} from './utils';

describe('getInitialSelectedPages', () => {
  test('returns an empty array if defaultSelectedPermission is falsy', () => {
    const result = getInitialSelectedPages(null);
    expect(result).toEqual([]);
  });

  test('converts defaultSelectedPermission to select options', () => {
    const defaultSelectedPermission = { _id: '1', name: { en: 'TestPage', tr: 'TestPage' } };
    const result = getInitialSelectedPages(defaultSelectedPermission);

    expect(result).toMatchObject([
      {
        label: 'TestPage',
        value: '1',
        data: { _id: '1', name: { en: 'TestPage', tr: 'TestPage' } },
      },
    ]);
  });
});

describe('getInitialCountries', () => {
  test('returns an empty array if defaultSelectedPermission is falsy', () => {
    const result = getInitialCountries(null, []);
    expect(result).toEqual([]);
  });

  test('returns converted countries based on defaultSelectedPermission', () => {
    const defaultSelectedPermission = { _id: '1', name: { en: 'TestPage', tr: 'TestPage' }, countries: ['DE'] };

    const countryTR = {
      _id: 'TR',
      flag: '🇹🇷',
      code: {
        alpha2: 'TR',
        alpha3: 'TUR',
        numeric: '792',
      },
      name: {
        de: 'Türkei',
        en: 'Turkey',
        'en-US': 'Turkey',
        es: 'Turquía',
        fr: 'Turquie',
        it: 'Turchia',
        nl: 'Turkije',
        pt: 'Turquia',
        tr: 'Türkiye',
      },
    };

    const countryDE = {
      _id: 'DE',
      flag: '🇩🇪',
      code: {
        alpha2: 'DE',
        alpha3: 'DEU',
        numeric: '276',
      },
      name: {
        en: 'Germany',
        de: 'Deutschland',
        fr: 'Allemagne',
        nl: 'Duitsland',
        tr: 'Almanya',
        es: 'Alemania',
        it: 'Germania',
        pt: 'Alemanha',
        'en-US': 'Germany',
      },
    };

    const countries = [countryTR, countryDE];

    const result = getInitialCountries(defaultSelectedPermission, countries);
    expect(result).toMatchObject([{
      value: 'DE',
      label: '🇩🇪 - Germany',
      'aria-label': 'Germany',
      keyword: 'Germany',
      data: countryDE,
    }]);
  });
});

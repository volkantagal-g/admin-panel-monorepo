import { getCountryOptions } from '@app/pages/PushNotification/List/utils';

describe('Util Functions for list page', () => {
  describe('getCountryOptions', () => {
    it('should return country options', () => {
      const countries = [
        {
          _id: '5f7a8b3c5b2c4b001e1c8f0d',
          name: {
            en: 'Turkey',
            tr: 'Türkiye',
          },
        },
        {
          _id: '5f7a8b3c5b2c4b001e1c8f0e',
          name: {
            en: 'Germany',
            tr: 'Almanya',
          },
        },
      ];
      const langKey = 'tr';
      const expectedCountryOptions = [
        {
          value: '5f7a8b3c5b2c4b001e1c8f0d',
          label: 'Türkiye',
        },
        {
          value: '5f7a8b3c5b2c4b001e1c8f0e',
          label: 'Almanya',
        },
      ];
      const receivedCountryOptions = getCountryOptions(countries, langKey);
      expect(receivedCountryOptions).toEqual(expectedCountryOptions);
    });
  });
});

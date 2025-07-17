import { getCityNameById, getPaymentMethodById, getCourierActivityDiff } from './utils';

const MOCKED_CITIES = [
  {
    _id: '55999ad00000010001000000',
    name: {
      en: 'Istanbul',
      tr: 'İstanbul',
    },
  },
  {
    _id: '5dcf11d00000010002000000',
    name: {
      tr: 'İzmir',
      en: 'Izmir',
    },
  },
];

const MOCKED_COURIER_LAST_ACTIVITY_PARAMS = { courier: { statusLastChangedAt: '2023-06-04T15:38:43.192Z' } };

describe('ArtisanOrder/Active/DataTable/utils', () => {
  describe('#getCityNameById', () => {
    it('should return city name (with correct parameters)', () => {
      expect(getCityNameById(MOCKED_CITIES, '55999ad00000010001000000')).toEqual('Istanbul');
    });
    it('should return empty string (with undefined parameters)', () => {
      expect(getCityNameById()).toEqual('');
    });
  });

  describe('#getPaymentMethodById', () => {
    it('should return payment method name (with correct parameters)', () => {
      expect(getPaymentMethodById(2)).toEqual('BKM');
    });
    it('should return empty string (with undefined parameters)', () => {
      expect(getPaymentMethodById()).toEqual('');
    });
  });

  describe('#getCourierActivityDiff', () => {
    it('should return courier last activity diff', () => {
      expect(getCourierActivityDiff(MOCKED_COURIER_LAST_ACTIVITY_PARAMS)).toBeGreaterThan(0);
    });
  });
});

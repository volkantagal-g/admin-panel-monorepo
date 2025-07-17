import moment from 'moment';

import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';
import { transformForApi } from './utils';

describe('Client Detail utils', () => {
  describe('#transformForApi', () => {
    it('should return only defined values', () => {
      const filters = {
        city: null,
        region: null,
        statuses: null,
        domainType: GETIR_DOMAIN_TYPES.GETIR10,
        createdAtStart: moment().format('DD/MM/YYYY'),
        createdAtEnd: moment().format('DD/MM/YYYY'),
      };
      const result = transformForApi(filters);
      expect(result).toMatchObject({
        domainType: GETIR_DOMAIN_TYPES.GETIR10,
        createdAtStart: moment().format('DD/MM/YYYY'),
        createdAtEnd: moment().format('DD/MM/YYYY'),
      });
      expect(result.domainType).toEqual(1);
    });
  });
});

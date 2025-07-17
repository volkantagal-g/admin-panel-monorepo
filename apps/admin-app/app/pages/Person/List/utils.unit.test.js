import { Tag } from 'antd';

import {
  showStatus,
  personListRequestParams,
} from './utils';
import { t } from '@shared/i18n';

describe('Person List utils', () => {
  describe('showStatus', () => {
    it('should return correct params', () => {
      const params = { isActivated: true, isReservable: true, t };
      const expectedResult = <Tag color="#5cb85c">Yes</Tag>;
      const result = showStatus(params);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('personListRequestParams', () => {
    it('should return correct params', () => {
      const params = { name: 'name', isActivated: true, uniqueIdentifier: '1234' };
      const expectedResult = {
        sort: { createdAt: -1 },
        query: { isActivated: true, name: 'name', uniqueIdentifier: '1234' },
        fields: 'name isReservable isActivated personalGsm gsm trainings picURL homeAddress',
      };
      const result = personListRequestParams(params);

      expect(result).toEqual(expectedResult);
    });
  });
});

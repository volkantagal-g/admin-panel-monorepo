// NOTE: anything that uses language key is integration test
import { getLangKey } from '@shared/i18n';
import * as utils from './common';
import { domainTypes } from '@shared/shared/constantValues';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';

describe('Common Utils', () => {
  describe('#convertConstantValuesToSelectOptions', () => {
    it('should return converted constant values with select option format', () => {
      const domainTypesSelectOptions = utils.convertConstantValuesToSelectOptions(domainTypes);

      expect(Array.isArray(domainTypesSelectOptions)).toBe(true);
      const firstObject = domainTypesSelectOptions[0];
      expect(firstObject.value).toEqual(GETIR_DOMAIN_TYPES.GETIR10);
      expect(firstObject).toHaveProperty('label');
      expect(firstObject.label).toBe(domainTypes[GETIR_DOMAIN_TYPES.GETIR10][getLangKey()]);
    });
  });
  describe('#copyToClipboard', () => {
    it('should run without fail', () => {
      expect(utils.copyToClipboard('text')).toBe(undefined);
    });
  });
  describe('#convertSelectOptions', () => {
    it('should return empty array as default', () => {
      expect(utils.convertSelectOptions()).toEqual([]);
    });
    it('should work correctly', () => {
      const data = [{ _id: '1', name: 'test' }];

      expect(utils.convertSelectOptions(data, { isTranslation: true })).toEqual([{
        data: null,
        label: '-',
        value: '1',
      }]);
    });
    it('should work correctly', () => {
      const data = [{ _id: '1', name: 'test' }];

      expect(utils.convertSelectOptions(data, { hasTranslationKey: true })).toEqual([{
        data: null,
        label: 'test',
        value: '1',
      }]);
    });
  });
});

import { mockedBagConstraints, mockedMasterCategories } from '@shared/api/bag/index.mock.data';
import { formatBagConstraints, getMasterCategoriesMap } from '.';

describe('Missing products util', () => {
  describe('#getMasterCategoriesMap', () => {
    it('should return category map', () => {
      const masterCategoriesMap = getMasterCategoriesMap(mockedMasterCategories);
      expect(masterCategoriesMap).toHaveProperty('6156af7a9883dce26caa1ebd');
    });
  });
  describe('#formatBagConstraints', () => {
    it('should return formatted constraints', () => {
      const bagConstraints = formatBagConstraints(mockedMasterCategories, mockedBagConstraints, 'firstGroup');
      expect(bagConstraints).toHaveLength(1);
    });
  });
});

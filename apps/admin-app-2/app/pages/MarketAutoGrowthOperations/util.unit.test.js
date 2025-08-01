import { findBucketGroups, highLowSet } from '@app/pages/MarketAutoGrowthOperations/util';
import { MOCK_HIGH_LOW_SET, MOCK_FIND_BUCKET_GROUPS_REQUEST, MOCK_FIND_BUCKET_GROUPS_RESPONSE } from '@app/pages/MarketAutoGrowthOperations/mock.data';

describe('Auto Growth utils', () => {
  describe('#highLowSet', () => {
    it('should return numbers', () => {
      expect(highLowSet(MOCK_HIGH_LOW_SET)).toEqual({ highSet: 4, lowSet: -2 });
    });
    it('should return undefined', () => {
      expect(highLowSet(undefined)).toEqual(undefined);
    });
    it('should return undefined', () => {
      expect(highLowSet([])).toEqual(undefined);
    });
  });
  describe('#findBucketGroups', () => {
    it('should return bucket groups', () => {
      expect(findBucketGroups(MOCK_FIND_BUCKET_GROUPS_REQUEST)).toEqual(MOCK_FIND_BUCKET_GROUPS_RESPONSE);
    });
    it('should return undefined', () => {
      expect(findBucketGroups(undefined)).toEqual(undefined);
    });
    it('should return undefined', () => {
      expect(findBucketGroups([])).toEqual(undefined);
    });
  });
});

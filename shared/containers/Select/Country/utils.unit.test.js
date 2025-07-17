import { convertSelectOptions } from './utils';

describe('Select Country utils', () => {
  describe('#convertSelectOptions', () => {
    it('should return empty array for no inputs', () => {
      expect(convertSelectOptions({})).toEqual([]);
    });
  });
});

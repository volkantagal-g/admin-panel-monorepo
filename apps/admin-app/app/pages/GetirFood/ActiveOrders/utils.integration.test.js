import { searchSelectOption } from './utils';

describe('In Food Active Orders Utils', () => {
  describe('#searchSelectOption', () => {
    const fakeInputValue = 'ma';
    const fakeOption = {
      key: 'MasterCard',
      value: 'MasterCard',
    };
    it('should return false for no inputs', () => {
      expect(searchSelectOption({ inputValue: null, option: fakeOption })).toBe(false);
    });
    it('should return true input equal (part of) selected option', () => {
      expect(searchSelectOption({ inputValue: fakeInputValue, option: fakeOption })).toBe(true);
    });
  });
});

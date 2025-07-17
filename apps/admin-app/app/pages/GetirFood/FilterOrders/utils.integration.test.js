import { searchSelectOption, getOrderStatus } from './utils';

describe('In Food Filter Orders Utils', () => {
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

  describe('#getOrderStatus', () => {
    const fakeStatus = 1500;
    it('should return active for null status', () => {
      expect(getOrderStatus(null)).toBe('active');
    });
    it('should return cancelled for 1500 status', () => {
      expect(getOrderStatus(fakeStatus)).toBe('cancelled');
    });
  });
});

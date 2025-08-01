const { toFixedNoRoundOff, leftShiftDigits } = require('./helpers');

describe('Helpers', () => {
  describe('#toFixedNoRoundOff', () => {
    it('should return fixed precision number with truncated last digit', () => {
      expect(toFixedNoRoundOff(237.196)).toBe('237.19');
      expect(toFixedNoRoundOff(11.00)).toBe('11');
      expect(toFixedNoRoundOff(0)).toBe('0');
    });
  });

  describe('#leftShiftDigits', () => {
    it('should return UTC formate date', () => {
      expect(leftShiftDigits(1234.56)).toBe(12345.6);
      expect(leftShiftDigits(0.01)).toBe(0.1);
      expect(leftShiftDigits(9.999)).toBe(99.99);
      expect(leftShiftDigits(1)).toBe(1);
      expect(leftShiftDigits(100.1)).toBe(1001);
    });
  });
});

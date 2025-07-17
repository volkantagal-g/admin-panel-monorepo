import * as utils from './dateHelper';

describe('Date Helper', () => {
  describe('#formatUTCDate', () => {
    it('should return UTC formate date', () => {
      const date = '2022-07-25T07:04:37.191Z';
      expect(utils.formatUTCDate(date)).toBe('25.07.2022 07:04');
    });
  });
  describe('#formatDate', () => {
    it('should return formate date', () => {
      const date = '2022-12-10T00:00:00';
      expect(utils.formatDate(date, 'YYYY-MM-DD')).toBe('2022-12-10');
    });
  });
  describe('#formatDateWithSecond', () => {
    it('should return formate date with second', () => {
      const date = '2022-12-10T01:02:03';
      expect(utils.formatDateWithSecond(date, 'DD.MM.YYYY HH:mm:ss')).toBe('10.12.2022 01:02:03');
    });
  });
  describe('#formatDateWithSecond', () => {
    it('should return formate date with second', () => {
      const duration = 1;
      expect(utils.secondToMs(duration)).toBe(1000);
    });
  });
});

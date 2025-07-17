import { getBetweenDates, getTimesheetAction } from './utils';
import { TIMESHEET_ACTION } from './constants';

describe('TimesheetLock utils', () => {
  describe('getBetweenDates', () => {
    it('should return the correct dates', () => {
      const startDate = '2020-01-01';
      const endDate = '2020-01-03';

      const result = getBetweenDates(startDate, endDate);

      expect(result).toEqual(['2020-01-01', '2020-01-02', '2020-01-03']);
    });
  });

  describe('getTimesheetAction', () => {
    it('should return LOCK when there are only unlocked timesheets', () => {
      const timesheets = [
        { isLocked: false, date: '2020-01-01' },
        { isLocked: false, date: '2020-01-02' },
        { isLocked: false, date: '2020-01-03' },
      ];
      const startDate = '2020-01-01';
      const endDate = '2020-01-03';

      const result = getTimesheetAction(timesheets, startDate, endDate);

      expect(result).toEqual(TIMESHEET_ACTION.LOCK);
    });

    it('should return UNLOCK when there are only locked timesheets', () => {
      const timesheets = [
        { isLocked: true, date: '2020-01-01' },
        { isLocked: true, date: '2020-01-02' },
        { isLocked: true, date: '2020-01-03' },
      ];
      const startDate = '2020-01-01';
      const endDate = '2020-01-03';

      const result = getTimesheetAction(timesheets, startDate, endDate);

      expect(result).toEqual(TIMESHEET_ACTION.UNLOCK);
    });

    it('should return BOTH when there are locked and unlocked timesheets', () => {
      const timesheets = [
        { isLocked: true, date: '2020-01-01' },
        { isLocked: false, date: '2020-01-02' },
        { isLocked: true, date: '2020-01-03' },
      ];
      const startDate = '2020-01-01';
      const endDate = '2020-01-03';

      const result = getTimesheetAction(timesheets, startDate, endDate);

      expect(result).toEqual(TIMESHEET_ACTION.BOTH);
    });
  });
});

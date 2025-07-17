import { leaveRequestDetail } from '@shared/api/leaveManagement/index.mock.data';
import { t } from '@shared/i18n';
import { getLeaveCalculations } from './utils';

test('leave date/duration calculation', () => {
  const timezone = 'Europe/Istanbul';
  const { startDatetime, endDatetime, workableTime } = leaveRequestDetail;
  const { leaveDates, leaveDuration } = getLeaveCalculations({
    t,
    timezone,
    startDatetime,
    endDatetime,
    workableTime,
  });

  expect(leaveDates).toEqual('2023/04/19 - 2023/04/20');
  expect(leaveDuration).toEqual('1 Days / 8 Hours');
});

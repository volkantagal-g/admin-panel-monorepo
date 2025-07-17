import { leaveRequests } from '@shared/api/leaveManagement/index.mock.data';
import { getFormattedData } from './utils';

test('format data correctly', () => {
  const formatted = getFormattedData(leaveRequests.leaves);

  expect(formatted[0].dayRequested).toEqual(1);
  expect(formatted[0].datesRequested).toEqual('Apr 19th - 20th');
  expect(formatted[1].dayRequested).toEqual(3);
  expect(formatted[1].datesRequested).toEqual('Mar 6th - 9th');
});

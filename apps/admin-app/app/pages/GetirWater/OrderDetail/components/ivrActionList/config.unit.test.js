// TESTING_PRACTICE_EXAMPLE UNIT_TEST
import { CallStatusTranslationMap, getTranslatedCallStatus, tableColumns } from './config';

describe('ivrActionList Test Suite', () => {
  it('should translate call status properly', () => {
    const t = jest.fn().mockImplementation(v => v);
    const callStatusKey = '1';
    const callStatus = 'PICKED_UP';
    expect(callStatus).toBe(CallStatusTranslationMap[callStatusKey]);
    const translationPrefix = 'waterOrderPage:IVR_ACTION.';
    const result = getTranslatedCallStatus(callStatusKey, t);
    const translatedCallStatus = `${translationPrefix}${callStatus}`;
    expect(result).toBe(translatedCallStatus);
    expect(t).toHaveBeenCalledWith(translatedCallStatus);
    expect(t).toHaveBeenCalledTimes(1);
  });

  it('should render call table columns', () => {
    const t = jest.fn().mockImplementation(v => v);
    const columns = tableColumns(t);
    expect(columns).toHaveLength(4);
    expect(t).toHaveBeenCalledTimes(4);

    const dateColumn = columns[0];
    expect(dateColumn.title).toBe('waterOrderPage:IVR_ACTION.DATE');
    expect(dateColumn.render('10.09.22')).toContain('09 / 10 / 2022');

    const callStatus = columns[2];
    expect(callStatus.title).toBe('waterOrderPage:IVR_ACTION.CALL_STATUS');
    expect(callStatus.render(2)).toBe('waterOrderPage:IVR_ACTION.DIDNT_PICKED_UP');

    const dialingStatus = columns[3];
    expect(dialingStatus.title).toBe('waterOrderPage:IVR_ACTION.DIALING_STATUS');
    expect(dialingStatus.render(2)).toBe(2);
  });
});

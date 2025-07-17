import * as MOCKS from './alertCondition.mock.data';

const filterAlertConditionsUrl = '/businessAlertingTool/alertCondition/filterAlertConditions';

export const filterAlertConditionsMockHandler = {
  url: filterAlertConditionsUrl,
  method: 'post',
  successData: MOCKS.mockedFilteredAlertConditions,
};

export default [filterAlertConditionsMockHandler];

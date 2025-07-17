import moment from 'moment';

import { COMMUNICATION_CHANNEL_TYPES } from '@app/pages/CommunicationHistory/constants';

export const getInitialValues = communicationType => {
  let initialValues = {};
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.EMAIL || communicationType === COMMUNICATION_CHANNEL_TYPES.SMS) {
    initialValues = { dateRange: [moment().subtract(3, 'months').add(1, 'days'), moment()] };
  }
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.NOTIF) {
    initialValues = { dateRange: [moment().subtract(3, 'months').add(1, 'days'), moment()] };
  }
  return initialValues;
};

export const manipulateValuesBeforeSubmit = values => {
  let tempValues = values;
  const startDate = tempValues?.dateRange?.[0];
  const endDate = tempValues?.dateRange?.[1];
  tempValues = {
    ...values,
    page: 0,
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
  };
  delete tempValues.dateRange;
  delete tempValues.startDateModal;
  delete tempValues.endDateModal;

  return ({ ...tempValues });
};

export const manipulateValuesBeforeExport = values => {
  let tempValues = values;
  const startDate = tempValues?.dateRange?.[0];
  const endDate = tempValues?.dateRange?.[1];
  tempValues = {
    ...values,
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
  };
  delete tempValues.dateRange;
  delete tempValues.startDateModal;
  delete tempValues.endDateModal;

  return ({ ...tempValues });
};

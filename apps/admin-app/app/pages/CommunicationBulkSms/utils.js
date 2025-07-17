import moment from 'moment';

import { CAMPAIGN_STATUS } from '@app/pages/CommunicationBulkSms/constants';

export const disabledDate = current => {
  const now = moment();
  const fifteenMinutesFromNow = moment(now).add(15, 'minutes');
  return current < fifteenMinutesFromNow;
};

export const disabledTime = current => {
  const now = moment();
  const fifteenMinutesFromNow = moment(now).add(15, 'minutes');
  if (!current) {
    return {
      disabledHours: () => range(0, now.hour()),
      disabledMinutes: () => range(0, now.minute()),
    };
  }
  if (current.isBefore(fifteenMinutesFromNow)) {
    return {
      disabledHours: () => range(0, current.hour()),
      disabledMinutes: () => range(0, current.minute()),
    };
  }
  return {};
};

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

export const getPageHeaderTagColor = status => {
  switch (status) {
    case CAMPAIGN_STATUS.INITIALIZING:
    case CAMPAIGN_STATUS.READY_FOR_DELIVERY:
      return 'cyan';
    case CAMPAIGN_STATUS.DELIVERY_IN_PROGRESS:
    case CAMPAIGN_STATUS.COMPLETED:
      return 'green';
    case CAMPAIGN_STATUS.FAILED:
    case CAMPAIGN_STATUS.CANCELLED:
      return 'red';
    default:
      return null;
  }
};

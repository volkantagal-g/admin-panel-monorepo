import moment from 'moment';
import { get, isNumber } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { msToString, secondToMs } from '@shared/utils/dateHelper';
import { getLocalDateFormat, getLocalDateTimeFormat } from '@shared/utils/localization';

const getFormattedTime = (duration, shouldAddSecond = true) => (
  isNumber(duration) ? msToString({ duration: secondToMs(duration), shouldAddSecond }) : '-'
);

export const getFormattedData = logDetails => ({
  logInfo: {
    criterionName: get(logDetails, ['criteria', 'name', getLangKey()], '-'),
    warehouseName: get(logDetails, ['warehouse', 'name'], '-'),
    pickerName: get(logDetails, ['data', 'transfer', 'picker', 'name']),
    transferId: get(logDetails, ['data', 'transfer', 'id']),
    recordDate: moment(get(logDetails, 'recordDate')).format(getLocalDateFormat()),
    orderId: get(logDetails, ['data', 'order', 'id']),
    palletId: get(logDetails, 'data.transfer.palletId'),
  },
  orderInfo: {
    isVisible: !!get(logDetails, ['data', 'product']),
    isMissingProduct: !!get(logDetails, ['data', 'product', 'fullName', getLangKey()]),
    productFullName: get(logDetails, ['data', 'product', 'fullName', getLangKey()], '-'),
    feedback: {
      note: get(logDetails, 'data.feedback.note', '-'),
      reasonText: get(logDetails, ['data', 'feedback', 'feedback', getLangKey()], '-'),
    },
  },
  waybillsInfo: {
    isVisible: !!get(logDetails, 'data.transfer.id'),
    shippingDate: moment(get(logDetails, 'data.transfer.transferShippingDate')).format(getLocalDateTimeFormat()),
    receivingStartDate: moment(get(logDetails, 'data.transfer.receivingStartDate')).format(getLocalDateTimeFormat()),
    receivingEndDate: moment(get(logDetails, 'data.transfer.receivingEndDate')).format(getLocalDateTimeFormat()),
    receivingDuration: getFormattedTime(moment(get(logDetails, 'data.transfer.receivingEndDate'))
      .diff(moment(get(logDetails, 'data.transfer.receivingStartDate'))) / 1000, false),
    acceptableShippingDate: moment(get(logDetails, 'data.transfer.transferShippingDate'))
      .add(2, 'day').format(getLocalDateTimeFormat()),
    threshold: get(logDetails, 'data.threshold', '-'),
  },
  conclusion: { text: get(logDetails, 'conclusion.description'), isObjection: false },
  objection: { text: get(logDetails, 'objection.description'), isObjection: true },
  status: get(logDetails, 'status'),
});

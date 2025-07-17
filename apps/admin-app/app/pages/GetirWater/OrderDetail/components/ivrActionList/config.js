import moment from 'moment';
import _ from 'lodash';

export const CallStatusTranslationMap = {
  0: 'CALL_NOT_STARTED',
  1: 'PICKED_UP',
  2: 'DIDNT_PICKED_UP',
  3: 'COULDNT_BE_REACHED',
  4: 'COULDNT_BE_CHARGED',
  5: 'CANCELLED',
  6: 'ERROR_RECEIVED',
  7: 'BUSY',
  8: 'INVALID_NUMBER',
  9: 'TIMEOUT',
  10: 'DIDNT_CALL',
};

export const getTranslatedCallStatus = (callStatusKey, t) => {
  return t('waterOrderPage:IVR_ACTION.'.concat(CallStatusTranslationMap[callStatusKey]));
};

export const tableColumns = t => {
  return [
    {
      title: t('waterOrderPage:IVR_ACTION.DATE'),
      dataIndex: 'date',
      key: 'date',
      width: 100,
      render: date => (_.isUndefined(date) ? '-' : moment(date).format('DD / MM / YYYY HH:mm:ss')),
    },
    {
      title: t('waterOrderPage:IVR_ACTION.PHONE'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 100,
    },
    {
      title: t('waterOrderPage:IVR_ACTION.CALL_STATUS'),
      dataIndex: 'callStatus',
      key: 'callStatus',
      width: 100,
      render: callStatus => (_.isUndefined(callStatus) ? '-' : getTranslatedCallStatus(callStatus, t)),
    },
    {
      title: t('waterOrderPage:IVR_ACTION.DIALING_STATUS'),
      dataIndex: 'dialingStatus',
      key: 'dialingStatus',
      width: 100,
      render: dialingStatus => dialingStatus || '-',
    },
  ];
};

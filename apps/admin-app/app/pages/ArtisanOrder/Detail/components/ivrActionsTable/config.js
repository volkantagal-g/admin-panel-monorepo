import _ from 'lodash';

import { formatDate } from '@shared/utils/dateHelper';
import { foodOrderIvrActions } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';

export const tableColumns = [
  {
    title: 'DATE',
    dataIndex: 'callDate',
    key: 'callDate',
    width: 100,
    render: callDate => {
      return formatDate(callDate);
    },
  },
  {
    title: 'PHONE',
    dataIndex: 'number',
    key: 'number',
    width: 100,
    render: number => {
      return number;
    },
  },
  {
    title: 'WebHelp Durumu',
    dataIndex: 'webHelpStatus',
    key: 'webHelpStatus',
    width: 100,
    render: webHelpStatus => {
      return _.get(foodOrderIvrActions.webHelpStatuses, [webHelpStatus, getLangKey()], '');
    },
  },
  {
    title: 'Çağrı Durumu',
    dataIndex: 'callStatus',
    key: 'callStatus',
    width: 100,
    render: callStatus => {
      return _.get(foodOrderIvrActions.callStatuses, [callStatus, getLangKey()], '');
    },
  },
];

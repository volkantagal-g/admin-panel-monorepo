import { get } from 'lodash';
import { Tooltip } from 'antd';

import { formatDate } from '@shared/utils/dateHelper';
import { getLangKey } from '@shared/i18n';
import { IVRKind, IVRProviderCallStates } from './constants';

export const generateColumns = ({ t }) => [
  {
    title: t('IVR_ACTION.DATE'),
    dataIndex: 'callDate',
    key: 'callDate',
    width: 100,
    render: callDate => {
      return formatDate(callDate);
    },
  },
  {
    title: t('IVR_ACTION.PHONE'),
    dataIndex: 'gsmNumber',
    key: 'gsmNumber',
    width: 80,
  },
  {
    title: t('IVR_ACTION.ANNOUNCEMENT_NUMBER'),
    key: 'announcementNumber',
    width: 100,
    render: ivrActionResult => {
      return (
        <Tooltip title={ivrActionResult.message}>
          {get(ivrActionResult, 'announcementNumber', '-')}
        </Tooltip>
      );
    },
  },
  {
    title: t('IVR_ACTION.IVR_KIND'),
    dataIndex: 'kind',
    key: 'kind',
    width: 100,
    render: kind => {
      return get(IVRKind, [kind, getLangKey()], '');
    },
  },
  {
    title: t('IVR_ACTION.CALL_STATUS'),
    dataIndex: 'callbackStatus',
    key: 'callbackStatus',
    width: 100,
    render: callbackStatus => {
      return get(
        IVRProviderCallStates,
        [callbackStatus, getLangKey()],
        '',
      );
    },
  },
];

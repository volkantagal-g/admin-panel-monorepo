import moment from 'moment';

import { courierStatuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { getCallerTypeTranslation } from '@app/pages/Courier/Detail/utils';

const DATE_AND_HOUR_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const tableColumns = ({ t }) => {
  const langKey = getLangKey();
  return [
    {
      title: t('STATUS_LOGS_TABLE_HEADERS.STATUS_LOG_TIME'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => (createdAt ? moment(createdAt).format(DATE_AND_HOUR_FORMAT) : ''),
    },
    {
      title: 'ID',
      dataIndex: 'mutableId',
      key: 'mutableId',
      render: mutableId => mutableId || '',
    },
    {
      title: t('global:BEFORE'),
      dataIndex: 'oldStatus',
      key: 'oldStatus',
      render: oldStatus => courierStatuses?.[oldStatus]?.[langKey],
    },
    {
      title: t('global:AFTER'),
      dataIndex: 'newStatus',
      key: 'newStatus',
      render: newStatus => courierStatuses?.[newStatus]?.[langKey],
    },
    {
      title: t('STATUS_LOGS_TABLE_HEADERS.METHOD'),
      dataIndex: ['data', 'method'],
      key: 'apiMethod',
    },
    {
      title: t('STATUS_LOGS_TABLE_HEADERS.CHANGED_BY'),
      dataIndex: 'callerType',
      key: 'callerType',
      render: callerType => getCallerTypeTranslation(callerType, langKey),
    },
    {
      title: t('global:DOMAIN_TYPES'),
      dataIndex: 'domainTypes',
      key: 'domainTypes',
      render: domainTypes => domainTypes?.toString() || '-',
    },
    {
      title: t('STATUS_LOGS_TABLE_HEADERS.DATA'),
      dataIndex: 'data',
      key: 'data',
      render: data => JSON.stringify(data) || '-',
    },
  ];
};

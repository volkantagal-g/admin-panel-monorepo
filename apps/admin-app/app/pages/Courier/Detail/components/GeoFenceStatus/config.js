import { getLangKey } from '@shared/i18n';

import { geoFenceGroups } from '@shared/shared/constants';

export const tableColumns = ({ t }) => {
  return [
    {
      title: t('GEOFENCE_STATUS.GROUP'),
      dataIndex: 'group',
      key: 'group',
      width: 100,
      render: group => (group ? geoFenceGroups[group][getLangKey()] : '-'),
    },
    {
      title: t('ID'),
      dataIndex: 'id',
      key: 'id',
      width: 180,
    },
    {
      title: t('GEOFENCE_STATUS.COURIER_FLOW'),
      dataIndex: 'courierFlow',
      key: 'courierFlow',
      width: 180,
    },
    {
      title: t('SUCCESS'),
      dataIndex: 'success',
      key: 'success',
      width: 180,
      render: success => (success ? 'Yes' : 'No'),
    },
    {
      title: t('GEOFENCE_STATUS.CONFIG'),
      dataIndex: 'config',
      key: 'config',
    },
    {
      title: t('STATUS_LOGS_TABLE_HEADERS.DATA'),
      dataIndex: 'dataLog',
      key: 'dataLog',
      render: dataLog => JSON.stringify(dataLog) || '-',
    },
  ];
};

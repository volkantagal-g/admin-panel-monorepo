import moment from 'moment';

import { getLangKey, t } from '@shared/i18n';

export const getTableColumns = () => {
  return [
    {
      title: t('DATE'),
      width: '150px',
      key: 'createdAt',
      render: row => {
        return moment(row.createdAt).format('DD.MM.YYYY HH:mm');
      },
    },
    {
      title: t('USER'),
      width: '150px',
      key: 'userName',
      render: row => {
        return row.userName;
      },
    },
    {
      title: t('franchiseEquipmentPage:EQUIPMENT_NAME'),
      width: '150px',
      key: 'equipmentName',
      render: row => {
        return row.equipmentName[getLangKey()];
      },
    },
    {
      title: t('franchiseEquipmentPage:OLD_EQUIPMENT_RIGHT_VALUE'),
      width: '150px',
      key: 'oldCurrentRight',
      align: 'right',
      render: row => {
        return row.oldCurrentRight;
      },
    },
    {
      title: t('franchiseEquipmentPage:NEW_EQUIPMENT_RIGHT_VALUE'),
      width: '150px',
      key: 'newCurrentRight',
      align: 'right',
      render: row => {
        return row.newCurrentRight;
      },
    },
  ];
};

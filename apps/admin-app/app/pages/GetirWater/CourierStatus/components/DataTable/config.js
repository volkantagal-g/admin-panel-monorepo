import _ from 'lodash';
import moment from 'moment';
import { Typography } from 'antd';

import { getLangKey } from '@shared/i18n';
import { waterCourierStatuses } from '@shared/shared/constantValues';

const { Text } = Typography;

const timeConvert = (time, t) => {
  const currentTime = moment();
  const diff = currentTime.diff(time, 'minutes');
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return `${hours}${t('global:TIME.ABBR.HOUR')} ${minutes}${t('global:TIME.ABBR.MINUTE')}`;
};

export const generateColumns = (mappedWarehouses, t) => {
  moment.locale(getLangKey());

  const checkPropIsExist = (obj, prop) => {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };

  const columns = [
    {
      title: t('COURIER'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t('WAREHOUSE'),
      dataIndex: 'warehouse',
      key: 'warehouse',
      render: warehouse => _.get(mappedWarehouses, warehouse, ''),
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      render: status => {
        if (waterCourierStatuses[status]) {
          return <Text>{waterCourierStatuses[status][getLangKey()]}</Text>;
        }

        return '';
      },
    },
    {
      title: t('getirWater:COURIER_STATUS.STATUS_REASON'),
      dataIndex: 'lastBusyOption',
      key: 'lastBusyOption',
      render: lastBusyOption => {
        if (lastBusyOption && lastBusyOption[getLangKey()]) {
          return <Text>{lastBusyOption[getLangKey()]}</Text>;
        }

        return '';
      },
      sorter: (a, b) => {
        if (checkPropIsExist(a, 'lastBusyOption') && !checkPropIsExist(b, 'lastBusyOption')) {
          return 1;
        }

        if (!checkPropIsExist(a, 'lastBusyOption') && checkPropIsExist(b, 'lastBusyOption')) {
          return -1;
        }

        if (checkPropIsExist(a, 'lastBusyOption') && checkPropIsExist(b, 'lastBusyOption')) {
          return a.lastBusyOption[getLangKey()].localeCompare(b.lastBusyOption[getLangKey()]);
        }

        if (!checkPropIsExist(a, 'lastBusyOption') && !checkPropIsExist(b, 'lastBusyOption')) {
          return 0;
        }

        return false;
      },
    },
    {
      title: t('getirWater:COURIER_STATUS.LAST_STATUS_UPDATE'),
      dataIndex: 'statusLastChangedAt',
      key: 'statusLastChangedAt',
      render: statusLastChangedAt => timeConvert(statusLastChangedAt, t),
      sorter: (a, b) => moment(a.statusLastChangedAt) - moment(b.statusLastChangedAt),
      defaultSortOrder: 'ascend',
    },
  ];

  return columns;
};

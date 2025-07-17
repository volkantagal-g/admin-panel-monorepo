import { Tag, Tooltip, Typography } from 'antd';

import { getLangKey } from '@shared/i18n';
import { courierStatuses } from '@shared/shared/constantValues';
import { GETIR_MARKET_TAG_COLORS, COURIER_STATUSES } from '@shared/shared/constants';

const { Text } = Typography;

export const getTableColumns = ({ t, memoizedHandleCourierNameClick }) => {
  const langKey = getLangKey();
  return [
    {
      title: t('global:COURIER'),
      dataIndex: 'name',
      key: 'name',
      render: (name, courier) => {
        return (
          <Text strong onClick={() => memoizedHandleCourierNameClick(courier)} style={{ cursor: 'pointer' }}>
            {name}
          </Text>
        );
      },
    },
    {
      title: t('global:STATUS'),
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status - b.status,
      defaultSortOrder: 'ascend',
      width: 90,
      render: status => {
        return <Tag color={GETIR_MARKET_TAG_COLORS[COURIER_STATUSES][status]}>{courierStatuses[status][langKey]}</Tag>;
      },
    },
  ];
};

export const getSummaryTableColumns = ({ t, mainClasses }) => {
  return [
    {
      title: t('global:TOTAL'),
      dataIndex: 'total',
      key: 'total',
      align: 'right',
      render: total => {
        return (
          <Tooltip title={t('global:TOTAL')}>
            <Text className={mainClasses.totalCourier}>{total}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: t('global:FREE_COURIER'),
      dataIndex: 'free',
      key: 'free',
      align: 'right',
      render: free => {
        return (
          <Tooltip title={t('global:FREE_COURIER')}>
            <Text className={mainClasses.freeCourier}>{free}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: t('global:ON_ORDER'),
      dataIndex: 'onDuty',
      key: 'onDuty',
      align: 'right',
      render: onDuty => {
        return (
          <Tooltip title={t('global:ON_ORDER')}>
            <Text className={mainClasses.onDutyCourier}>{onDuty}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: t('global:RETURNING'),
      dataIndex: 'returning',
      key: 'returning',
      align: 'right',
      render: returning => {
        return (
          <Tooltip title={t('global:RETURNING')}>
            <Text className={mainClasses.returningCourier}>{returning}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: t('global:BUSY'),
      dataIndex: 'busy',
      key: 'busy',
      align: 'right',
      render: busy => {
        return (
          <Tooltip title={t('global:BUSY')}>
            <Text className={mainClasses.busyCourier}>{busy}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: t('global:UTILIZATION'),
      dataIndex: 'utilizationRate',
      key: 'utilizationRate',
      align: 'right',
      render: utilizationRate => {
        return (
          <Tooltip title={t('global:UTILIZATION')}>
            <Text className={mainClasses.utilization}>{utilizationRate}</Text>
          </Tooltip>
        );
      },
    },
  ];
};

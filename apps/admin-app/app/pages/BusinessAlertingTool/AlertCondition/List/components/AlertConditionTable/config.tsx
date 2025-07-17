import moment from 'moment';
import { Tag } from 'antd';

import { getLangKey } from '@shared/i18n';
import { LOCAL_DATE_TIME_FORMAT } from '@shared/shared/constants';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';

export function tableColumns({ t }: { t: any }) {
  const langKey = getLangKey();

  return [
    {
      title: t('batAlertConditionCommon:TABLE.COLUMNS.ALERT_CONDITION_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (name: { [x: string]: string; }) => name[langKey],
    },
    {
      title: t('batAlertConditionListPage:TABLE.COLUMNS.CREATED_BY'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 100,
      render: ({ name }: { name: string }) => name,
    },
    {
      title: t('batAlertConditionCommon:TABLE.COLUMNS.CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
      render: (createdAt: moment.MomentInput | undefined) => moment(createdAt).format(LOCAL_DATE_TIME_FORMAT[langKey.toUpperCase()]),
    },
    {
      title: t('batAlertConditionListPage:TABLE.COLUMNS.DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: 250,
      render: (description: { [x: string]: any; }) => description[langKey],
    },
    {
      title: t('batAlertConditionListPage:TABLE.COLUMNS.CHANNELS'),
      dataIndex: 'notificationPreferences',
      key: 'notificationPreferences',
      width: 120,
      render: (notificationPreferences: { [x: string]: { isActive: any; }; }) => {
        const channels = Object.keys(notificationPreferences);

        return channels.map(channel => {
          const getChannelLabel = t(`batAlertConditionCommon:CHANNELS.${channel}`);
          return notificationPreferences[channel].isActive ? <Tag key={channel}>{getChannelLabel}</Tag> : null;
        });
      },
    },
    {
      title: t('batAlertConditionCommon:TABLE.COLUMNS.STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: number) => t(`batAlertConditionCommon:CONSTANT_VALUES.ALERT_CONDITION_STATUSES.${status}`),
    },
    {
      title: t('batAlertConditionCommon:TABLE.COLUMNS.ACTION'),
      dataIndex: '_id',
      key: '_id',
      width: 70,
      render: (id: string) => (
        <RedirectButtonV2
          text={t('global:DETAIL')}
          to={ROUTE.BUSINESS_ALERTING_TOOL_ALERT_CONDITION_DETAIL.path.replace(':alertConditionId', id)}
          target="_self"
          size="small"
          type="default"
          iconComponent={undefined}
          permKey={permKey.PAGE_BUSINESS_ALERTING_TOOL_ALERT_CONDITION_DETAIL}
        />
      ),
    },
  ];
}

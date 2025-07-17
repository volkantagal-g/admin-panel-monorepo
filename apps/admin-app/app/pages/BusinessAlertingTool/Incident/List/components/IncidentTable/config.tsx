import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, Tag } from 'antd';

import { getLangKey } from '@shared/i18n';
import { LOCAL_DATE_TIME_FORMAT } from '@shared/shared/constants';
import { INCIDENT_PRIORITIES } from '@app/pages/BusinessAlertingTool/constants';
import { getIncidentDuration, getIncidentDurationWithFormat } from './utils';
import { ROUTE } from '@app/routes';

export function tableColumns({ t, alertConditions }: { t: any, alertConditions: AlertCondition[] }) {
  const langKey = getLangKey();
  return [
    {
      title: t('batAlertConditionCommon:TABLE.COLUMNS.STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 170,
      render: (status: number) => t(`batAlertConditionCommon:CONSTANT_VALUES.INCIDENT_STATUSES.${status}`),
    },
    {
      title: t('batAlertConditionCommon:TABLE.COLUMNS.PRIORITY'),
      dataIndex: 'priority',
      key: 'priority',
      width: 170,
      render: (priority: number) => {
        const tagColor = priority === INCIDENT_PRIORITIES.CRITICAL ? 'error' : 'warning';
        return (
          <Tag color={tagColor}>
            {t(`batAlertConditionCommon:CONSTANT_VALUES.INCIDENT_PRIORITIES.${priority}`)}
          </Tag>
        );
      },
    },
    {
      title: t('batAlertConditionCommon:TABLE.COLUMNS.CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (createdAt: moment.MomentInput | undefined) => moment(createdAt).format(LOCAL_DATE_TIME_FORMAT[langKey.toUpperCase()]),
      defaultSortOrder: 'descend',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: t('batIncidentListPage:TABLE.COLUMNS.DURATION'),
      dataIndex: 'duration',
      key: 'duration',
      width: 200,
      render: (_: any, record: any) => {
        return getIncidentDurationWithFormat(record.createdAt, record.closedAt);
      },
      sorter: {
        compare: (a: any, b: any) => {
          const aObjectDuration = Math.abs(getIncidentDuration(a.createdAt, a.closedAt));
          const bObjectDuration = Math.abs(getIncidentDuration(b.createdAt, b.closedAt));
          return aObjectDuration - bObjectDuration;
        },
      },
    },
    {
      title: t('batAlertConditionCommon:TABLE.COLUMNS.ALERT_CONDITION_NAME'),
      dataIndex: 'alertCondition',
      key: 'alertCondition',
      width: 350,
      render: (alertConditionId: any) => {
        const targetAlertCondition = alertConditions.find(alertCondition => alertCondition._id === alertConditionId);
        return targetAlertCondition?.name[langKey];
      },
    },
    {
      title: t('batAlertConditionCommon:TABLE.COLUMNS.ACTION'),
      dataIndex: '_id',
      key: '_id',
      width: 80,
      render: (id: string) => (
        <Link to={`${ROUTE.BUSINESS_ALERTING_TOOL_INCIDENT_DETAIL.path.replace(':incidentId', id)}`}>
          <Button
            size="small"
            type="default"
          >
            {t('global:DETAIL')}
          </Button>
        </Link>
      ),
    },
  ];
}

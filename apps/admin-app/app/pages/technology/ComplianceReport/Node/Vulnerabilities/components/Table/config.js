import { Button, Tag } from 'antd';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';

export const tableColumns = ({ t }) => [
  {
    title: t('REPOSITORY_NAME'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('VERSION'),
    dataIndex: 'currentVersion',
    key: 'currentVersion',
    width: 75,
  },
  {
    title: t('RESPONSIBLE_SQUAD'),
    dataIndex: 'owner',
    key: 'owner',
    render: owner => owner || 'N/A',
    width: 140,
  },
  {
    title: t('VULNERABILITY_INFO'),
    dataIndex: 'vulnerabilityCountInfo',
    key: 'vulnerabilityCountInfo',
    width: 250,
    render: vulnerabilityCountInfo => {
      if (!vulnerabilityCountInfo) return null;
      const tagStyles = { fontSize: 10, lineHeight: '15px', marginRight: 4 };
      return (
        <>
          {vulnerabilityCountInfo.critical > 0 && <Tag color="volcano" style={tagStyles}>{vulnerabilityCountInfo.critical} {t('CRITICAL')}</Tag>}
          {vulnerabilityCountInfo.high > 0 && <Tag color="error" style={tagStyles}>{vulnerabilityCountInfo.high} {t('HIGH')}</Tag>}
          {vulnerabilityCountInfo.moderate > 0 && <Tag color="warning" style={tagStyles}>{vulnerabilityCountInfo.moderate} {t('MODERATE')}</Tag>}
          {vulnerabilityCountInfo.low > 0 && <Tag color="default" style={tagStyles}>{vulnerabilityCountInfo.low} {t('LOW')}</Tag>}
        </>
      );
    },
  },
  {
    title: t('PROD_DEPENDENCY_COUNT'),
    dataIndex: 'dependenciesCount',
    key: 'dependenciesCount',
  },
  {
    title: t('DEV_DEPENDENCY_COUNT'),
    dataIndex: 'devDependenciesCount',
    key: 'devDependenciesCount',
  },
  {
    title: t('ACTION'),
    width: 75,
    render: (_, record) => (
      <Link to={ROUTE.TECHNOLOGY_COMPLIANCE_REPORT_NODE_VULNERABILITY_DETAIL.path.replace(':id', record._id)}>
        <Button size="small">{t('DETAILS')}</Button>
      </Link>
    ),
  },
];

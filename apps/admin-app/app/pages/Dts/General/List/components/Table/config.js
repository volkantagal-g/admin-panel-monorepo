import moment from 'moment';
import { Tag } from 'antd';

import { get } from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import { DetailButton } from '@shared/components/UI/List';
import { ROUTE } from '@app/routes';
import { DtsDecisionCodes, DtsDecisionColors, DtsStatusCodes, DtsStatusColors } from '../../../constant';

export const getTableColumns = (hasAccessToDetailPage, sortedInfo) => {
  const columns = [
    {
      title: t('ACTIVENESS'),
      dataIndex: 'isActive',
      key: 'isActive',
      width: 60,
      render: isActive => {
        const color = isActive ? 'success' : 'error';
        const text = isActive ? t('ACTIVE') : t('INACTIVE');
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: t('DATE'),
      dataIndex: 'createdAt',
      key: 'date',
      width: '140px',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
      render: createdAt => moment(createdAt).format('DD MMMM YYYY HH:mm'),
    },
    {
      title: t('dts:REPORTER'),
      dataIndex: 'reporter',
      key: 'reporter',
      width: '100px',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'reporter' ? sortedInfo.order : null,
      render: reporter => {
        const userName = get(reporter, 'user.name', undefined);
        if (userName !== undefined) {
          return userName;
        }
        return get(reporter, 'email', '-');
      },
    },
    {
      title: t('WAREHOUSE'),
      dataIndex: 'warehouseName',
      key: 'warehouse',
      width: '100px',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'warehouse' ? sortedInfo.order : null,
      render: warehouseName => {
        return warehouseName;
      },
    },
    {
      title: t('dts:RULE_NUMBER'),
      dataIndex: 'rule',
      key: 'ruleNumber',
      width: '100px',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'ruleNumber' ? sortedInfo.order : null,

      render: rule => get(rule, 'ruleNumber', '-'),
    },
    {
      title: t('DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: '100px',
      render: description => {
        if (description.length > 100) {
          const truncatedDescription = `${description.substr(0, 100)}...`;
          return truncatedDescription;
        }
        return description;
      },
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: '150px',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
      render: status => <Tag color={DtsStatusColors[status]}>{DtsStatusCodes[status]?.[getLangKey()]}</Tag>,
    },
    {
      title: t('dts:DECISION'),
      dataIndex: 'decision',
      key: 'decision',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'decision' ? sortedInfo.order : null,
      width: '100px',
      render: decision => <Tag color={DtsDecisionColors[decision?.status]}>{DtsDecisionCodes[decision?.status]?.[getLangKey()]}</Tag>,
    },
    {
      title: t('dts:POINT'),
      dataIndex: 'decision',
      key: 'decision',
      width: '40px',
      render: decision => get(decision, 'point', '-'),
    },
  ];

  if (hasAccessToDetailPage) {
    columns.push({
      title: t('ACTION'),
      align: 'right',
      width: 60,
      render: record => {
        const id = get(record, '_id', '');
        const path = ROUTE.DTS_DETAIL.path.replace(':id', '');

        return (
          <DetailButton urlPath={path} _id={id} />
        );
      },
    });
  }

  return columns;
};

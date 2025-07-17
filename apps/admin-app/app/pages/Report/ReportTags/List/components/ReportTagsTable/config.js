import { Link } from 'react-router-dom';
import { Button, Typography, Tag } from 'antd';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';

const { Text } = Typography;
export const getColumns = (t, canAccessDetail) => {
  const columns = [
    {
      title: '#',
      key: 'index',
      align: 'right',
      width: 40,
      render: (val, row, index) => {
        return index + 1;
      },
    },
    {
      title: <b>{t('global:NAME_1')}</b>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        return a.name[getLangKey()].localeCompare(b.name[getLangKey()]);
      },
      defaultSortOrder: 'ascend',
      width: 300,
      render: (name, record) => (
        <Tag style={{ backgroundColor: record?.backgroundColor }}>
          <Text style={{ color: record?.textColor, whiteSpace: 'pre-wrap' }}>
            {record?.name[getLangKey()] || t('EXAMPLE_NAME')}
          </Text>
        </Tag>
      ),
    },
    {
      title: <b>{t('global:DESCRIPTION')}</b>,
      dataIndex: 'description',
      key: 'description',
      render: description => description[getLangKey()],
    },
  ];

  if (canAccessDetail) {
    columns.push({
      title: <b>{t('global:DETAIL')}</b>,
      dataIndex: '_id',
      key: 'detail',
      align: 'center',
      width: 100,
      render: id => (
        <Link to={ROUTE.REPORT_TAGS_DETAIL.path.replace(':id', id)}>
          <Button>{t('global:DETAIL')}</Button>
        </Link>
      ),
    });
  }

  return columns;
};

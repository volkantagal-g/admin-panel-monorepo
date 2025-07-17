import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';

const EMPTY = '';

export const tableColumns = ({ t, canAccess }) => [
  {
    title: '#',
    key: '_index',
    width: 50,
    render: (_text, _record, index) => index + 1,
  },
  {
    title: t('NAME'),
    dataIndex: 'name',
    key: 'name',
    render: name => name,
  },
  {
    title: t('GSM'),
    dataIndex: 'gsm',
    key: 'gsm',
    render: gsm => gsm,
  },
  {
    title: t('EMAIL'),
    dataIndex: 'email',
    key: 'email',
    render: email => email,
  },
  {
    title: t('ACTION'),
    dataIndex: '_id',
    key: '_id',
    align: 'right',
    width: 100,
    render: _id => {
      if (_id) {
        const path = ROUTE.CLIENT_DETAIL.path.replace(':id', _id);
        return (
          <Space>
            <Link to={path}>
              <Button type="default" size="small" disabled={!canAccess(permKey.PAGE_CLIENT_DETAIL)}>
                {t('DETAIL')}
              </Button>
            </Link>
          </Space>
        );
      }
      return (<span>{EMPTY}</span>);
    },
  },
];

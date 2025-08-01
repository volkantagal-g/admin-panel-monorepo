import moment from 'moment';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';

export const columns = t => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      render: id => {
        return <CopyToClipboard message={id} />;
      },
    },
    {
      title: 'Key',
      dataIndex: 'key',
      width: 200,
      key: 'key',
      sorter: (a, b) => a.key.localeCompare(b.key),

    },
    {
      title: t('paymentMerchantPage:TABLE.COLUMNS.MERCHANT_NAME'),
      dataIndex: 'settings',
      key: 'settings',
      width: 300,
      render: settings => {
        return settings?.displayName;
      },
      sorter: (a, b) => a.settings?.displayName.localeCompare(b.settings?.displayName),
    },
    {
      title: t('global:CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: createdAt => {
        return moment(createdAt).format(DEFAULT_DATE_FORMAT);
      },
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: t('global:UPDATED_AT'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 200,
      render: updatedAt => {
        return moment(updatedAt).format(DEFAULT_DATE_FORMAT);
      },
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    },
    {
      title: t('paymentMerchantPage:ACTION'),
      dataIndex: 'id',
      key: 'id',
      fixed: 'right',
      align: 'right',
      width: 100,
      render: id => (
        <Space size="middle">
          <Link to={`/payment/merchants/detail/${id}`}>
            <Button type="default" size="small">
              {t('global:DETAIL')}
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
};

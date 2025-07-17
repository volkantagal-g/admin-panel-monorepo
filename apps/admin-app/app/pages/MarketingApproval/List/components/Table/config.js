import { Button } from 'antd';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { statusTypes, assetTypes } from '@app/pages/MarketingApproval/constantValues';
import { STATUS } from '@app/pages/MarketingApproval/constants';

export const getTableColumns = t => {
  return [
    {
      title: t('PROMO_CODE'),
      dataIndex: 'promoCode',
      key: 'promoCode',
      width: 200,
    },
    {
      title: t('TYPE'),
      dataIndex: 'assets',
      key: 'assets',
      width: 150,
      render: assets => {
        return assets.map(asset => {
          return (get(assetTypes[asset], getLangKey(), ''));
        });
      },
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: status => {
        return (get(statusTypes[status], getLangKey(), ''));
      },
    },
  ];
};

export const generateTableColumns = ({ t, selectedHeaders, classes }) => {
  let tableColumns = getTableColumns(t, classes);
  if (selectedHeaders.length !== 0) {
    tableColumns = tableColumns.filter(header => {
      return selectedHeaders.includes(header.key);
    });
  }
  const actionColumn = {
    title: t('ACTION'),
    key: 'action',
    width: 150,
    fixed: 'right',
    render: ({ promoId, status }) => {
      return (
        <a href={`/marketingApproval/detail/${promoId}`}>
          <Button type="primary" disabled={!(STATUS.SUCCESS === status || STATUS.WAITING === status || STATUS.SENDING === status)}>
            Detail
          </Button>
        </a>
      );
    },
  };

  return [...tableColumns, actionColumn];
};

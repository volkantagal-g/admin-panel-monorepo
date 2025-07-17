import { TFunction } from 'react-i18next';

import { ColumnType } from 'antd/lib/table/interface';

import React from 'react';

import { BulkOpMessage, RelationalBulkOperation, RelationalBulkOpMessage } from '@app/pages/Promo/types';
import { PromoTag } from '@app/pages/Promo/components/PromoTag';
import { ChildPromoMessageTag } from '@app/pages/Promo/components/ChildPromoMessageTag';
import { downloadDataAsCSV } from '@shared/utils/common';

export function getResultTableColumns(t: TFunction, operation: RelationalBulkOperation): ColumnType<RelationalBulkOpMessage>[] {
  return [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: 180,
    },
    {
      title: t('GENERAL_INFO.PROMO_CODE'),
      dataIndex: 'promoCode',
      key: 'promoCode',
      render: (_, record) => {
        if (!record.promoCode) {
          return '-';
        }
        return <PromoTag promo={record} hasRedirect />;
      },
      width: 210,
    },
    {
      title: t('CHILD_PROMOS.BULK_RESULT.MESSAGE'),
      dataIndex: 'message',
      key: 'message',
      render: (value: BulkOpMessage) => <ChildPromoMessageTag value={value} />,
      ...(operation === RelationalBulkOperation.AddRemove && {
        width: 160,
        filters: [
          {
            text: <ChildPromoMessageTag value={BulkOpMessage.NotFound} />,
            value: BulkOpMessage.NotFound,
          },
          {
            text: <ChildPromoMessageTag value={BulkOpMessage.Success} />,
            value: BulkOpMessage.Success,
          },
          {
            text: <ChildPromoMessageTag value={BulkOpMessage.InvalidPromoMechanic} />,
            value: BulkOpMessage.InvalidPromoMechanic,
          },
        ],
        onFilter: (value, record) => record.message === value,
      }),
    },
  ];
}

export function handleBulkChildOperationResult(results: RelationalBulkOpMessage[], filters: BulkOpMessage[] | null, t: TFunction) {
  const filteredData = filters ? results.filter(item => filters.includes(item.message)) : results;
  const csvData = filteredData.map(item => ({
    _id: item._id,
    promoCode: item.promoCode || '-',
    message: t(`MESSAGE.${item.message}`),
  }));

  const columns = {
    _id: 'ID',
    promoCode: t('GENERAL_INFO.PROMO_CODE'),
    message: t('CHILD_PROMOS.BULK_RESULT.MESSAGE'),
  };

  downloadDataAsCSV({
    data: csvData,
    columns: [columns],
    fileName: 'children_bulk_operation_result',
  });
}

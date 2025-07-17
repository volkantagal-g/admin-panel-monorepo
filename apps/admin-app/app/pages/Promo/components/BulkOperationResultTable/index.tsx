import { Modal, Table } from 'antd';
import React from 'react';

import { useTranslation } from 'react-i18next';

import { BulkOpMessage, RelationalBulkOperation, RelationalBulkOpMessage } from '@app/pages/Promo/types';
import { useResultTableStyles } from './style';
import { getResultTableColumns } from '@app/pages/Promo/components/BulkOperationResultTable/config';

type PropTypes = {
  onCancel: () => void;
  onFilter: (message: BulkOpMessage[] | null) => void;
  operation: RelationalBulkOperation;
  isVisible: boolean
  data: RelationalBulkOpMessage[]
  footer?: React.ReactNode
}

export function BulkOperationResultTable({ onCancel, onFilter, operation, isVisible, data, footer }: PropTypes) {
  const { t } = useTranslation('promoPage');
  const styles = useResultTableStyles();

  const onChange = (_: unknown, filters: any) => {
    onFilter(filters?.message ?? null);
  };

  return (
    <Modal
      className={styles.wrapper}
      visible={isVisible}
      onCancel={onCancel}
      title={t('CHILD_PROMOS.BULK_RESULT.TITLE')}
      onOk={onCancel}
      width={600}
    >
      <Table
        columns={getResultTableColumns(t, operation)}
        dataSource={data}
        scroll={{ x: 550 }}
        onChange={onChange}
        footer={() => footer}
      />

    </Modal>
  );
}

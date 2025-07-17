import { useTranslation } from 'react-i18next';

import { getTableColumns } from './config';
import { Card, Table } from '@shared/components/GUI';

export default function ProductList({ products }) {
  const { t } = useTranslation('marketBasketDetailPage');
  const columns = getTableColumns(t);
  return (
    <Card title={t('global:PRODUCTS')}>
      <Table
        columns={columns}
        data={products}
        size="small"
      />
    </Card>
  );
}

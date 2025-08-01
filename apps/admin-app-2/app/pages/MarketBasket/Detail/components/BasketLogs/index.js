import { useTranslation } from 'react-i18next';

import { getTableColumns } from './config';
import { Card, Table } from '@shared/components/GUI';

export default function BasketLogs({ actions }) {
  const { t } = useTranslation(['marketBasketDetailPage', 'marketOrderPage']);
  const columns = getTableColumns(t);
  return (
    <Card title={t('marketBasketDetailPage:BASKET_LOGS.TITLE')} data-testid="basket-logs-table">
      <Table
        columns={columns}
        data={actions}
        size="small"
      />
    </Card>
  );
}

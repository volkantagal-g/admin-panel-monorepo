import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { orderSummarySelector } from '@app/pages/GetirFood/ActiveOrderSummary/redux/selectors';
import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';
import { tableColumns, activeOrdersData } from '@app/pages/GetirFood/ActiveOrderSummary/components/ActiveOrder/config';

const ActiveOrderTable = () => {
  const { t } = useTranslation('foodOrderSummaryPage');

  const getOrderSummary = useSelector(orderSummarySelector.getData);
  const isPending = useSelector(orderSummarySelector.getIsPending);
  const orderSummary = getOrderSummary;

  const getTableColumns = useMemo(
    () => tableColumns({ t }),
    [t],
  );

  const getActiveOrdersData = useMemo(
    () => activeOrdersData({ orderSummary, t }),
    [orderSummary, t],
  );

  return (
    <Card>
      <AntTable
        columns={getTableColumns}
        dataSource={getActiveOrdersData}
        loading={isPending}
      />
    </Card>
  );
};

export default ActiveOrderTable;

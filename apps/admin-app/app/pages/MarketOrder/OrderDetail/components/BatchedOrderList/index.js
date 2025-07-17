import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { Space } from '@shared/components/GUI';
import { orderDetailSelector } from '../../redux/selectors';
import { getTableColumns } from './config';
import { usePermission } from '@shared/hooks';
import AntTableV2 from '@shared/components/UI/AntTableV2';

const BatchedOrderTable = () => {
  const { t } = useTranslation('marketOrderPage');
  const { canAccess } = usePermission();
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const batchedOrders = get(orderDetail, 'batchedOrders', []);
  const columns = getTableColumns(orderDetail?._id, t, canAccess);

  return (
    <Space title={t('BATCHED_ORDERS.TITLE')} className="p-2">
      <AntTableV2
        data={batchedOrders}
        columns={columns}
        loading={isPending}
        size="small"
        data-testid="batched-order-list"
      />
    </Space>
  );
};

export default BatchedOrderTable;

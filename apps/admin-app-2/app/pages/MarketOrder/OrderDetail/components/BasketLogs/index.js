import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { get } from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Space } from '@shared/components/GUI';
import { orderDetailSelector } from '../../redux/selectors';
import { getTableColumns } from './config';

const BasketLogs = () => {
  const { t } = useTranslation('marketOrderPage');

  const columns = getTableColumns(t);
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);

  const actions = get(orderDetail, 'actions', []);
  return (
    <Space className="p-1" title={t('BASKET_LOGS.TITLE')}>
      <AntTableV2
        data={actions}
        columns={columns}
        loading={isPending}
        size="small"
        scroll={{ y: 300 }}
        data-testid="order-basket-logs"
      />
    </Space>
  );
};

export default BasketLogs;

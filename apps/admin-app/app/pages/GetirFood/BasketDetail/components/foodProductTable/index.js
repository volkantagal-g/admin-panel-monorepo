import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import AntTable from '@shared/components/UI/AntTableV2';
import { orderDetailSelector } from '@app/pages/GetirFood/BasketDetail/redux/selectors';
import { generateColumns } from './config';

const FoodProductTable = () => {
  const { t } = useTranslation('foodOrderPage');
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);

  const tableColumns = useMemo(() => generateColumns({ t }), [t]);

  return (
    <Card>
      <AntTable
        title={t('PRODUCT.TITLE')}
        data={orderDetail.products || []}
        columns={tableColumns}
        loading={isPending}
        data-testid="basket-order-list"
      />
    </Card>
  );
};

export default FoodProductTable;

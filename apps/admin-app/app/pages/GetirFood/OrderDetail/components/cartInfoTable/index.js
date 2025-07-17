import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';
import { generateColumns } from './config';

const CartInfoTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const { t } = useTranslation('foodOrderPage');

  const tableColumns = useMemo(() => {
    return generateColumns({ t });
  }, [t]);

  return (
    <Card>
      <AntTable
        title={t('CARD.INFO')}
        data={[orderDetail]}
        columns={tableColumns}
        loading={isPending}
      />
    </Card>
  );
};

export default CartInfoTable;

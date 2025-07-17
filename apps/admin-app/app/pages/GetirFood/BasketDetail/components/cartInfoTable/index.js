import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { orderDetailSelector } from '@app/pages/GetirFood/BasketDetail/redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';
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
      <AntTableV2
        title={t('CARD.INFO')}
        data={[orderDetail]}
        columns={tableColumns}
        loading={isPending}
      />
    </Card>
  );
};

export default CartInfoTable;

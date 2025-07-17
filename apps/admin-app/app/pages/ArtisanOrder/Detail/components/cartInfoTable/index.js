import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { orderDetailSelector } from '../../redux/selectors';
import AntTable from '@shared/components/UI/AntTableV2';
import Card from '@shared/components/UI/AntCard';
import { tableColumns } from './config';

const CartInfoTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const { t } = useTranslation('artisanOrderPage');

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

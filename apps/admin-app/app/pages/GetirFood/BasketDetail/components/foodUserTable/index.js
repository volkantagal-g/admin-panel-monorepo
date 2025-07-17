import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import Card from '@shared/components/UI/AntCard';
import AntTable from '@shared/components/UI/AntTableV2';
import { orderDetailSelector } from '@app/pages/GetirFood/BasketDetail/redux/selectors';
import { generateColumns } from './config';

const FoodUserTable = () => {
  const { t } = useTranslation('foodOrderPage');
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const usersData = get(orderDetail, 'restaurant.users', []);

  const tableColumns = useMemo(() => generateColumns({ t }), [t]);

  return (
    <Card>
      <AntTable
        title={t('RESTAURANT_USERS')}
        data={usersData}
        columns={tableColumns}
        loading={isPending}
        data-testid="basket-restaurant-users"
      />
    </Card>
  );
};

export default FoodUserTable;

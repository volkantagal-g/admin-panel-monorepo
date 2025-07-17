import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';
import { generateColumns } from '@app/pages/GetirFood/OrderDetail/components/foodUserTable/config';
import { orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';

const FoodUserTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const usersData = get(orderDetail, 'restaurant.users', []);
  const { t } = useTranslation('foodOrderPage');

  const tableColumns = useMemo(() => {
    return generateColumns({ t });
  }, [t]);

  return (
    <Card>
      <AntTable
        title={t('RESTAURANT_USERS')}
        data={usersData}
        columns={tableColumns}
        loading={isPending}
      />
    </Card>
  );
};

export default FoodUserTable;

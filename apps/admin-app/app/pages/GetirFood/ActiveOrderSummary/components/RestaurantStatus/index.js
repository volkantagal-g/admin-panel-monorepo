import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { restaurantSummarySelector } from '@app/pages/GetirFood/ActiveOrderSummary/redux/selectors';
import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';
import { tableColumns, restaurantData } from '@app/pages/GetirFood/ActiveOrderSummary/components/RestaurantStatus/config';

const RestaurantStatusTable = () => {
  const { t } = useTranslation('foodOrderSummaryPage');

  const getRestaurantSummary = useSelector(restaurantSummarySelector.getData);
  const isPending = useSelector(restaurantSummarySelector.getIsPending);
  const restaurantSummary = getRestaurantSummary;

  const getTableColumns = useMemo(
    () => tableColumns({ t }),
    [t],
  );

  const getRestaurantData = useMemo(
    () => restaurantData({ t, restaurantSummary }),
    [t, restaurantSummary],
  );

  return (
    <Card>
      <AntTable
        columns={getTableColumns}
        dataSource={getRestaurantData}
        loading={isPending}
      />
    </Card>
  );
};

export default RestaurantStatusTable;

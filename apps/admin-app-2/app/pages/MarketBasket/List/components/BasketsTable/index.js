import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';

import { getTableColumns } from './config';
import { Table } from '@shared/components/GUI';
import {
  filterSelector,
  marketBasketsSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { usePermission } from '@shared/hooks';

const BasketsTable = () => {
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const { t } = useTranslation(['marketBasketListPage', 'orderFilterPage']);
  const data = useSelector(marketBasketsSelector.getData);
  const isPending = useSelector(marketBasketsSelector.getIsPending);
  const { pagination, selectedDateRange: { startDate, endDate }, ...rest } = useSelector(filterSelector.getFilters);
  const columns = getTableColumns(t, canAccess);

  const handlePagination = ({ current: page, pageSize: limit }) => {
    dispatch(Creators.getMarketBasketsRequest({
      ...rest,
      startDateTime: moment(startDate).startOf('day').toISOString(),
      endDateTime: moment(endDate).endOf('day').toISOString(),
      page,
      limit,
    }));
  };

  return (
    <Table
      title={t('BASKET_TABLE_TITLE')}
      loading={isPending}
      columns={columns}
      data={data}
      pagination={{
        ...pagination,
        total: 1000,
      }}
      onChange={handlePagination}
      size="small"
      scroll={{ y: 700 }}
    />
  );
};

export default BasketsTable;

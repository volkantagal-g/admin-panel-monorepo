import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import { createSortObject } from '@shared/utils/table';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector } from '@shared/redux/selectors/common';

import { Creators } from '../../redux/actions';
import { getFormattedOrderData, filtersSelector } from '../../redux/selectors';
import { TEST_ID } from '../../constants';
import { tableColumns } from './config';
import useStyles from './styles';

const OrderTable = () => {
  const { t } = useTranslation(['global', 'activeOrdersForOperationPage']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();

  const pagination = useSelector(filtersSelector.getPagination);
  const columns = useMemo(() => tableColumns({ pagination, t, canAccess }), [pagination, t, canAccess]);

  const data = useSelector(getFormattedOrderData.getData);
  const totalOrderCount = useSelector(getFormattedOrderData.getCount);
  const isPending = useSelector(getFormattedOrderData.getIsPending);
  const isAvailableDomainTypesPending = useSelector(availableDomainTypesForCountrySelector.getIsPending);
  const isIntegrationAvailabilityLoading = useSelector(availableIntegrationTypesForCountrySelector.getIsPending);

  const sortKeysToQueryKeys = { sum: 'checkout.date', statusUpdatedAt: 'statusUpdatedAt' };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.setPagination({ currentPage, rowsPerPage }));
    dispatch(Creators.getActiveOrdersRequest());
  };

  const handleOnChange = (_paginationData, _filters, sorter) => {
    const { order, field, columnKey } = sorter;

    const { sortKey, sortDirection } = createSortObject(field || columnKey, order);

    const sortObj = {};
    const queryKey = sortKeysToQueryKeys[sortKey];
    if (queryKey) {
      sortObj[queryKey] = sortDirection;
    }
    dispatch(Creators.setSortOptions({ sortOptions: sortObj }));
    dispatch(Creators.getActiveOrdersRequest());
  };

  return (
    <AntTableV2
      data={data}
      columns={columns}
      loading={isPending || isAvailableDomainTypesPending || isIntegrationAvailabilityLoading}
      onChange={handleOnChange}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      className={classes.antTable}
      total={totalOrderCount}
      data-testid={TEST_ID.TABLE.ORDER_TABLE}
      showSorterTooltip={false}
    />
  );
};

export default OrderTable;

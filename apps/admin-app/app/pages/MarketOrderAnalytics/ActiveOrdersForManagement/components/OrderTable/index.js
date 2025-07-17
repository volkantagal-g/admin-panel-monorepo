import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';

import { usePermission } from '@shared/hooks';
import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector } from '@shared/redux/selectors/common';
import { createSortObject } from '@shared/utils/table';
import AntTableV2 from '@shared/components/UI/AntTableV2';

import { getTableColumns } from './config';
import { Creators } from '../../redux/actions';
import { getFormattedOrderData, getPagination, getSortOptions, getSubmittedFilters, orderStatsSelector } from '../../redux/selectors';
import useStyles from './styles';
import { defaultValues } from '../Filter/formHelper';
import { TEST_ID } from '../../testing';

const OrderTable = () => {
  const classes = useStyles();
  const { t } = useTranslation('activeOrdersForManagementPage');

  const dispatch = useDispatch();

  const pagination = useSelector(getPagination);
  const data = useSelector(getFormattedOrderData.getData);
  const totalOrderCount = useSelector(getFormattedOrderData.getCount);
  const selectedSortOption = useSelector(getSortOptions);
  const isPending = useSelector(getFormattedOrderData.getIsPending);
  const isDomainAvailabilityLoading = useSelector(availableDomainTypesForCountrySelector.getIsPending);
  const isIntegrationAvailabilityLoading = useSelector(availableIntegrationTypesForCountrySelector.getIsPending);
  const isStatsPending = useSelector(orderStatsSelector.getIsPending);
  const promoOrderRatio = useSelector(orderStatsSelector.getPromoOrderRatio);
  const averageBasketAmount = useSelector(orderStatsSelector.getAverageBasketAmount);
  const averageChargedAmount = useSelector(orderStatsSelector.getAverageChargedAmount);
  const hasSelectedClient = !!useSelector(getSubmittedFilters).clientId;
  const { canAccess } = usePermission();

  const fetchData = () => {
    dispatch(Creators.getActiveOrdersRequest());
    if (!hasSelectedClient) {
      dispatch(Creators.getActiveOrderStatsRequest());
    }
  };

  const orderStats = {
    isPending: isStatsPending,
    promoOrderRatio,
    averageBasketAmount,
    averageChargedAmount,
  };
  const columns = getTableColumns({ pagination, classes, orderStats, t, canAccess, hasSelectedClient });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.setPagination({ currentPage, rowsPerPage }));
    fetchData();
  };

  const sortKeysToQueryKeys = {
    checkoutDate: 'checkout.date',
    status: 'status',
    totalDuration: 'checkout.date',
    basketAmount: 'basket.calculation.totalAmount',
    chargedAmount: 'basket.calculation.totalChargedAmount',
  };

  const handleOnChange = (_paginationData, _filters, sorter) => {
    const { order, field, columnKey } = sorter;

    const { sortKey, sortDirection } = createSortObject(field || columnKey, order);

    let sortObj = {};
    const queryKey = sortKeysToQueryKeys[sortKey];
    if (queryKey && order) {
      sortObj[queryKey] = sortDirection;
    }
    else {
      sortObj = defaultValues({}).sortOptions;
    }

    // don't double fetch data if sort option doesn't change
    if (isEqual(selectedSortOption.sortOptions, sortObj)) return;

    dispatch(Creators.setSortOptions({ sortOptions: sortObj }));
    dispatch(Creators.setPagination({
      currentPage: 1,
      rowsPerPage: pagination.rowsPerPage,
    }));
    fetchData();
  };

  return (
    <AntTableV2
      data={data}
      columns={columns}
      loading={isPending || isDomainAvailabilityLoading || isIntegrationAvailabilityLoading || isStatsPending}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      onChange={handleOnChange}
      className={classes.antTable}
      total={totalOrderCount}
      data-testid={TEST_ID.ORDERS_TABLE}
      showSorterTooltip={false}
    />
  );
};

export default OrderTable;

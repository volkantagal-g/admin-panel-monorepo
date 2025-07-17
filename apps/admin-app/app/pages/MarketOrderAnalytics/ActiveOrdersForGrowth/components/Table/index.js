import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector } from '@shared/redux/selectors/common';

import { tableColumns } from './config';
import { getFormattedOrdersForGrowthData, filtersSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { createSortObject } from '@shared/utils/table';
import { TEST_ID } from '@app/pages/MarketOrderAnalytics/ActiveOrdersForGrowth/testing';

const PromoTable = () => {
  const { t } = useTranslation('activeOrdersForGrowthPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const pagination = useSelector(filtersSelector.getPagination);
  const availableIntegrationTypes = useSelector(availableIntegrationTypesForCountrySelector.getCurrentCountrySpecificData);
  const doesSelectedCountryHaveAnyActiveIntegration = availableIntegrationTypes?.length > 0;

  const sortKeysToQueryKeys = { sum: 'checkout.date', lastActivity: 'statusUpdatedAt' };

  const handleOnChange = (_paginationData, _filters, sorter) => {
    const { order, field, columnKey } = sorter;

    const { sortKey, sortDirection } = createSortObject(field || columnKey, order);

    const sortObj = {};
    const queryKey = sortKeysToQueryKeys[sortKey];
    if (queryKey) {
      sortObj[queryKey] = sortDirection;
    }
    dispatch(Creators.setSortOptions({ sortOptions: sortObj }));
    dispatch(Creators.getActiveOrdersForGrowthRequest());
  };

  const columns = useMemo(() => tableColumns(
    { pagination, t, canAccess, classes, doesSelectedCountryHaveAnyActiveIntegration },
  ), [pagination, t, canAccess, classes, doesSelectedCountryHaveAnyActiveIntegration]);

  const data = useSelector(getFormattedOrdersForGrowthData.getData);
  const isPending = useSelector(getFormattedOrdersForGrowthData.getIsPending);
  const isDomainAvailabilityLoading = useSelector(availableDomainTypesForCountrySelector.getIsPending);
  const isIntegrationAvailabilityLoading = useSelector(availableIntegrationTypesForCountrySelector.getIsPending);
  const totalOrderCount = useSelector(getFormattedOrdersForGrowthData.getCount);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.setPagination({ currentPage, rowsPerPage }));
    dispatch(Creators.getActiveOrdersForGrowthRequest());
  };

  return (
    <AntTableV2
      title={t('global:ORDER')}
      data={data}
      columns={columns}
      loading={isPending || isDomainAvailabilityLoading || isIntegrationAvailabilityLoading}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      className={classes.antTable}
      total={totalOrderCount}
      onChange={handleOnChange}
      data-testid={TEST_ID.TABLE}
    />
  );
};

export default PromoTable;
